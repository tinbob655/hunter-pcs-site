import React, {useEffect, useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { getDoc, doc, getFirestore } from 'firebase/firestore';
import { firebaseInit } from '../../../../firebase.js';

import { renderIfLoaded, isMobile } from '../../../../index.js';
import LoginPopup from '../../account/loginPopup.jsx';
import GenericMarkupSection from '../../../multiPageComponents/genericMarkupSection.jsx';
import '../pcsStyles.scss';

firebaseInit();

function ProductPage() {

    const navigate = useNavigate();

    function displaySystemSpecAsString() {
        //only run if a value has been found
        if (state.fullSystemSpec) {
            let specHTML = [<h2>
                {"Our "+state.frontendName+" could be yours"}
            </h2>];
            let spec = state.fullSystemSpec;
    
            //iterates over this list not in order of object returned because the object returned would be in a different order each time
            const components = ['processor', 'GPU', 'memory', 'storage', 'motherboard', 'cooler', 'case', 'powerSupply'];
            for (let index in components) {
                let key = components[index]
    
                //format the component name from the backend name to a frontend name (eg powerSupply --> Power Supply)
                let pcComponent = key.charAt(0).toUpperCase() + key.slice(1);
                pcComponent = pcComponent.replace(/([a-z])([A-Z])/g, '$1 $2');
    
                //add this component's HTML to the list
                specHTML.push(
                    <React.Fragment>
                        <p style={{color: '#bd9bb4', fontSize: '25px'}}>
                            {'-'+pcComponent+': '}
                            <p style={{display: 'inline'}}>
                                {spec[key]}
                            </p>
                        </p>
                    </React.Fragment>
                );
            };
    
            //return the HTML list
            return specHTML;
        }
    
        //if the database fails
        else return "We're having trouble getting your pc components at the moment. Please try again by refreshing this page"
    };

    const [state, setState] = useState('');

    const [purchaseButtonContent, setPurchaseButtonContent] = useState("Buy it now, we'll build it tomorrow ⟶");

    const [loginPopupState, setLoginPopupState] = useState('');

    useEffect(() => {
        const getProduct = async () => {

            //get the product data from firestore
            const database = getFirestore();
            let docRef = doc(database, 'products', sessionStorage.getItem('product'));
            let docSnap = await getDoc(docRef);

            const dataToFetch = ['frontendName', 'price', 'subheaderDescription', 'fullDescription', 'fullSystemSpec'];

            //fetch all data and add it to state
            let fetchedData = [];
            dataToFetch.forEach((key) => {
                fetchedData.push(docSnap.data()[key]);
            });

            setState({frontendName: fetchedData[0],
                price: fetchedData[1],
                subheaderDescription: fetchedData[2],
                fullDescription: fetchedData[3],
                fullSystemSpec: fetchedData[4],
                productImageURL: 'https://firebasestorage.googleapis.com/v0/b/hunter-pcs-firebase.appspot.com/o/images%2Fimage%20of%20pc.jpeg?alt=media&token=057583b8-036a-4ffd-9657-58e010d7e8e8',
                //for now this is just a stock image until product images are available
                product: sessionStorage.getItem('product'),
            });

            //now get the product image from firebase storage
            // const storage = getStorage();
            // getDownloadURL(ref(storage, 'images/productImages/'+sessionStorage.getItem('product')))
            //     .then((url) => {
            //         setState({
            //             productImageURL: url,
            //         });
            //     });
            //UNCOMMENT THE ABOVE CODE WHEN PRODUCT IMAGES ARE READY (it has not been tested
        };

        getProduct();
    }, []);

    //desktop product page
    if (!isMobile()) {
        return (
            <React.Fragment>

                {/*placeholder for if the login popup is needed*/}
                <div id="productPagePopupWrapper">
                    {loginPopupState}
                </div>

                {/*PAGE TO ALLOW A USER TO PURCHACE A PRODUCT*/}
                <h1 className="alignRight">
                    {renderIfLoaded('Hunter '+state.frontendName)}
                </h1>
                <table>
                    <tr>
                        <td>
                            {/*PRODUCT NAME AND DESCRIPTION */}
                            <h2 className="alignRight">
                                {renderIfLoaded(state.subheaderDescription)}
                            </h2>
                            <p className="alignLeft">
                                {renderIfLoaded(state.fullDescription)}
                            </p>

                            {/*PURCHASE BUTTON*/}
                            <button type="button" id="purchaseButton" onClick={() => {
                                if (sessionStorage.getItem('loggedIn') == 'false') {

                                    //the user can only make a purcase if logged in, so make sure they are logged in
                                    setLoginPopupState(<LoginPopup/>);
                                }

                                //if the user is logged in, allow them to purchase
                                if (sessionStorage.getItem('loggedIn') == 'true') {

                                    //save the purchase to local broswer storage
                                    //cannot store arrays in local storage, so iterate until a free variable name is found
                                    var i = 0;
                                    var productStorageName = ''
                                    do {
                                        productStorageName = 'hunterPcsProduct'+i;
                                        i++;
                                        if (i > 100) {
                                            throw('Value to store in local storage became too high')
                                        }
                                    } while (localStorage.getItem(productStorageName));

                                    //free variable name has been found, store the product there
                                    localStorage.setItem(productStorageName, state.product);

                                    //NOTE: the local storage vars for products will be cleared upon purchase to optimise browser storage usage

                                    //alter frontend
                                    setPurchaseButtonContent('Added to basket! Visit your basket to buy now')
                                    document.getElementById('purchaseButton').style.opacity = 0.5;

                                    //change the page to the checkout page
                                    setTimeout(() => {
                                        navigate('/basket');
                                    }, 1000);
                                }
                            }}>
                                <h3>
                                    {purchaseButtonContent}
                                </h3>
                            </button>
                        </td>

                        <td>
                            {/*PRODUCT IMAGE*/}
                            <img src={state.productImageURL} style={{width: '75%'}}  className="mainImage centered" alt="loading..."/>
                            <h2>
                                {renderIfLoaded("£ "+state.price)}
                            </h2>
                        </td>
                    </tr>
                </table>
                
                {/*PRODUCT SPEC CONTENT*/}
                <button type="button" onClick={function() {const specDiv = document.getElementById('fullSpecDiv');
                                                            specDiv.classList.toggle('shown')}}>
                    <h3>
                        Show full spec ⟶
                    </h3>
                </button>
                <div id="fullSpecDiv">
                    <table>
                        <thead>
                            <tr>
                                <td>
                                <img src='https://firebasestorage.googleapis.com/v0/b/hunter-pcs-firebase.appspot.com/o/images%2FmotherboardTall.jpeg?alt=media&token=1e13e531-cf90-4a64-953f-84e850755064'
                                className="mainImage" style={{width: '75%', marginLeft: '5%', maxHeight: 'unset'}} alt="loading..."/>
                                </td>

                                <td>
                                    {displaySystemSpecAsString()}
                                </td>
                            </tr>
                        </thead>
                    </table>
                </div>

                {/*NO EXPENSES SPARED*/}
                <div>
                    <GenericMarkupSection
                    headingText='No expenses spared'
                    subheadingText='We guarantee quality'
                    paragraphText="At hunter pcs, we understand how annoying it can be to purchase a new device only for it to fail and need returning. That's why we
                    guarantee all pcs delivered to you are made with 100% brand new components. All our power supply units are heavily tested along with
                    the pcs themselves."
                    linkContent='More on our quality guarantee ⟶'
                    linkDestination='/support'
                    imgSrc='https://firebasestorage.googleapis.com/v0/b/hunter-pcs-firebase.appspot.com/o/images%2FgamingSetupWIDE2.jpeg?alt=media&token=f45440e7-bb17-4e56-9213-6bb178ed49df'
                    customImageCellStyles={{width: '60%'}} 
                    leftBool={true}/>
                </div>
                </React.Fragment>
            );
        }

    //mobile product page
    else {
        return (
            <React.Fragment>
                {/*placeholder for if the login popup is needed*/}
                <div id="productPagePopupWrapper">
                    {loginPopupState}
                </div>

                <h1>
                    {renderIfLoaded('Hunter '+state.frontendName)}
                </h1>

                {/*product name and description */}
                <table>
                    <thead>
                        <tr>
                            <td style={{width: '60%'}}>
                                <h2 className="alignRight">
                                    {renderIfLoaded(state.subheaderDescription)}
                                </h2>
                            </td>
                            <td>
                                <img src={state.productImageURL} className="mainImage centered" alt="loading..."/>
                                <p>
                                    £{state.price}
                                </p>
                            </td>
                        </tr>
                    </thead>
                </table>
                <p>
                    {renderIfLoaded(state.fullDescription)}
                </p>
                <button type="button" id="purchaseButton" onClick={() => {
                    if (sessionStorage.getItem('loggedIn') == 'false') {

                        //the user can only make a purcase if logged in, so make sure they are logged in
                        setLoginPopupState(<LoginPopup/>)
                    }

                    //if the user is logged in, allow them to purchase
                    if (sessionStorage.getItem('loggedIn') == 'true') {

                        //save the purchase to local broswer storage
                        //cannot store arrays in local storage, so iterate until a free variable name is found
                        var i = 0;
                        var productStorageName = ''
                        do {
                            productStorageName = 'hunterPcsProduct'+i;
                            i++;
                            if (i > 100) {
                                throw('Value to store in local storage became too high')
                            }
                        } while (localStorage.getItem(productStorageName));

                        //free variable name has been found, store the product there
                        localStorage.setItem(productStorageName, state.product);

                        //NOTE: the local storage vars for products will be cleared upon purchase to optimise browser storage usage

                        //alter frontend
                        setPurchaseButtonContent('Added to basket! Visit your basket to buy now')
                        document.getElementById('purchaseButton').style.opacity = 0.5;

                        //change the page to the checkout page
                        setTimeout(() => {
                            navigate('/basket');
                        }, 1000);
                    }
                }}>
                    <h3>
                        {purchaseButtonContent}
                    </h3>
                </button>

                <div className="dividerLine"></div>

                {/*product spec*/}
                <button type="button" onClick={function() {const specDiv = document.getElementById('fullSpecDiv');
                    specDiv.classList.toggle('shown')}}>
                    <h3>
                        Show full spec ⟶
                    </h3>
                </button> 
                <div id="fullSpecDiv">
                    {displaySystemSpecAsString()}
                </div>

                <div className="dividerLine"></div>

                {/*NO EXPENSES SPARED SECTION*/}
                <div>
                <GenericMarkupSection
                    headingText='No expenses spared'
                    subheadingText='We guarantee quality'
                    paragraphText="At hunter pcs, we understand how annoying it can be to purchase a new device only for it to fail and need returning. That's why we
                    guarantee all pcs delivered to you are made with 100% brand new components. All our power supply units are heavily tested along with
                    the pcs themselves."
                    linkContent='More on our quality guarantee ⟶'
                    linkDestination='/support'
                    imgSrc='https://firebasestorage.googleapis.com/v0/b/hunter-pcs-firebase.appspot.com/o/images%2FgamingSetupWIDE2.jpeg?alt=media&token=f45440e7-bb17-4e56-9213-6bb178ed49df'
                    DontShowDividerLineBool={true}
                    leftBool={true}/>
                </div>
            </React.Fragment>
        );
    };
};

export default ProductPage;