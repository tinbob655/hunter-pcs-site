import React, {Component} from 'react';
import LoginPopup from '../../multiPageComponents/popups/login/loginPopup.jsx';
import './logInStyles.scss';
import {getAuth, signOut} from 'firebase/auth';
import GenericMarkupSection from '../../multiPageComponents/genericMarkupSection.jsx';

class LogIn extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loginPopup: <></>,
        };
    };

    componentDidMount() {

        //show a popup if the user is already logged in 
        if (sessionStorage.getItem('loggedIn') == 'true') {
            document.getElementById('alreadyLoggedInMessage').classList.add('shown');
        };
    };

    render() {

        // log in page
        return (
            <React.Fragment>
                <div id="logInPage">
                    <GenericMarkupSection
                    headingText="Make your Hunter PCs account"
                    subheadingText="Get the best out of Hunter PCs"
                    paragraphText="Making an account, or logging back into your existing account allows you to save product to your basket and make purchases right here"
                    linkLogic={() => {this.logInButtonClicked()}}
                    linkContent="Log In or Sign Up ⟶"
                    leftBool={true}
                    imgSrc='images/gamingSetup1.jpeg'
                    DontShowDividerLineBool={true} />
                </div>

                <div id="logInPageLogInPopupWrapper">
                    {this.state.loginPopup}
                </div>

                <div id="alreadyLoggedInMessage">
                    <h2 style={{color: '#7d2323', paddingBottom: 0, marginBottom: 0}}>
                        You are already logged into your Hunter PCs account!
                    </h2>
                    <button type="button" onClick={() => {
                        this.logOut();
                    }}>
                        <h3 style={{padding: 0, margin: 'auto'}}>
                            Log out
                        </h3>
                    </button>
                </div>
            </React.Fragment>
        );
    };

    logInButtonClicked() {

        //make sure the page is not disabled
        if (sessionStorage.getItem('loggedIn') != 'true') {
            //show the login popup
            this.setState({loginPopup: <LoginPopup />});
    
            //fade the rest of the page
            document.getElementById('logInPage').style.opacity = 0.25;
            document.getElementById('footer').style.opacity = 0.25
        };

    };

    logOut() {

        //log the user out of firebase auth
        const auth = getAuth();
        signOut(auth)
        .then(() => {

            //set session storage values for log out
            sessionStorage.removeItem('loggedIn');
            window.location.reload();
        })
        .catch((error) => {

            //either the user wasnt logged in in the first place, or it went wrong somehow
            throw(error);
        });
    }
};

export default LogIn;