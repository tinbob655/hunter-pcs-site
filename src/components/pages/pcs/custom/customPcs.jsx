import React, {Component} from 'react';
import {isMobile} from '../../../../index.js';
import LoginPopup from '../../../multiPageComponents/popups/login/loginPopup.jsx';
import AddressPopup from '../../../multiPageComponents/popups/address/addressPopup.jsx';
import CustomSpecForm from './customSpecForm.jsx';
import AutoNav from '../../../multiPageComponents/autoNav.jsx';
import Image from '../../../multiPageComponents/image.jsx';
import GenericMarkupSection from '../../../multiPageComponents/genericMarkupSection.jsx';

class CustomPcs extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loginPopup: <></>,
            addressPopup: <></>,
            customSpecPopup: <></>,
            redirector: <></>,
        };
    };

    render() {

        //desktop custom pcs page
        if (!isMobile()) {
            return (
                <React.Fragment>
                    <h1 className="alignRight">
                        Design your custom PC
                    </h1>
                    
                    {/*DESCRIPTION SECTION*/}
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <td>
                                        <h2 className="alignLeft">
                                            Build your dreams
                                        </h2>
                                        <p className="alignRight">
                                            Below is the hunter PCs custom PC designer, so you can create your own custom rig with ease. We'll build it and ship it to you as 
                                            usual
                                        </p>
                                        <button type="button" onClick={function() {alert('Leaving this website!\n\nThis is a link to an external site, proceed at own risk.');
                                                                                    window.open('https://pcpartpicker.com/list/');}}>
                                            <h3>
                                                Get started designing your very own rig ⟶
                                            </h3>
                                        </button>
                                    </td>
                                    <td>
                                        <Image imagePath="images/gamingSetupWIDE2.jpeg" imageClasses="mainImage centered" />
                                    </td>
                                </tr>
                            </thead>
                        </table>
                    </div>
                    
                    {/*button and content for after a pc is purchased*/}
                    <div>
                        <GenericMarkupSection
                        headingText="All finished?"
                        subheadingText="Buy now"
                        paragraphText="We will verify that the PV you have designed works and then build it and ship it to you as usual. A small build fee will be charged"
                        linkLogic={() => {this.purchaseButtonClicked()}}
                        linkContent="Get your custom PC delivered straight to you ⟶"
                        imgSrc="images/rounded skull 3.jpeg"
                        leftBool={true}
                        DontShowDividerLineBool={true} />
                    </div>

                    <div id="customPcsLoginPopupWrapper">
                        {this.state.loginPopup}
                    </div>
                    <div id="customPcsAddressPopupWrapper" className="popupWrapper">
                        {this.state.addressPopup}
                    </div>
                    <div id="customPcsCustomSpecFormWrapper" className="popupWrapper">
                        {this.state.customSpecPopup}
                    </div>
                    <div id="redirector">
                        {this.state.redirector}
                    </div>
                </React.Fragment>
            );
        }

        //mobile custom pcs page
        else {
            return (
                <React.Fragment>

                    {/*DESCRIPTION SECTION*/}
                    <div>
                        <h1>
                            Design your custom PC
                        </h1>
                        <table>
                            <thead>
                                <tr>
                                    <td>
                                        <Image imagePath="images/gamingSetupWIDE2.jpeg" imageClasses="mainImage centered" />
                                    </td>
                                    <td style={{width: '40%'}}>
                                        <h2 className="alignLeft">
                                            Build your dreams
                                        </h2>
                                    </td>
                                </tr>
                            </thead>
                        </table>
                        <p>
                            Below is the hunter PCs custom PC designer, so you can create your own custom rig with ease. We'll build it and ship it to you as 
                            usual
                        </p>
                        <button type="button" onClick={function() {alert('Leaving this website!\n\nThis is a link to an external site, proceed at own risk.');
                                                                    window.open('https://pcpartpicker.com/list/');}}>
                            <h3>
                                Get started designing your very own rig ⟶
                            </h3>
                        </button>
                    </div>

                    <div className="dividerLine"></div>

                    {/*button and content for after a pc is purchased*/}
                    <div>
                        <GenericMarkupSection
                        headingText="All finished?"
                        subheadingText="Buy now"
                        paragraphText="We will verify that the PV you have designed works and then build it and ship it to you as usual. A small build fee will be charged"
                        linkLogic={() => {this.purchaseButtonClicked()}}
                        linkContent="Get your custom PC delivered straight to you ⟶"
                        imgSrc="images/rounded skull 3.jpeg"
                        leftBool={true}
                        DontShowDividerLineBool={true} />
                    </div>

                    <div id="customPcsLoginPopupWrapper">
                        {this.state.loginPopup}
                    </div>
                    <div id="customPcsAddressPopupWrapper" className="popupWrapper">
                        {this.state.addressPopup}
                    </div>
                    <div id="customPcsCustomSpecFormWrapper" className="popupWrapper">
                        {this.state.customSpecPopup}
                    </div>
                </React.Fragment>
            );
        };
    };

    purchaseButtonClicked() {

        const openCustomPcSpecForm = () => {

            //first, animate the closing of the address form
            document.getElementById('customPcsAddressPopupWrapper').classList.remove('shown');

            setTimeout(() => {
                this.setState({customSpecPopup: <CustomSpecForm />});
    
                setTimeout(() => {
                    document.getElementById('customPcsCustomSpecFormWrapper').classList.add('shown');
                    document.getElementById('customSpecForm').addEventListener('submit', customPcSpecFormSubmitted);
                }, 100);
            }, 751);
        };

        const customPcSpecFormSubmitted = (event) => {
            event.preventDefault();
            const currentTarget = event.currentTarget;

            //make sure that all fields were filled in
            const pcParts = ['GPU', 'CPU', 'Memory (RAM)', 'Storage', 'Motherboard', 'Cooler(s)', 'Case', 'Power Supply', 'Operating System'];
            let validInput = true;
            pcParts.forEach((part) => {
                if (!currentTarget[part].value) {
                    validInput = false;
                };
            });

            //if the user did not fill all of the fields in the custom pc spec form
            if (!validInput) {
                document.getElementById('customPcFormFillAllFieldsPopup').style.visibility = 'visible';
                document.getElementById('customPcFormFillAllFieldsPopup').style.height = 'auto';
                document.getElementById('customPcsCustomSpecFormWrapper').scrollTop = 0;
            }

            //otherwise, if the user did fill in all of the form fields
            else if (validInput) {

                //close the popup
                document.getElementById('customPcsCustomSpecFormWrapper').classList.remove('shown');

                //save the custom pc spec to session storage
                let customPcSpec = {};
                pcParts.forEach((part) => {
                    customPcSpec[part] = currentTarget[part].value;
                });
                sessionStorage.setItem('customPcSpec', JSON.stringify(customPcSpec));

                //after all necessary purchase data was collected, navigate the user to the custom pc purchase sucsesful page
                sessionStorage.setItem('purchaseValid', 'true');
                setTimeout(() => {
                    this.setState({redirector: <AutoNav destination='/customPcPurchasesuccessful'/>});
                }, 751);
            };
        };

        function addressPopupSubmitted(event) {
            event.preventDefault();

            const currentTarget = event.currentTarget;

            //make sure there are values in all fields
            if ((!currentTarget.email.value || !currentTarget.addressLine1.value || !currentTarget.addressLine2.value || !currentTarget.townOrCity.value || !currentTarget.postcode.value)) {
                document.getElementById('fillAllFieldsPopup').style.visibility = 'visible';
                document.getElementById('fillAllFieldsPopup').style.height = 'auto';
                document.getElementById('customPcsAddressPopupWrapper').scrollTop = 0;
            }

            //address was successfully recieved, proceed to payment
            else {

                //now save the address and email to session storage
                try {
                    const address = {
                        addressLine1: currentTarget.addressLine1.value,
                        addressLine2: currentTarget.addressLine2.value,
                        townOrCity: currentTarget.townOrCity.value,
                        postcode: currentTarget.postcode.value,
                    };
                    sessionStorage.setItem('address', JSON.stringify(address));
                    sessionStorage.setItem('email', event.currentTarget.email.value);

                    //after saving that, prompt the user to enter the spec of the pc they bought
                    openCustomPcSpecForm();
                }

                catch(error) {
                    console.error('Error saving address info to session storage: '+error);
                };
            };
        };

        //first make sure the user is logged in
        if (sessionStorage.getItem('loggedIn') != 'true') {

            //not logged in, show the login popup
            this.setState({loginPopup: <LoginPopup />});
        }

        //if the user was logged in, then show the address popup
        else {
            this.setState({addressPopup: <AddressPopup />});

            setTimeout(() => {
                document.getElementById('customPcsAddressPopupWrapper').classList.add('shown');
                document.getElementById('addressForm').addEventListener('submit', addressPopupSubmitted);
            }, 100);
        };
    };
};

export default CustomPcs;