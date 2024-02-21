import React, {useState, useEffect} from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';

const stripePromise = loadStripe('pk_live_51OIsKCCzpWfV0Kwk7LPqpBIw0kMMQVd8SiMzIjsG8Iz6ofCJ7k1KCEPPd9Jkk5Sz1m0QumHcl7eQC3HjVBYJEeB200wMUMSheW');

export default function StripeCheckout() {
    const [clientSecret, setClientSecret] = useState('');

    const navigate = useNavigate();
    function paymentCompleted(){

        //empty the user's basket
        for(let i = 0; i < 100; i++) {
            localStorage.removeItem('hunterPcsProduct'+i);
        };

        //make sure the discord message can only be sent once
        sessionStorage.setItem('purchaseValid', 'true');
    
        //change the page to the payment successful page
        navigate('/paymentsuccessful');
    };

    useEffect(() => {

        //create a stripe checkout the second the page loads

        const stripeSession = JSON.parse(sessionStorage.getItem('stripeSession'));
        setClientSecret(stripeSession.client_secret);
    }, []);

    const options = {clientSecret, onComplete: function() {paymentCompleted();}};

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