import React, {Component} from 'react';
import { isMobile, sendToDiscord } from '../../../index.js';
import EmailPopup from '../../multiPageComponents/popups/email/emailPopup.jsx';
import TrustpilotWidget from '../../multiPageComponents/trustpilotWidget/trustpilotWidget.jsx';
import GenericMarkupSection from '../../multiPageComponents/genericMarkupSection.jsx';
import Image from '../../multiPageComponents/image.jsx';
import {collection, addDoc, getFirestore} from 'firebase/firestore';
import ChangeCasePopup from './changeCasePopup.jsx';

class PaymentSuccessful extends Component {

    constructor(props) {
        super(props);

        this.state = {
            emailPopup: <></>,
            codePopup: <></>,
            changeCasePopup: <></>,
            orderId: sessionStorage.getItem('orderId'),
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

            //notify discord
            sendToDiscord(`New purchase with the following information\n
            Product: ${purchasedProducts}\n
            Delivery address: ${addressVar}\n
            Email: ${emailVar}\n
            Order Id: ${orderId}`);
        };
    };

    render() {

        //desktop payment successful page
        if (!isMobile()) {
            return (
                <React.Fragment>
                    <h1 className="alignRight">
                        Payment successful
                    </h1>
    
                    {/*payment successful div*/}
                    <div>
                        <table>
                            <tr>
                                <td>
                                    <h2 className="alignLeft">
                                        Congratulations!
                                    </h2>
                                    <p className='alignRight'>
                                        Your payment was successful! We'll get to work building your dream PC to get you in the game as soon as possible! 
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

                    {/*friend discount section*/}
                    <div className="intoPurple">
                        <GenericMarkupSection
                        headingText="Friend Discount"
                        subheadingText="Get you and your friend 10% off"
                        paragraphText="Click on the button below to share a code with your buddy. When they purchase their PC, you will recieve 10% back on this purchase, and they will recieve 10% off their purchase. Sounds like a win-win to us."
                        linkContent="Click here to get your code ⟶"
                        linkLogic={() => {this.codeButtonClicked()}}
                        DontShowDividerLineBool={true}
                        leftBool={true}
                        imgSrc='images/2 skulls.png' />
                    </div>

                    {/*change your case section*/}
                    <div className="outofPurple">
                        <GenericMarkupSection
                        headingText="Change the case"
                        subheadingText="We'll build with any case you want"
                        paragraphText="Here, we understand that for many, the way a PC looks is just as important as how it performs. All our PCs are guaranteed to perform well, and you can customise how yours looks with any case you can dream off."
                        linkContent="Choose the case of your dreams ⟶"
                        linkLogic={() => {this.setState({changeCasePopup: <ChangeCasePopup/>})}}
                        imgSrc='images/image of pc 2.jpeg'
                        leftBool={true} />
                    </div>

                    <div style={{marginTop: '75px'}}>
                        <TrustpilotWidget/>
                    </div>

                    <div id="emailPopupWrapper" className="popupWrapper">
                        {this.state.emailPopup}
                    </div>

                    <div id="codePopupWrapper" className="popupWrapper">
                        {this.state.codePopup}
                    </div>

                    <div id="changeCasePopupWrapper" className="popupWrapper">
                        {this.state.changeCasePopup}
                    </div>
                </React.Fragment>
            );
        }

        //mobile payment successful page
        else {
            return (
                <React.Fragment>
                    <h1>
                        Payment successful
                    </h1>
                    <table>
                        <thead>
                            <tr>
                                <td>
                                    <Image imagePath="images/gamingSetupWIDE2.jpeg" imageClasses="mainImage centered" />
                                </td>
                                <td style={{width: '50%'}}>
                                    <h2 className="alignLeft">
                                        Congratulations!
                                    </h2>
                                </td>
                            </tr>
                        </thead>
                    </table>
                    <p>
                        Your payment was successful! We'll get to work building your dream PC to get you in the game as soon as possible!
                        <br/><br/>
                        We'll email you at {sessionStorage.getItem('email')} with your purchase progress
                    </p>
                    <button onClick={() => {this.setState({emailPopup: <EmailPopup/>})}} type="button">
                        <h3 style={{maxWidth: '50%', margin: 'auto', color: 'red'}}>
                            If the above address is not your email, then tap here to do something about that ASAP. ⟶
                        </h3>
                    </button>

                    <div className="dividerLine"></div>

                    {/*friend discount section*/}
                    <div>
                        <GenericMarkupSection
                        headingText="Friend Discount"
                        subheadingText="Get you and your friend 10% off"
                        paragraphText="Tap on the button below to share a code with your buddy. When they purchase their PC, you will recieve 10% back on this purchase, and they will recieve 10% off their purchase. Sounds like a win-win to us."
                        linkContent="Tap here to get your code ⟶"
                        linkLogic={() => {this.codeButtonClicked()}}
                        DontShowDividerLineBool={false}
                        leftBool={false}
                        imgSrc='images/2 skulls.png' />
                    </div>

                    {/*change your case section*/}
                    <div>
                        <GenericMarkupSection
                        headingText="Change the case"
                        subheadingText="We'll build with any case you want"
                        paragraphText="Here, we understand that for many, the way a PC looks is just as important as how it performs. All our PCs are guaranteed to perform well, and you can customise how yours looks with any case you can dream off."
                        linkContent="Choose the case of your dreams ⟶"
                        linkLogic={() => {this.setState({changeCasePopup: <ChangeCasePopup/>})}}
                        imgSrc='images/image of pc 2.jpeg'
                        leftBool={true}
                        DontShowDividerLineBool={true} />
                    </div>

                    <div id="emailPopupWrapper" className="popupWrapper">
                        {this.state.emailPopup}
                    </div>

                    <div id="codePopupWrapper" className="popupWrapper">
                        {this.state.codePopup}
                    </div>

                    <div id="changeCasePopupWrapper" className="popupWrapper">
                        {this.state.changeCasePopup}
                    </div>
                </React.Fragment>
            );
        };
    };

