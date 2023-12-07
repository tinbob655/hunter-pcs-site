import React, {Component} from 'react';
import { convertOutOfCamelCase, changePage } from '../../../index.js';
import LoginPopup from '../account/loginPopup.jsx';
import { getDoc, doc, getFirestore } from 'firebase/firestore';

//defining basketArray here not later beause it is to be used in multiple processes
var basketArray = [];

class Basket extends Component {

    state = {
        loginPopup: <></>,
    };

    render() {
        return (
            <React.Fragment>
                <h1 className="alignRight">
                    Your basket
                </h1>

                {/*list of products the user has in their basket*/}
                <div>
                    <table>
                        <thead>
                            <tr>
                                <td>
                                    <h2 className="alignLeft">
                                        All the stuff you've added, right here:
                                    </h2>
                                    {this.getBasket()}
                                </td>
                                <td>
                                    <img src='https://firebasestorage.googleapis.com/v0/b/hunter-pcs-firebase.appspot.com/o/images%2Fimage%20of%20pc%202.jpeg?alt=media&token=130b9cda-a29c-4e11-a752-d1e68ef07788' 
                                    className="mainImage centered" alt="loading..." />
                                </td>
                            </tr>
                        </thead>
                    </table>
                </div>

                {/*link to checkout page*/}
                <div>
                    <h1 className="alignLeft">
                        Buy now
                    </h1>
                    <table>
                        <thead>
                            <tr>
                                <td>
                                    <img src='https://firebasestorage.googleapis.com/v0/b/hunter-pcs-firebase.appspot.com/o/images%2FgamingSetupWIDE2.jpeg?alt=media&token=f45440e7-bb17-4e56-9213-6bb178ed49df'
                                    className="mainImage centered" alt="loading..." />
                                </td>
                                <td>
                                    <h2 className="alignRight">
                                        Buy now
                                    </h2>
                                    <p className="alignLeft">
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

                                            {/*if the user is logged in, then rev up stripe. Time for profit!!!*/}
                                            <button type="button" onClick={() => {
                                                this.revUpStripe();
                                            }}>
                                                <h3>
                                                    Click here to get your perfect pc delivered straight to you ⟶
                                                </h3>
                                            </button>
                                        </React.Fragment>
                                    )}
                                </td>
                            </tr>
                        </thead>
                    </table>
                </div>

                <div id="loginPopupWrapper">
                    {this.state.loginPopup}
                </div>
            </React.Fragment>
        );
    };

    async revUpStripe() {

        //stonks time

        //setup express
        const express = require('express');
        const app = express();

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
        

        const stripe = require('stripe')('sk_test_51OIsKCCzpWfV0Kwku1Usf1FFdFZTgPOwFtt7zOpA9aPEb40kRgAmeUegSJ0uT2tC9YDtK8cPcZPVHB9ds0ovKrPW000Cn5l82B');

        app.post('/create-checkout-session', async (req, res) => {
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
                return_url: 'https://www.hunterpcs.com',
            });

            res.send({clientSecret: session.client_secret});
        });

        app.listen(4242, () => {console.log(`Listening on port ${4242}!`)})
    };

    getBasket() {
        let basketHTML = [];

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
                <button type="button" onClick={function() {changePage('gamingPcs')}}>
                    <h3>
                        Looks like you haven't added anything to your basket. Click here to do something about that
                    </h3>
                </button>
            </React.Fragment>)
        };

        return basketHTML;
    }
};

export default Basket;