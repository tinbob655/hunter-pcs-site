import {getFirestore, doc, getDoc, Firestore, DocumentReference, DocumentSnapshot} from 'firebase/firestore';
import Stripe from 'stripe';


//NOTE: used typeScript here to reduce the chance of errors in checkout (as an error here could be costly)
export async function startStripeSession(amount:number, productString:string) {
    try {
    
        //get stripe sk securely (firestore)
        const db:Firestore = getFirestore();
        const docRef:DocumentReference = doc(db, 'keys', 'stripe_sk');
        const docSnap:DocumentSnapshot = await getDoc(docRef);
        const stripe_sk:string = docSnap.data()?.value;
    
        //create a stripe session and save to session storage
        const stripe:Stripe = require('stripe')(stripe_sk);
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
    
        sessionStorage.setItem('stripeSession', JSON.stringify(session));

    }catch(error) {
        throw('Error creating stripe session: ' + error.message);
    };
};