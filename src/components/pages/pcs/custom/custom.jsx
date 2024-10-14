import React, {Component} from 'react';
import PageHeader from '../../../multiPageComponents/pageHeader.jsx';
import GenericMarkupSection from '../../../multiPageComponents/genericMarkupSection.jsx';
import FancyButton from '../../../multiPageComponents/fancyButton.jsx';
import SmartImage from '../../../multiPageComponents/smartImage.jsx';
import DividerLine from '../../../multiPageComponents/dividerLine.jsx';
import AddressPopup from '../../../multiPageComponents/popups/addressPopup.jsx';
import CustomSpecPopup from './customSpecPopup.jsx';
import AuthProvider from '../../../../context/authContext.jsx';
import LoginPopup from '../../../multiPageComponents/popups/loginPopup.jsx';

class CustomPCs extends Component {

    static contextType = AuthProvider;

    constructor(props) {
        super(props);

        this.state = {
            addressPopupShown: false,
            customSpecPopupShown: false,
            loginPopupShown: false,
            authUID: this.context?.uid || null,
        };
    };

    componentDidMount() {

        //update the uid when loaded
        this.setState({
            authUID: this.context?.uid,
        });
    };

    render() {
        return (
            <React.Fragment>
                <PageHeader heading="Custom PCs" subheading="Build your dreams" />

                {/*get started section*/}
                <div>
                    <GenericMarkupSection
                    heading="Get started"
                    paragraph="The first step of purchasing your custom PC is to design it. You can do that using the link below, which will take you to PC Part Picker. After creating your build, scroll down on this page and click the 'Create your PC' button"
                    left={true}
                    imagePath="images/gamingSetupWIDE2.jpeg"
                    buttonText="Design your custom rig ⟶"
                    buttonAction={() => {
                        window.open('https://pcpartpicker.com/list/', '_blank');
                    }} />
                </div>

                <DividerLine purple={false} />

                {/*buy now section*/}
                <div className="intoPurple">
                    <table>
                        <thead>
                            <tr>
                                <td style={{width: '55%'}}>
                                    <h2 className="alignRight">
                                        All finished?
                                    </h2>
                                    <p className="alignLeft">
                                        If you've finished designing your custom PC, then hit the button below. We'll verify that your PC's parts work together, then we'll build it and ship it as usual.
                                    </p>
                                    <div style={{maxWidth: '700px', marginLeft: 'auto', marginRight: 'auto', marginTop: '50px'}} key={this.state.authUID}>

                                        {this.state.authUID ? (
                                            <React.Fragment>

                                                {/*the user is logged in, show the buy now button*/}
                                                <FancyButton title="Buy now" action={() => {this.buyNowButtonClicked();}} />
                                            </React.Fragment>
                                        ) : (
                                            <React.Fragment>

                                                {/*the user is not logged in, show a log in button*/}
                                                <FancyButton title="Log in" action={() => {this.logInButtonClicked();}} />
                                            </React.Fragment>
                                        )}
                                    </div>
                                </td>
                                <td>
                                    <SmartImage imageClasses="mainImage" imagePath="images/rounded skull 3.jpeg" imageStyles={{marginBottom: '60px'}} />
                                </td>
                            </tr>
                        </thead>
                    </table>

                    {/*popups have to be here because otherwise the footer breaks*/}
                    <AddressPopup shown={this.state.addressPopupShown} closeFunc={() => {this.addressPopupClosed()}} />
                    <CustomSpecPopup shown={this.state.customSpecPopupShown} closeFunc={() => {this.customSpecPopupClosed()}} />
                    <LoginPopup shown={this.state.loginPopupShown} />
                </div>
            </React.Fragment>
        );
    };

    logInButtonClicked() {

        //show the login popup
        this.setState({loginPopupShown: true});
    };

    buyNowButtonClicked() {

        //first, get the delivery address of the user
        this.setState({addressPopupShown: true});
    };

    addressPopupClosed() {

        this.setState({addressPopupShown: false});

        //delivery address had been acquired
        const deliveryAddress = JSON.parse(sessionStorage.getItem('deliveryAddress'));

        //make sure the delivery address actually exists
        if (deliveryAddress) {

            //delivery address exists, open a popup to get the spec of the custom pc (wait for the address popup to close first)
            setTimeout(() => {
                this.setState({customSpecPopupShown: true});
            }, 800);
        }
        else {
            throw new Error("Couldn't find delivery address");
        };
    };

    customSpecPopupClosed() {

        //make sure that custom spec data exists
        if (sessionStorage.getItem('customSpec')) {

            //close the custom spec popup
            this.setState({customSpecPopupShown: false});

            //after the animation, navigate to the customPcPurchaseCompletedPage
            setTimeout(() => {
                window.location.href = window.location.href.replace('customPCs', 'customPCPurchaseCompleted');
            }, 800);
        }
        else {

            //if the custom spec data does not exist, refresh the page
            window.location.reload();
        };
    };
};

export default CustomPCs;