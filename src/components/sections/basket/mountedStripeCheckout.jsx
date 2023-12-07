import React, {useState, useEffect} from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51OIsKCCzpWfV0Kwk1E0NbTsrGGhHbRBDBZAximjX9NQSm5m8alYLA0TR7w0FLZuGvCAqspxyDUNQ4oJRYd8QEnpI0037jzKB5l');

export default function StripeCheckout() {
    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {

        //create a stripe checkout the second the page loads
        fetch('/create-checkout-session', {
            method: "POST",
        })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret));
    }, []);

    const options = {clientSecret};

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