import React, {Component} from 'react';
import { convertOutOfCamelCase, isMobile } from '../../../index.js';
import { Link } from 'react-router-dom';
import LoginPopup from '../../multiPageComponents/popups/login/loginPopup.jsx';
import { getDoc, doc, getFirestore } from 'firebase/firestore';
import StripeCheckout from '../../multiPageComponents/checkout/mountedStripeCheckout.jsx';
import AddressPopup from '../../multiPageComponents/popups/address/addressPopup.jsx';
import {startStripeSession} from '../../multiPageComponents/checkout/checkoutFunctions.ts';

//defining here not later beause it is to be used in multiple processes (make global)
var basketArray = [];

class Basket extends Component {

    state = {
        loginPopup: <></>,
        stripeCheckout: <></>,
        loggedInPaymentButtonText: 'Click here to get your perfect PC delivered straight to you ⟶',
        addressPopup: <></>,

    };

    render() {

        //desktop basket
        if (!isMobile()) {
            return (
                <React.Fragment>
                    <h1 className="alignRight">
                        Your basket
                    </h1>
    
                    {/*buy now section*/}
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <td>
                                        <h2 className="alignLeft">
                                            Buy now
                                        </h2>
                                        <p className="alignRight">
                                            Done browsing? Ready to buy? Then hit the purchase button: the final step between you and a quality gaming PC. All payments are 100% secure
                                            as per our privacy policy
                                        </p>
                                        {sessionStorage.getItem('loggedIn') == 'false' ? (
                                            <React.Fragment>
    
                                                {/*if the user is not logged in, make them log in before paying*/}
                                                <button type="button" onClick={() => {
                                                    this.setState({loginPopup: <LoginPopup/>});
                                                }}>
                                                    <h3>
                                                        Log in before you buy ⟶
                                                    </h3>
                                                </button>
                                            </React.Fragment>
                                        ) : (
                                            <React.Fragment>
    
                                                {/*if the user is logged in and there is stuff in their basket, then rev up stripe. Time for profit!!!*/}
                                                <button type="button" onClick={() => {
                                                    //make sure the basket is not empty
                                                    if (basketArray.length > 0) {
                                                        this.revUpStripe();
                                                    }
                                                    else {
                                                        this.setState({loggedInPaymentButtonText: 'Your basket is empty. Please add something to your basket before you buy'})
                                                    }
                                                }}>
                                                    <h3>
                                                        {this.state.loggedInPaymentButtonText}
                                                    </h3>
                                                </button>
                                            </React.Fragment>
                                        )}
                                    </td>
                                    <td>
                                        <img src='https://firebasestorage.googleapis.com/v0/b/hunter-pcs-firebase.appspot.com/o/images%2FgamingSetupWIDE2.jpeg?alt=media&token=f45440e7-bb17-4e56-9213-6bb178ed49df'
                                        className="mainImage centered" alt="loading..." />
                                    </td>
                                </tr>
                            </thead>
                        </table>
                    </div>
    
                    {/*list of products the user has in their basket*/}
                    <div>
                        <h1 className="alignLeft">
                            Your stuff
                        </h1>
                        <table>
                            <thead>
                                <tr>
                                    <td>
                                        <img src='https://firebasestorage.googleapis.com/v0/b/hunter-pcs-firebase.appspot.com/o/images%2Fimage%20of%20pc%202.jpeg?alt=media&token=130b9cda-a29c-4e11-a752-d1e68ef07788' 
                                        className="mainImage centered" alt="loading..." />
                                    </td>
                                    <td>
                                        <h2 className="alignRight">
                                            All the stuff you've added, right here:
                                        </h2>
                                        {this.getBasket()}

                                        <button type="button" onClick={() => {
                                            this.clearBasket();
                                        }}>
                                            <h3>
                                                Click here to empty your basket
                                            </h3>
                                        </button>
                                    </td>
                                </tr>
                            </thead>
                        </table>
                    </div>
    
                    <div id="outerLoginPopupWrapper">
                        {this.state.loginPopup}
                    </div>
    
                    <div id="stripeCheckoutWrapper" className="popupWrapper" style={{padding: '30px'}}>
                        {this.state.stripeCheckout}
                    </div>
    
                    <div id="addressPopupWrapper" className="popupWrapper" style={{padding: '30px'}}>
                        {this.state.addressPopup}
                    </div>
                </React.Fragment>
            );
        }

        //mobile basket
        else {
            return (
                <React.Fragment>
                    <h1>
                        Your basket
                    </h1>

                    {/*buy now section*/}
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <td>
                                        <img src='https://firebasestorage.googleapis.com/v0/b/hunter-pcs-firebase.appspot.com/o/images%2FgamingSetupWIDE2.jpeg?alt=media&token=f45440e7-bb17-4e56-9213-6bb178ed49df'
                                        className="mainImage centered" alt="loading..." />
                                    </td>
                                    <td style={{width: '40%'}}>
                                        <h2 className="alignLeft">
                                            Buy now
                                        </h2>
                                    </td>
                                </tr>
                            </thead>
                        </table>
                        <p>
                            Done browsing? Ready to buy? Then hit the purchase button: the final step between you and a quality gaming PC. All payments are 100% secure
                            as per our privacy policy
                        </p>
                        {sessionStorage.getItem('loggedIn') != 'true' ? (
                            <React.Fragment>

                                {/*if the user is not logged in, make them log in before paying*/}
                                <button type="button" onClick={() => {
                                    this.setState({loginPopup: <LoginPopup/>});
                                }}>
                                    <h3>
                                        Log in before you buy ⟶
                                    </h3>
                                </button>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>

                                {/*if the user is logged in and there is stuff in their basket, then rev up stripe. Time for profit!!!*/}
                                <button type="button" onClick={() => {
                                    //make sure the basket is not empty
                                    if (basketArray.length > 0) {
                                        this.revUpStripe();
                                    }
                                    else {
                                        this.setState({loggedInPaymentButtonText: 'Your basket is empty. Please add something to your basket before you buy'})
                                    }
                                }}>
                                    <h3>
                                        {this.state.loggedInPaymentButtonText}
                                    </h3>
                                </button>
                            </React.Fragment>
                        )}
                    </div>

                    <div className="dividerLine"></div>

                    {/*list of all the products the user has in their basket*/}
                    <div>
                        <h1>
                            Your stuff
                        </h1>
                        <table>
                            <thead>
                                <tr>
                                    <td style={{width: '40%'}}>
                                        <h2 className="alignRight">
                                            All the stuff you've added, right here
                                        </h2>
                                    </td>
                                    <td>
                                        <img src='https://firebasestorage.googleapis.com/v0/b/hunter-pcs-firebase.appspot.com/o/images%2Fimage%20of%20pc%202.jpeg?alt=media&token=130b9cda-a29c-4e11-a752-d1e68ef07788' 
                                        className="mainImage centered" alt="loading..." />
                                    </td>
                                </tr>
                            </thead>
                        </table>
                        {this.getBasket()}

                        <button type="button" onClick={() => {
                            this.clearBasket();
                        }}>
                            <h3>
                                Click here to empty your basket
                            </h3>
                        </button>
                    </div>

                    <div id="outerLoginPopupWrapper">
                        {this.state.loginPopup}
                    </div>
    
                    <div id="stripeCheckoutWrapper" className="popupWrapper" style={{padding: '30px'}}>
                        {this.state.stripeCheckout}
                    </div>
    
                    <div id="addressPopupWrapper" className="popupWrapper" style={{padding: '30px'}}>
                        {this.state.addressPopup}
                    </div>
                </React.Fragment>
            )
        }
    };

