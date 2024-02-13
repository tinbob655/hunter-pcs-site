import React, {Component} from 'react';
import { isMobile } from '../../../index.js';
import EmailPopup from '../../multiPageComponents/popups/email/emailPopup.jsx';
import TrustpilotWidget from '../../multiPageComponents/trustpilotWidget/trustpilotWidget.jsx';
import Image from '../../multiPageComponents/image.jsx';

class PaymentSucsessful extends Component {

    constructor(props) {
        super(props);

        this.state = {
            emailPopup: <></>,
        };
    };

    componentDidMount() {

        //only fire once to prevent multiple purchases if the user presses refresh
        if (sessionStorage.getItem('purchaseValid') === 'true') {
            sessionStorage.removeItem('purchaseValid');
            
            //get the purchase information
            const addressVar = sessionStorage.getItem('address');
            const purchasedProducts = sessionStorage.getItem('purchasedProducts');
            const emailVar = sessionStorage.getItem('email');
            const orderId = sessionStorage.getItem('orderId');
    
            //create a discord webhook session
            const request = new XMLHttpRequest();
            request.open("POST", process.env.REACT_APP_DISCORD_WEBHOOK_URL);
            
            //define the data being sent to the discord bot
            request.setRequestHeader('Content-Type', 'application/json');
            const messageJSON = {
                content: `New purchase with the following information:\n
                Product: ${purchasedProducts}\n
                Delivery address: ${addressVar}\n
                Email: ${emailVar}\n
                Order Id: ${orderId}`,
            };
            
            //send the message
            request.send(JSON.stringify(messageJSON));
        };
    };

    render() {

        //desktop payment sucsessful page
        if (!isMobile()) {
            return (
                <React.Fragment>
                    <h1 className="alignRight">
                        Payment Sucsessful
                    </h1>
    
                    {/*payment sucsessful div*/}
                    <div>
                        <table>
                            <tr>
                                <td>
                                    <h2 className="alignLeft">
                                        Congratulations!
                                    </h2>
                                    <p className='alignRight'>
                                        Your payment was sucsessful! We'll get to work building your dream PC to get you in the game as soon as possible! 
                                        <br/><br/>
                                        We'll email you at {sessionStorage.getItem('email')} with your purchase progress
                                    </p>
                                    <button onClick={() => {this.setState({emailPopup: <EmailPopup/>})}} type="button">
                                        <h3 style={{maxWidth: '50%', margin: 'auto', color: 'red'}}>
                                            If the above address is not your email, then click here to do something about that ASAP. 
                                        </h3>
                                    </button>
                                </td>
                                <td style={{width: '40%'}}>
                                    <Image imagePath="images/gamingSetupWIDE2.jpeg" imageClasses="mainImage centered" />
                                </td>
                            </tr>
                        </table>
                    </div>

                    <TrustpilotWidget />

                    <div id="emailPopupWrapper" className="popupWrapper">
                        {this.state.emailPopup}
                    </div>
                </React.Fragment>
            );
        }

        //mobile payment sucsessful page
        else {
            return (
                <React.Fragment>
                    <h1>
                        Payment sucsessful
                    </h1>
                    <table>
                        <thead>
                            <tr>
                                <td>
                                    <Image imagePath="images/gamingSetupWIDE2.jpeg" imageClasses="mainImage centered" />
                                </td>
                                <td style={{width: '40%'}}>
                                    <h2 className="alignLeft">
                                        Congratulations!
                                    </h2>
                                </td>
                            </tr>
                        </thead>
                    </table>
                    <p>
                        Your payment was sucsessful! We'll get to work building your dream PC to get you in the game as soon as possible!
                        <br/><br/>
                        We'll email you at {sessionStorage.getItem('email')} with your purchase progress
                    </p>
                    <button onClick={() => {this.setState({emailPopup: <EmailPopup/>})}} type="button">
                        <h3 style={{maxWidth: '50%', margin: 'auto', color: 'red'}}>
                            If the above address is not your email, then click here to do something about that ASAP. 
                        </h3>
                    </button>

                    <div id="emailPopupWrapper" className="popupWrapper">
                        {this.state.emailPopup}
                    </div>
                </React.Fragment>
            );
        };
    };
};

export default PaymentSucsessful;