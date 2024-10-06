import React, {Component} from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from '@stripe/react-stripe-js'; 
import AutoNav from '../../multiPageComponents/autoNav.jsx';

class StripeCheckout extends Component {

    constructor(props) {
        super(props);

        //create a stripe checkout when loaded
        const stripeSession = JSON.parse(sessionStorage.getItem('stripeSession'));
        const clientSecret = stripeSession.client_secret;
        const stripePromise = loadStripe('pk_live_51OIsKCCzpWfV0Kwk7LPqpBIw0kMMQVd8SiMzIjsG8Iz6ofCJ7k1KCEPPd9Jkk5Sz1m0QumHcl7eQC3HjVBYJEeB200wMUMSheW')

        //navigates to the /paymentCompleted page after the checkout is done
        const options = {clientSecret, onComplete: () => {
            sessionStorage.setItem('newPurchase', 'true');
            this.setState({autoNav: <AutoNav destination='/purchaseCompleted' />})
        }};

        this.state = {
            clientSecret: clientSecret,
            options: options,
            stripePromise: stripePromise,
            autoNav: <></>,
        };
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
                </div>

                {this.state.autoNav}
            </React.Fragment>
        );
    };
};

export default StripeCheckout;