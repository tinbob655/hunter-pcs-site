import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

import { getDoc, doc, getFirestore } from 'firebase/firestore';
import {getStorage, getDownloadURL, ref} from 'firebase/storage';
import { firebaseInit } from '../../../../firebase.js';

import { renderIfLoaded, isMobile } from '../../../../index.js';
import LoginPopup from '../../../multiPageComponents/popups/login/loginPopup.jsx';
import GenericMarkupSection from '../../../multiPageComponents/genericMarkupSection.jsx';
import ChangeOperatingSystemPopup from './changeOperatingSystemPopup.jsx';
import SlidingButton from '../../../multiPageComponents/slidingButton.jsx';
import Image from '../../../multiPageComponents/image.jsx';
import '../pcsStyles.scss';

isMobile() ? import('../mobilePcsStyles.scss') : <></>;

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
        else return "We're having trouble getting your PC components at the moment. Please try again by refreshing this page"
    };

    const [state, setState] = useState('');
    const [productImage, setProductImage] = useState('');

    const [purchaseButtonContent, setPurchaseButtonContent] = useState("Buy now");

    const [loginPopupState, setLoginPopupState] = useState('');
    const [changeOperatingSystemPopupState, setChangeOperatingSystemPopupState] = useState(<></>);

    function changeOperatingSystem() {
        setChangeOperatingSystemPopupState(<ChangeOperatingSystemPopup/>);
    };

    function purchaseButtonClicked() {
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
            document.getElementById('purchaseButtonbutton').style.opacity = 0.5;

            //change the page to the checkout page
            setTimeout(() => {
                navigate('/basket');
                setTimeout(() => {
                    window.location.reload();
                })
            }, 1000);
        };
    };

    useEffect(() => {
        const getProduct = async () => {

            //get the product data from firestore
            const database = getFirestore();
            let docRef = doc(database, 'products', sessionStorage.getItem('product'));
            let docSnap = await getDoc(docRef);

            const dataToFetch = ['frontendName', 'price', 'subheaderDescription', 'fullDescription', 'fullSystemSpec'];

            //fetch the data from the dataToFetch array
            let fetchedData = [];
            dataToFetch.forEach((key) => {
                fetchedData.push(docSnap.data()[key]);
            });

            //fetch the shipping cost (different firesore location so cannot use above loop)
            let shippingCostDocRef = doc(database, 'costs', 'shippingCost');
            let shippingCostDocSnap = await getDoc(shippingCostDocRef);
            let shippingCost = shippingCostDocSnap.data().value;

            //add the fetched data to state
            setState({frontendName: fetchedData[0],
                price: fetchedData[1],
                subheaderDescription: fetchedData[2],
                fullDescription: fetchedData[3],
                fullSystemSpec: fetchedData[4],
                shippingCost: shippingCost,
                //for now this is just a stock image until product images are available
                product: sessionStorage.getItem('product'),
            });

            //also get the product image from firebase storage if it exists
            const storage = getStorage()
            getDownloadURL(ref(storage, `images/productImages/${sessionStorage.getItem('product')}.png`))
                .then((url) => {
                        setProductImage({productImageURL: url});
                    })
                .catch((error) => {
                    if (error.code == 'storage/object-not-found') {

                        //this means the image was not available, so set a stock image
                        setProductImage({productImageURL: 'https://firebasestorage.googleapis.com/v0/b/hunter-pcs-firebase.appspot.com/o/images%2Fimage%20of%20pc.jpeg?alt=media&token=057583b8-036a-4ffd-9657-58e010d7e8e8' })
                    }
                    else {
                        throw(error);
                    };
            });
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

                {/*placeholder for if the change os popup is needed*/}
                <div id="productPageOSPopupWrapper" className="popupWrapper" style={{overflowY: 'unset'}}>
                    {changeOperatingSystemPopupState}
                </div>

                {/*PAGE TO ALLOW A USER TO PURCHACE A PRODUCT*/}
                <div>
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
                                    <SlidingButton
                                    onClickFunction={purchaseButtonClicked}
                                    id="purchaseButton"
                                    imgSrc='https://firebasestorage.googleapis.com/v0/b/hunter-pcs-firebase.appspot.com/o/images%2Fimage%20of%20pc%202.jpeg?alt=media&token=130b9cda-a29c-4e11-a752-d1e68ef07788'
                                    textContent={purchaseButtonContent}
                                    />

                                {/*button to change the operating system of the prebuilt*/}
                                <button onClick={() => {
                                    changeOperatingSystem();
                                }}>
                                    <h3 className="alignRight">
                                        Change the operating system of your PC ⟶
                                    </h3>
                                </button>
                            </td>

                            <td>
                                {/*PRODUCT IMAGE + PRODUCT PRICE*/}
                                <img src={productImage.productImageURL} style={{width: '75%'}}  className="mainImage centered" alt="loading..."/>
                                <h2 style={{paddingBottom: 0, marginBottom: 0}}>
                                    {renderIfLoaded("£ "+state.price)}
                                </h2>
                                <p style={{padding: 0, marginTop: 0}}>
                                    {state.shippingCost ? `(+£${state.shippingCost} shipping)` : 'loading shipping...'}
                                </p>
                            </td>
                        </tr>
                    </table>
                </div>
                
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
                                    <Image imagePath="images/motherboardTall.jpeg" imageClasses="mainImage" imageStyles={{width: '75%', marginLeft: '5%', maxHeight: 'unset'}} />
                                </td>

                                <td>
                                    {displaySystemSpecAsString()}
                                </td>
                            </tr>
                        </thead>
                    </table>
                    <div className="dividerLine"></div>
                </div>

                {/*ALTER THE BUILD SECTION*/}
                <div>
                    <GenericMarkupSection
                    headingText="Fully customisable"
                    subheadingText="Put your own spin on it"
                    paragraphText="All of our prebuilt models are 100% customisable. That means you can swap out parts as you please. Bear in mind that using more expensive parts will increase the cost of your PC."
                    linkContent="Customise this model ⟶"
                    imgSrc='images/motherboardVTall.jpeg'
                    leftBool={true}
                    linkLogic={() => {
                        sessionStorage.setItem('openCustomPCForm', 'true');
                        sessionStorage.setItem('customPCFormData', JSON.stringify(state.fullSystemSpec));
                        setTimeout(() => {
                            navigate('/customPCs');
                        }, 100);
                    }} />
                </div>

                {/*NO EXPENSES SPARED*/}
                <div>
                    <GenericMarkupSection
                    headingText='No expense spared'
                    subheadingText='We guarantee quality'
                    paragraphText="At hunter PCs, we understand how annoying it can be to purchase a new device only for it to fail and need returning. That's why we
                    guarantee all PCs delivered to you are made with 100% brand new components. All our power supply units are heavily tested along with
                    the PCs themselves."
                    linkContent='More on our quality guarantee ⟶'
                    linkDestination='/support'
                    imgSrc='images/gamingSetupWIDE2.jpeg'
                    customImageCellStyles={{width: '60%'}} 
                    leftBool={false}/>
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

                {/*placeholder for if the change os popup is needed*/}
                <div id="productPageOSPopupWrapper" className="popupWrapper">
                    {changeOperatingSystemPopupState}
                </div>

                <h1>
                    {renderIfLoaded('Hunter '+state.frontendName)}
                </h1>

                {/*product name, price and description */}
                <table>
                    <thead>
                        <tr>
                            <td style={{width: '60%'}}>
                                <h2 className="alignRight">
                                    {renderIfLoaded(state.subheaderDescription)}
                                </h2>
                            </td>
                            <td>
                                <img src={productImage.productImageURL} className="mainImage centered" alt="loading..."/>
                                <h2 style-={{marginBottom: 0, paddingBottom: 0}}>
                                    £{state.price}
                                </h2>
                                <p style={{padding: 0, marginTop: 0}}>
                                    {state.shippingCost ? `(+£${state.shippingCost} shipping)` : 'loading...'}
                                </p>
                            </td>
                        </tr>
                    </thead>
                </table>
                <p>
                    {renderIfLoaded(state.fullDescription)}
                </p>
                <SlidingButton
                    onClickFunction={purchaseButtonClicked}
                    id="purchaseButton"
                    imgSrc='https://firebasestorage.googleapis.com/v0/b/hunter-pcs-firebase.appspot.com/o/images%2Fimage%20of%20pc%202.jpeg?alt=media&token=130b9cda-a29c-4e11-a752-d1e68ef07788'
                    textContent={purchaseButtonContent}
                    customButtonStyles={{backgroundColor: '#232020'}}
                    />
                    
                {/*button to change the operating system of the prebuilt*/}
                <button onClick={() => {
                    changeOperatingSystem();
                }}>
                    <h3>
                        Change the operating system of your PC ⟶
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

                {/*ALTER THE BUILD SECTION*/}
                <div>
                    <GenericMarkupSection
                    headingText="Fully customisable"
                    subheadingText="Put your own spin on it"
                    paragraphText="All of our prebuilt models are 100% customisable. That means you can swap out parts as you please. Bear in mind that using more expensive parts will increase the cost of your PC."
                    linkContent="Customise this model ⟶"
                    imgSrc='images/motherboardVTall.jpeg'
                    customImageStyles={{maxHeight: '40vh'}}
                    leftBool={true}
                    linkLogic={() => {
                        sessionStorage.setItem('openCustomPCForm', 'true');
                        sessionStorage.setItem('customPCFormData', JSON.stringify(state.fullSystemSpec));
                        setTimeout(() => {
                            navigate('/customPCs');
                        }, 100);
                    }} />
                </div>

                {/*NO EXPENSES SPARED SECTION*/}
                <div>
                <GenericMarkupSection
                    headingText='No expense spared'
                    subheadingText='We guarantee quality'
                    paragraphText="At hunter pcs, we understand how annoying it can be to purchase a new device only for it to fail and need returning. That's why we
                    guarantee all PCs delivered to you are made with 100% brand new components. All our power supply units are heavily tested along with
                    the PCs themselves."
                    linkContent='More on our quality guarantee ⟶'
                    linkDestination='/support'
                    imgSrc='images/gamingSetupWIDE2.jpeg'
                    DontShowDividerLineBool={true}
                    leftBool={false}/>
                </div>
            </React.Fragment>
        );
    };
};

export default ProductPage;