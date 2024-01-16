import {getFirestore, doc, getDoc, Firestore, DocumentReference, DocumentSnapshot} from 'firebase/firestore';
import Stripe from 'stripe';


//NOTE: used typeScript here to reduce the chance of errors in checkout (as an error here could be costly)
export async function startStripeSession(amount:number, productString:string) {
    try {
    
        //create a stripe session and save to session storage
        const stripe:Stripe = require('stripe')(process.env.REACT_APP_STRIPE_SK);
        const session = await stripe.checkout.sessions.create({
            line_items: [{
                price_data: {
                    currency: 'gbp',
                    product_data: {
                        name: productString,
                    },
                    unit_amount: amount
                },
                quantity: 1,
            }],
            mode: 'payment',
            ui_mode: 'embedded',
            redirect_on_completion: 'never',
        });

    }catch(error) {
        throw('Error creating stripe session: ' + error.message);
    };
};