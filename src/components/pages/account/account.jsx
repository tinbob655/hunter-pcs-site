import React, {Component} from 'react';
import PageHeader from '../../multiPageComponents/pageHeader.jsx';
import GenericMarkupSection from '../../multiPageComponents/genericMarkupSection.jsx';
import LoginPopup from '../../multiPageComponents/popups/loginPopup.jsx';
import AuthProvider from '../../../context/authContext.jsx';
import {signOut} from 'firebase/auth'
import firebaseInstance from '../../../classes/firebase.js';

class Account extends Component {

    static contextType = AuthProvider;

    constructor(props) {
        super(props);

        this.state = {
            loginPopupShown: false,
        };
    };

    render() {

        //if the user is not logged in
        if (!this.context) {
            return (
                <React.Fragment>
                    <PageHeader heading="Your account" subheading="Join us" />
                    
                    {/*why you need an account section*/}
                    <div>
                        <GenericMarkupSection
                            heading="Make your account"
                            paragraph="Create an account with us and unlock the full potential of Hunter PCs. We do not collect any of your personal information as privacy is one of our core values here."
                            left={true}
                            imagePath="images/gamingSetupWIDE2.jpeg"
                            buttonText="Click here to sign up"
                            buttonAction={() => {
                                this.startLogInSignUp();
                            }} />
                    </div>
    
                    {/*login popup*/}
                    <LoginPopup shown={this.state.loginPopupShown} />
    
                </React.Fragment>
            );
        }
        else {
            return (
                <React.Fragment>
                    <PageHeader heading="Your account" subheading="Welcome back!" />

                    {/*your account section*/}
                    <div>
                        <GenericMarkupSection
                            heading={`Hello, ${this.context.email}`}
                            paragraph="Welcome back to your Hunter PCs account and thanks for being a member. You'll get special perks like discounts after checkout and more payment options. If you want to sign out or log into a different account, please use the below button."
                            left={true}
                            imagePath="images/gamingSetupWIDE2.jpeg"
                            buttonText="Sign out"
                            buttonAction={() => {
                                const auth = firebaseInstance.getFirebaseAuth();
                                signOut(auth).then(() => {
                                    window.location.reload();
                                });
                            }} />
                    </div>
                </React.Fragment>
            );
        };
    };

    startLogInSignUp() {
        
        //method to show the login popup
        this.setState({loginPopupShown: true});
    };
};

export default Account;