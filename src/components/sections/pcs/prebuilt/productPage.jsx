import React, {Component} from 'react';

import { getDoc, doc, getFirestore } from 'firebase/firestore';
import { firebaseInit } from '../../../../firebase.js';

import { renderIfLoaded, changePage } from '../../../../index.js';
import LoginPopup from '../../account/loginPopup.jsx';
import '../pcsStyles.scss';

firebaseInit();

class ProductPage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            product: sessionStorage.getItem('product'),
            frontendName: undefined,
            price: undefined,
            subheaderDescription: undefined,
            fullDescription: undefined,
            fullSystemSpec: undefined,
            productImageURL: 'https://firebasestorage.googleapis.com/v0/b/hunter-pcs-firebase.appspot.com/o/images%2Fimage%20of%20pc.jpeg?alt=media&token=057583b8-036a-4ffd-9657-58e010d7e8e8',
            popup: undefined,
            purchaseButtonContent: "Buy it now, we'll build it tomorrow ⟶"
             //for now this is just a stock image until product images are available
        };
    };

    async componentDidMount() {
        //get the product data from firestore
        const database = getFirestore();
        let docRef = doc(database, 'products', sessionStorage.getItem('product'));
        let docSnap = await getDoc(docRef);

        const dataToFetch = ['frontendName', 'price', 'subheaderDescription', 'fullDescription', 'fullSystemSpec'];

        //fetch all data and add it to state
        dataToFetch.forEach((item) => {
            this.setState ({
                [item]: docSnap.data()[item],
            });
        });

        //now get the product image from firebase storage
        // const storage = getStorage();
        // getDownloadURL(ref(storage, 'images/productImages/'+sessionStorage.getItem('product')))
        //     .then((url) => {
        //         this.setState({
        //             productImageURL: url,
        //         });
        //     });
        //UNCOMMENT THE ABOVE CODE WHEN PRODUCT IMAGES ARE READY (it has not been tested)
    };

    render() {
        return (
            <React.Fragment>

                {/*placeholder for if the login popup is needed*/}
                <div id="productPagePopupWrapper">
                    {this.state.popup}
                </div>

                {/*PAGE TO ALLOW A USER TO PURCHACE A PRODUCT*/}
                <h1 className="alignRight">
                    {renderIfLoaded('Hunter '+this.state.frontendName)}
                </h1>
                <table>
                    <tr>
                        <td>
                            {/*PRODUCT NAME AND DESCRIPTION */}
                            <h2 className="alignRight">
                                {renderIfLoaded(this.state.subheaderDescription)}
                            </h2>
                            <p className="alignLeft">
                                {renderIfLoaded(this.state.fullDescription)}
                            </p>

                            {/*PURCHASE BUTTON*/}
                            <button type="button" id="purchaseButton" onClick={() => {
                                if (sessionStorage.getItem('loggedIn') == 'false') {

                                    //the user can only make a purcase if logged in, so make sure they are logged in
                                    this.setState({popup: <LoginPopup/>})
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
                                    localStorage.setItem(productStorageName, this.state.product);

                                    //NOTE: the local storage vars for products will be cleared upon purchase to optimise browser storage usage

                                    //alter frontend
                                    this.setState({purchaseButtonContent: 'Added to basket! Visit your basket to buy now'})
                                    document.getElementById('purchaseButton').style.opacity = 0.5;

                                    //change the page to the checkout page
                                    setTimeout(() => {
                                        changePage('basket');
                                    }, 1000);
                                }
                            }}>
                                <h3>
                                    {this.state.purchaseButtonContent}
                                </h3>
                            </button>
                        </td>

                        <td>
                            {/*PRODUCT IMAGE*/}
                            <img src={this.state.productImageURL} style={{width: '75%'}}  className="mainImage centered" alt="loading..."/>
                            <h2>
                                {renderIfLoaded("£ "+this.state.price)}
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
                                className="mainImage" style={{width: '75%', marginLeft: '5%'}} alt="loading..."/>
                                </td>

                                <td>
                                    {this.displaySystemSpecAsString()}
                                </td>
                            </tr>
                        </thead>
                    </table>
                </div>

                {/*NO EXPENSES SPARED*/}
                <div>
                    <table>
                        <thead>
                            <tr>
                                <td>
                                    <h2 className="alignRight">
                                        We guarantee no expenses spared
                                    </h2>
                                    <p className="alignLeft">
                                        At hunter pcs, we understand how annoying it can be to purchase a new device only for it to fail and need returning. That's why we
                                        guarantee all pcs delivered to you are made with 100% brand new components. All our power supply units are heavily tested along with
                                        the pcs themselves.
                                    </p>
                                    <button type="button" onClick={function() {changePage('support')}}>
                                        <h3>
                                            More on our quality guarantee ⟶
                                        </h3>
                                    </button>
                                </td>
                                <td style={{width: '60%'}}>
                                    <img src='https://firebasestorage.googleapis.com/v0/b/hunter-pcs-firebase.appspot.com/o/images%2FgamingSetupWIDE2.jpeg?alt=media&token=f45440e7-bb17-4e56-9213-6bb178ed49df' 
                                    className="mainImage centered" style={{width: '85%'}} alt="loading..."/>
                                </td>
                            </tr>
                        </thead>
                    </table>
                </div>
            </React.Fragment>
        );
    };

    displaySystemSpecAsString() {
        //only run if a value has been found
        if (this.state.fullSystemSpec) {
            let specHTML = [<h2>
                {"Our "+this.state.frontendName+" could be yours"}
            </h2>];
            let spec = this.state.fullSystemSpec;

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
    }
};

export default ProductPage;