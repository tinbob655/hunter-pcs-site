import React, {Component} from 'react';
import { isMobile } from '../../../index.js';

class PaymentSucsessful extends Component {

    componentDidMount() {

        //only fire once to prevent multiple purchases if the user presses refresh
        if (sessionStorage.getItem('purchaseValid') === 'true') {
            sessionStorage.removeItem('purchaseValid');
            
            //get the purchase information
            const addressVar = sessionStorage.getItem('address');
            const purchasedProducts = sessionStorage.getItem('purchasedProducts');
            const emailVar = sessionStorage.getItem('email');
    
            //create a discord webhook session
            const request = new XMLHttpRequest();
            request.open("POST", "https://discord.com/api/webhooks/1187071870407807027/RKqIEOQhwxXsrBMmL_SCqpuIlbSZvvmn4YJ-kypWkp4aT6x289XF7GMVbItLz4-Ja9eS");
            
            //define the data being sent to the discord bot
            request.setRequestHeader('Content-Type', 'application/json');
            const messageJSON = {
                content: `New purchase with the following information:\n
                Product: ${purchasedProducts}\n
                Delivery address: ${addressVar}\n
                Email: ${emailVar}`,
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
                                        Your payment was sucsessful! We'll get to work building your dream pc to get you in the game as soon as possible!
                                    </p>
                                </td>
                                <td style={{width: '40%'}}>
                                    <img src='https://firebasestorage.googleapis.com/v0/b/hunter-pcs-firebase.appspot.com/o/images%2FgamingSetupWIDE2.jpeg?alt=media&token=f45440e7-bb17-4e56-9213-6bb178ed49dfhttps://firebasestorage.googleapis.com/v0/b/hunter-pcs-firebase.appspot.com/o/images%2FgamingSetupWIDE2.jpeg?alt=media&token=f45440e7-bb17-4e56-9213-6bb178ed49df'
                                    alt="loading..." className="mainImage centered" />
                                </td>
                            </tr>
                        </table>
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
                                    <img src='https://firebasestorage.googleapis.com/v0/b/hunter-pcs-firebase.appspot.com/o/images%2FgamingSetupWIDE2.jpeg?alt=media&token=f45440e7-bb17-4e56-9213-6bb178ed49dfhttps://firebasestorage.googleapis.com/v0/b/hunter-pcs-firebase.appspot.com/o/images%2FgamingSetupWIDE2.jpeg?alt=media&token=f45440e7-bb17-4e56-9213-6bb178ed49df'
                                    alt="loading..." className="mainImage centered" />
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
                        Your payment was sucsessful! We'll get to work building your dream pc to get you in the game as soon as possible!
                    </p>
                </React.Fragment>
            );
        };
    };
};

export default PaymentSucsessful;