    async revUpStripe() {
        //stonks time!!!

        //will fire after the user submits the address form
        function afterAddressRecieved(event) {
            event.preventDefault();

            const currentTarget = event.currentTarget;

            //make sure there are values in all fields
            if ((!currentTarget.email.value || !currentTarget.addressLine1.value || !currentTarget.addressLine2.value || !currentTarget.townOrCity.value || !currentTarget.postcode.value)) {
                document.getElementById('fillAllFieldsPopup').style.visibility = 'visible';
                document.getElementById('fillAllFieldsPopup').style.height = 'auto';
                document.getElementById('addressPopupWrapper').scrollTop = 0;
            }
            else {

                //save the address and other info to session storage
                try {
                    const address = {
                        addressLine1: currentTarget.addressLine1.value,
                        addressLine2: currentTarget.addressLine2.value,
                        townOrCity: currentTarget.townOrCity.value,
                        postcode: currentTarget.postcode.value,
                    };
                    sessionStorage.setItem('address', JSON.stringify(address));
                    sessionStorage.setItem('email', event.currentTarget.email.value);

                    //now proceed, allowing the user to open the payment popup
                    document.getElementById('addressPopupWrapper').classList.remove('shown');
                    openPaymentPopup();
    
                } catch(error) {
                    console.log(error);
                };
            }
        };

        const openPaymentPopup = async() => {
            //setup cloud firestore
            const db = getFirestore();
    
            //get the product name(s) and their total price 
            let finalProudctNameString = '';
            let totalPrice = 0;
    
    
            for (let i = 0; i < basketArray.length; i++) {
                let item = basketArray[i];
    
                //name
                finalProudctNameString += '-'+item+'\n';
        
                //price (get backend name)
                let formattedName = item.substring(0, 1).toLowerCase();
                formattedName += item.substring(1).replace(' ', '');
    
                //price (fetch from cloud firestore)
                let docRef = doc(db, 'products', formattedName);
                let docSnap = await getDoc(docRef);
                
                //add to total price
                totalPrice += docSnap.data().price;
            };

            //account for shipping
            let shippingDocRef = doc(db, 'costs', 'shippingCost');
            let shippingDocSnap = await getDoc(shippingDocRef);
            const shippingCost = shippingDocSnap.data().value;
            
            finalProudctNameString += ` + Shipping costs (£${shippingCost})`;
            totalPrice += shippingCost;

            //account for if a custom operating system was selected
            if (sessionStorage.getItem('customOperatingSystem')) {
                let osDocRef = doc(db, 'operatingSystems', sessionStorage.getItem('customOperatingSystem'));
                let osDocSnap = await getDoc(osDocRef);
                const operatingSystemCost = osDocSnap.data().additionalCost;

                //operating systems which cost less than windows 11 will be negative numbers, so will subtract from totalPrice
                totalPrice = totalPrice + operatingSystemCost;
            };

    
            //total price must be in P not £
            totalPrice *= 100;
            //round to 2 dp
            totalPrice = Math.round(totalPrice *100) / 100;
            sessionStorage.setItem('purchasedProducts', finalProudctNameString);

            //generate an order id
            let orderId = String('#' + Math.round(Math.random() * 100000));
            sessionStorage.setItem('orderId', orderId);

            //start a stripe session, then mount the checkout
            startStripeSession(totalPrice, finalProudctNameString)
            .then(() => {
                this.setState({stripeCheckout: <StripeCheckout/>});
                
                //now show the stripe popup
                setTimeout(() => {
                    document.getElementById('stripeCheckoutWrapper').classList.add('shown');
                }, 100);
            });

        };

        //render the address form
        try {

            //first, we gotta get a delivery address
            this.setState({addressPopup: (
                <React.Fragment>
                    <AddressPopup/>
                </React.Fragment>
            )});

            //wait until the assress form is submitted into the DOM
            setTimeout(() => {
                document.getElementById('addressForm').addEventListener("submit", afterAddressRecieved);
                document.getElementById('addressPopupWrapper').classList.add('shown');
            });
        } catch (error) {
            console.log(error);
        };

    };

    getBasket() {
        let basketHTML = [];

        basketArray = [];

        //because an array cannot be stored in local storage, there are many storage locations (0-100) which may be used to store products, combine them
        for (let i = 0; i < 100; i++) {
            if (localStorage.getItem('hunterPcsProduct'+i)) {
                basketArray.push(convertOutOfCamelCase(localStorage.getItem('hunterPcsProduct'+i)));
            };
        };
        
        //now convert the array to html and return it
        basketArray.forEach((value) => {
            basketHTML.push(<p>-{value}</p>);
        });

        //if the user has not added anything to their basket
        if (basketHTML.length == 0) {
            basketHTML.push(<React.Fragment>
                <Link to='/pcsMain'>
                    <h3>
                        Looks like you haven't added anything to your basket. Click here to do something about that ⟶
                    </h3>
                </Link>
            </React.Fragment>)
        };

        return basketHTML;
    };

    clearBasket() {

        //once again, can't store arrays in session storage yada yada yada. AKA: gotta do 'for' loop
        for(let i = 0; i < 100; i++) {
            localStorage.removeItem('hunterPcsProduct'+i);
        };

        //refresh the page
        setTimeout(() => {
            window.location.reload();
        }, 100);
    };
};

export default Basket;
