import React, {Component} from 'react';
import {isMobile} from '../../../index.js';
import LoginPopup from '../../multiPageComponents/popups/login/loginPopup.jsx';
import './logInStyles.scss';
import {getAuth, signOut} from 'firebase/auth';
import Image from '../../multiPageComponents/image.jsx';

class LogIn extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loginPopup: <></>,
        };
    };

    componentDidMount() {

        //only show the page content if the user is logged in, if not, fade the page content and show a popup
        if (sessionStorage.getItem('loggedIn') == 'true') {

            //show the fade the page content

            const elements = ['footer', 'logInPage', 'logInPageLogInPopupWrapper'];
            elements.forEach((element) => {
                document.getElementById(element).style.opacity = 0.25;
            });

            //show the popup
            document.getElementById('alreadyLoggedInMessage').classList.add('shown');
        };
    };

    render() {

        //desktop log in page
        if (!isMobile()) {
            return (
                <React.Fragment>
                    <div id="logInPage">
                        <h1 className="alignRight">
                            Make your Hunter PCs account
                        </h1>
                        <table>
                            <thead>
                                <tr>
                                    <td>
                                        <Image imagePath="images/gamingSetup1.jpeg" imageClasses="mainImage centered" />
                                    </td>
                                    <td>
                                        <h2 className="alignRight">
                                            Get the best out of Hunter PCs
                                        </h2>
                                        <p>
                                            Making an account, or logging back into your existing account allows you to save products to your basket and make purchases right here
                                        </p>
                                        <button onClick={() => {this.logInButtonClicked()}} type="button">
                                            <h3>
                                                Log In or Sign Up ⟶
                                            </h3>
                                        </button>
                                    </td>
                                </tr>
                            </thead>
                        </table>
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
                            <h3 style={{padding: 0, margin: 0}}>
                                Log out
                            </h3>
                        </button>
                    </div>
                </React.Fragment>
            );
        }

        //mobile log in page
        else {
            return (
                <React.Fragment>
                    <div id="logInPage">
                        <h1>
                            Make your Hunter PCs account
                        </h1>
                        <table>
                            <thead>
                                <tr>
                                    <td style={{width: '60%'}}>
                                        <Image imagePath="images/gamingSetup1.jpeg" imageClasses="mainImage centered" />
                                    </td>
                                    <td>
                                        <h2 className="alignLeft">
                                            Get the best out of Hunter PCs
                                        </h2>
                                    </td>
                                </tr>
                            </thead>
                        </table>
                        <p>
                            Making an account, or logging back into your existing account allows you to save products to your basket and make purchases right here
                        </p>
                        <button onClick={() => {this.logInButtonClicked()}} type="button">
                            <h3>
                                Log In or Sign Up ⟶
                            </h3>
                        </button>
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
                            <h3>
                                Log out
                            </h3>
                        </button>
                    </div>
                </React.Fragment>
            );
        };
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