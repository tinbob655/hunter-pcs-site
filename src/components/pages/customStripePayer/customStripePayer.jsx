import React, {Component} from 'react';
import { startStripeSession, sanitiseStripePrice } from '../../multiPageComponents/checkout/checkoutFunctions.ts';
import StripeCheckout from '../../multiPageComponents/checkout/mountedStripeCheckout.jsx';
import GenericMarkupSection from '../../multiPageComponents/genericMarkupSection';

//This page allows url-based payments. The ammount is specified in the url variable "amount". Page can only be accessed by typing the specific url: there are no links to it

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

        //make sure the page can only be accessed if there is a payment amount
        if (!this.state.amount) {
            return (
                <React.Fragment>
                    <GenericMarkupSection
                    headingText="Something went wrong"
                    subheadingText="Looks like we ran into an error"
                    paragraphText="Either our website is encountering an eror or the link used to access this page was used incorrrectly. Please try again later"
                    imgSrc='images/rounded skull.jpeg'
                    linkDestination="/"
                    linkContent="Return home ⟶"
                    leftBool={true}
                    DontShowDividerLineBool={true} />
                </React.Fragment>
            )
        }
        else {
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
        }
    };
};

export default CustomStripePayer;