    codeButtonClicked() {

        function giveRandom(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        };

        function getCode() {

            let code = '';
            const allCharacters=['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
            let thisCode = [];

            //repeat to get 5 blocks of 4 characters separated by '-'
            for (let block = 0; block < 5; block++) {
                for (let char = 0; char < 4; char++) {

                    thisCode.push(allCharacters[giveRandom(0, allCharacters.length)]);
    
                    //make ~ every other letter upper case
                    if (allCharacters.includes(thisCode[thisCode.length - 1]) && giveRandom(0, 2) % 2 === 0) {
                        thisCode[thisCode.length - 1] = thisCode[thisCode.length - 1].toUpperCase();
                    };
                };

                //separate each block with '-'
                thisCode.push('-');
            };

            //remove the '-' added at the end
            thisCode.pop();

            code = thisCode.toString().replaceAll(',', '')

            return code;
        };

        //get a random code in format XXXX-XXXX-XXXX-XXXX-XXXX
        const code = getCode();

        //make sure an order id exists
        if (!this.state.orderId) {
            throw('Could not find an order id');
        }
        else {

            //save the code and the user's email to firestore
            const db = getFirestore();
            addDoc(collection(db, 'discountCodes'), {
                code: code,
                orderId: this.state.orderId,
                percentageReduction: 10,
            });

            //show a popup with the user's code on the frontend
            this.setState({codePopup: <React.Fragment>
                <h1>
                    We've got your code
                </h1>

                <div className="dividerLine"></div>

                <h2>
                    Your code is:
                </h2>
                <p className="legalText glow" style={isMobile() ? {textShadow: '0 0 0 0 #fffff'} : {fontSize: '25px'}}>
                    {code}
                </p>

                <button type="button" onClick={() => {navigator.clipboard.writeText(code)}} style={{padding: 0}}>
                    <h3>
                        Copy code to clipboard ⟶
                    </h3>
                </button>
                <p style={{maxWidth: '75%'}}>
                    When your friend makes their purchase using this code, both you and your friend can get 10% off your purchases!
                </p>

            </React.Fragment>});

            //show the popup
            setTimeout(() => {
                document.getElementById('codePopupWrapper').classList.add('shown');
            }, 100);
        };
    };
};

export default PaymentSuccessful;