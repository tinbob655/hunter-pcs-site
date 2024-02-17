import React, {Component} from 'react';
import { startStripeSession, sanitiseStripePrice } from '../../multiPageComponents/checkout/checkoutFunctions.ts';
import StripeCheckout from '../../multiPageComponents/checkout/mountedStripeCheckout.jsx';
import GenericMarkupSection from '../../multiPageComponents/genericMarkupSection';

class CustomStripePayer extends Component {

    constructor(props) {
        super(props);

        //get the ammount from the URL (user will visit this page from external link which will contain the payment amount)
        let params = new URLSearchParams(document.location.search);

        this.state = {
            amount: sanitiseStripePrice(params.get("amount")),
            checkout: <></>
        };
    };

    render() {
        return (
            <React.Fragment>
                <GenericMarkupSection
                headingText="Get your custom PC"
                subheadingText="The final step between you and the game"
                paragraphText="Your custom PC has been validated. The last thing to do is click the button below, and proceed through the secure checkout. After that, we'll start
                building your dreams!"
                imgSrc='images/image of pc.jpeg'
                linkContent="Get your dream PC delivered straight to you ⟶"
                linkLogic={() => {startStripeSession(this.state.amount, 'Custom PC')
                .then(() => {this.setState({checkout: <StripeCheckout />});
            setTimeout(() => {
                document.getElementById('stripeCheckoutWrapper').classList.add('shown');
            }, 100);})}}
                DontShowDividerLineBool={true} 
                leftBool={true}/>

                <div id="stripeCheckoutWrapper" className="popupWrapper" style={{padding: '30px'}}>
                        {this.state.checkout}
                </div>
            </React.Fragment>
        );
    };
};

export default CustomStripePayer;