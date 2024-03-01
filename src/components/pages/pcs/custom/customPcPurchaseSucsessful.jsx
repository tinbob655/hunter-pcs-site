import React, {Component} from 'react';
import { isMobile, sendToDiscord } from '../../../../index.js';
import EmailPopup from '../../../multiPageComponents/popups/email/emailPopup.jsx';
import Image from '../../../multiPageComponents/image.jsx';

//ss values are: customPcSpec address email

class CustomPcPurchaseSuccessful extends Component {

    constructor(props) {
        super(props);

        this.state = {
            emailPopup: <></>,
        };
    };

    componentDidMount() {

        //will fire when a custom pc purchase was made successfully send the message to discord
        //only go once to prevent firing 2 times if the user refreshes
        if (sessionStorage.getItem('purchaseValid') === 'true') {
            sessionStorage.removeItem('purchaseValid');

            //get the purchase information
            const customPcSpec = sessionStorage.getItem('customPcSpec');
            const address = sessionStorage.getItem('address');
            const email = sessionStorage.getItem('email');

            //notify discord
            sendToDiscord(`New purchase of a CUSTOM PC with the following information:\n
            Custom PC spec: ${JSON.stringify(customPcSpec)}\n
            Delivery address: ${address}\n
            Email: ${email}`);
        };
    };

    render() {

        //desktop custom pc purchase successful page
        if (!isMobile()) {
            return (
                <React.Fragment>
                    <h1 className="alignRight">
                        Congratulations!
                    </h1>
                    <table>
                        <thead>
                            <tr>
                                <td>
                                    <Image imagePath="images/gamingSetupWIDE2.jpeg" imageClasses="mainImage centered" />
                                </td>
                                <td>
                                    <h2 className="alignRight">
                                        Your purchase is being processed
                                    </h2>
                                    <p className="alignLeft">
                                    We've recieved your purchase and are now processing it. We will check that the parts work together and email you
                                    at {sessionStorage.getItem('email')} with the results and our billing information.
                                    </p>
                                    <button type="button" onClick={() => {this.setState({emailPopup: <EmailPopup/>})}}>
                                        <h3 style={{maxWidth: '50%', margin: 'auto', color: 'red'}}>
                                            If the above email is not correct, then click here to do something about that ASAP
                                        </h3>
                                    </button>
                                </td>
                            </tr>
                        </thead>
                    </table>

                    <div id="emailPopupWrapper" className="popupWrapper">
                        {this.state.emailPopup}
                    </div>
                </React.Fragment>
            );
        }

        //mobile custom pc purchase successful page
        else {
            return (
                <React.Fragment>
                    <h1>
                        Congratulations!
                    </h1>
                    <table>
                        <thead>
                            <tr>
                                <td style={{width: '60%'}}>
                                    <Image imagePath="images/gamingSetupWIDE2.jpeg" imageClasses="mainImage centered" />
                                </td>
                                <td>
                                    <h2 className="alignLeft">
                                        Your purchase is being processed
                                    </h2>
                                </td>
                            </tr>
                        </thead>
                    </table>
                    <p>
                    We've recieved your purchase and are now processing it. We will check that the parts work together and email you
                        at {sessionStorage.getItem('email')} with the results and our billing information. 
                    </p>
                    <button type="button" onClick={() => {this.setState({emailPopup: <EmailPopup/>})}}>
                        <h3 style={{maxWidth: '50%', margin: 'auto', color: 'red'}}>
                            If the above email is not correct, then tap here to do something about that ASAP
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

export default CustomPcPurchaseSuccessful;