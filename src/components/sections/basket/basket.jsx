import React, {Component} from 'react';
import { convertOutOfCamelCase, changePage } from '../../../index.js';
import LoginPopup from '../account/loginPopup.jsx';
import { getDoc, doc, getFirestore } from 'firebase/firestore';
import StripeCheckout from './mountedStripeCheckout.jsx';

//defining basketArray here not later beause it is to be used in multiple processes
var basketArray = [];

class Basket extends Component {

    state = {
        loginPopup: <></>,
        stripeCheckout: <></>,
        loggedInPaymentButtonText: 'Click here to get your perfect pc delivered straight to you ⟶',
        addressPopup: <></>,

    };

    render() {
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
                                        Done browsing? Ready to buy? Then hit the purchase button: the final step between you and a quality gaming pc. All payments are 100% secure
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
                                    <h2>
                                        All the stuff you've added, right here:
                                    </h2>
                                    {this.getBasket()}
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
    };

    async revUpStripe() {

        //will fire after the user submits the address form
        function afterAddressRecieved(event) {
            event.preventDefault();
            //save the address to session storage
            const currentTarget = event.currentTarget;
            try {
                const address = {
                    addressLine1: currentTarget.addressLine1.value,
                    addressLine2: currentTarget.addressLine2.value,
                    townOrCity: currentTarget.townOrCity.value,
                    postcode: currentTarget.postcode.value,
                };
                sessionStorage.setItem('address', JSON.stringify(address));
                
                            //now proceed, allowing the user to open the payment popup
                document.getElementById('addressPopupWrapper').classList.remove('shown');
                openPaymentPopup();

            } catch(error) {
                console.log(error);
            };
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
    
            //total price must be in P not £
            totalPrice *= 100;
            sessionStorage.setItem('purchasedProducts', finalProudctNameString);

            //get the key from firebase
            let docRef = doc(db, 'keys', 'stripe_sk');
            let docSnap = await getDoc(docRef);
    
            const stripe = require('stripe')(docSnap.data().value);
            const session = await stripe.checkout.sessions.create({
                line_items: [{
                    price_data: {
                        currency: 'gbp',
                        product_data: {
                            name: finalProudctNameString,
                        },
                        unit_amount: totalPrice,
                    },
                    quantity: 1,
                }],
                mode: 'payment',
                ui_mode: 'embedded',
                redirect_on_completion: 'never',
            });
    
            sessionStorage.setItem('stripeSession', JSON.stringify(session));

            this.setState({stripeCheckout: <StripeCheckout/>});
    
            //now show the stripe popup
            setTimeout(() => {
                document.getElementById('stripeCheckoutWrapper').classList.add('shown');
            }, 100);
        };

        try {
            //stonks time

            //first, we gotta get a delivery address
            this.setState({addressPopup: (
                <React.Fragment>
                    <h2>
                        Where do you want us to drop it off?
                    </h2>
                    <form id="addressForm">
                        <p>
                            Address line 1:
                        </p>
                        <label htmlFor="addressLine1">Address line 1</label>
                        <input type="text" id="addressLine1" name="addressLine1" style={{maxWidth: '75%'}} placeholder='Address line 1...'></input>
                        <div className="cleanLinkButtonDivider" style={{maxWidth: '75%', marginTop: '2vh'}}></div>

                        <p>
                            Address line 2:
                        </p>
                        <label htmlFor="addressLine2">Address line 2</label>
                        <input type="text" id="addressLine2" name="addressLine2" style={{maxWidth: '75%'}} placeholder='Address line 2...'></input>
                        <div className="cleanLinkButtonDivider" style={{maxWidth: '75%', marginTop: '2vh'}}></div>

                        <p>
                            Town or city:
                        </p>
                        <label htmlFor="townOrCity">Town or city</label>
                        <input type="text" id="townOrCity" name="townOrCity" style={{maxWidth: '75%'}} placeholder='Town or city...'></input>
                        <div className="cleanLinkButtonDivider" style={{maxWidth: '75%', marginTop: '2vh'}}></div>

                        <p>
                            Postcode:
                        </p>
                        <label htmlFor="postcode">Postcode</label>
                        <input type="text" id="postcode" name="postcode" style={{maxWidth: '75%'}} placeholder='Postcode...'></input>
                        <div className="cleanLinkButtonDivider" style={{maxWidth: '75%', marginTop: '2vh'}}></div>

                        <label htmlFor="submit">Submit</label>
                        <input type="submit" id="submit" name="submit" value="Submit" className="submit" style={{fontWeight: 900}}></input>
                    </form>
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
                <button type="button" onClick={function() {changePage('pcsMain')}}>
                    <h3>
                        Looks like you haven't added anything to your basket. Click here to do something about that ⟶
                    </h3>
                </button>
            </React.Fragment>)
        };

        return basketHTML;
    };
};

export default Basket;