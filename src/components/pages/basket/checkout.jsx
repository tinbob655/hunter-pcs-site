import React, {Component} from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from '@stripe/react-stripe-js'; 
import AutoNav from '../../multiPageComponents/autoNav.jsx';
import firebaseInstance from '../../../classes/firebase.js';
import {query, collection, where, getDocs, deleteDoc, doc} from 'firebase/firestore';
import AuthProvider from '../../../context/authContext.jsx';
import SecureLS from 'secure-ls';

class StripeCheckout extends Component {

    static contextType = AuthProvider;

    constructor(props) {
        super(props);

        //create a stripe checkout when loaded
        const stripeSession = JSON.parse(sessionStorage.getItem('stripeSession'));
        const clientSecret = stripeSession.client_secret;
        const stripePromise = loadStripe('pk_live_51OIsKCCzpWfV0Kwk7LPqpBIw0kMMQVd8SiMzIjsG8Iz6ofCJ7k1KCEPPd9Jkk5Sz1m0QumHcl7eQC3HjVBYJEeB200wMUMSheW')

        //navigates to the /paymentCompleted page after the checkout is done
        const options = {clientSecret, onComplete: () => {

            //delete the discount
            const ls = new SecureLS();
            ls.remove('discount');

            //mark the purchase as valid
            sessionStorage.setItem('newPurchase', 'true');

            //navigate to the paymentCompleted page
            this.setState({autoNav: <AutoNav destination='/purchaseCompleted' />})
        }};

        this.state = {
            clientSecret: clientSecret,
            options: options,
            stripePromise: stripePromise,
            autoNav: <></>,
            authUID: this.context?.uid,
        };
    };

    componentDidMount() {

        //set auth uid
        this.setState({
            authUID: this.context.uid,
        });
    };

    render() {
        return (
            <React.Fragment>
                <div className="popupWrapper" id="checkoutWrapper">
                    <h1>
                        Checkout
                    </h1>

                    {this.state.clientSecret && (
                        <EmbeddedCheckoutProvider stripe={this.state.stripePromise} options={this.state.options}>
                            <EmbeddedCheckout />
                        </EmbeddedCheckoutProvider>
                    )}

                    <p>
                        Please note that all of our purchases are handled securely by Stripe
                    </p>

                    <div style={{backgroundColor: 'white', height: '5px', width: '75%', marginLeft: 'auto', marginRight: 'auto'}}></div>

                    {/*apply a discount code section*/}
                    <h2>
                        Apply a discount code
                    </h2>
                    <p>
                        If you have been sent a discount code, then you can apply it here
                    </p>
                    <form id="discountCodeForm" onSubmit={(event) => {this.discountCodeFormSubmitted(event)}}>
                        <input type="text" name="discountCode" placeholder='Discount code...' required />
                        <input type="submit" className="submit" value="Apply" style={{marginBottom: '3vh'}}/>
                    </form>
                </div>

                {this.state.autoNav}
            </React.Fragment>
        );
    };

    async discountCodeFormSubmitted(event) {
        event.preventDefault();
        const userDiscountCode = event.currentTarget.discountCode.value;

        //attempt to fetch the code the user entered from the database
        const firestore = firebaseInstance.getFirebaseFirestore;
        const discountCodeQuery = query(collection(firestore, 'discountCodes'), where('code', '==', userDiscountCode));
        const discountCodeSnap = await getDocs(discountCodeQuery);

        //if the user entered a code which does not exist
        if (discountCodeSnap.size === 0) {
            throw new Error('Invalid code');
        }
        else {

            //the user entered a valid discount code
            discountCodeSnap.forEach( async(document) => {

                //make sure a user cannot apply a discount code which they created themselves
                if (document.id === this.state.authUID) {
                    throw new Error('Cannot apply a discount code which you created yourself');
                }
                else {

                    //get the discount
                    const discountMultiplier = document.data().discountMultiplier;
    
                    //delete the code from firestore as it has now been used
                    const codeDocId = document.id;
                    await deleteDoc(doc(firestore, 'discountCodes', codeDocId));
    
                    //apply the discount to the user's purchase.
                    const ls = new SecureLS();
                    ls.set('discount', {data: discountMultiplier});

                    //allow the setting to happen, then refresh
                    setTimeout(() => {
                        window.location.reload();
                    }, 100);
                };
            });
        };
    };
};

export default StripeCheckout;