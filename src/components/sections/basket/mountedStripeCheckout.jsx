import React, {useState, useEffect} from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51OIsKCCzpWfV0Kwk1E0NbTsrGGhHbRBDBZAximjX9NQSm5m8alYLA0TR7w0FLZuGvCAqspxyDUNQ4oJRYd8QEnpI0037jzKB5l');

function paymentSucsessfulFunction() {
    //empty the user's basket
    for(let i = 0; i < 100; i++) {
        localStorage.removeItem('hunterPcsProduct'+i);
    };

    //next time the user renders the page, show a payment sucsessful screen
    sessionStorage.setItem('currentPage', 'paymentSucsessful');

    window.location.reload();
};

export default function StripeCheckout() {
    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {

        //create a stripe checkout the second the page loads

        const stripeSession = JSON.parse(sessionStorage.getItem('stripeSession'));
        setClientSecret(stripeSession.client_secret);
    }, []);

    const options = {clientSecret, onComplete: function() {paymentSucsessfulFunction()}};

    return(
        <div id="checkout">
            {clientSecret && (
                <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
                    <EmbeddedCheckout />
                </EmbeddedCheckoutProvider>
            )}
        </div>
    )
};