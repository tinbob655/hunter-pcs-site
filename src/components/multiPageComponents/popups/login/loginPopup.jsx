import React, {Component} from 'react';
import './loginStyles.scss';
import {isMobile} from '../../../../index.js';

//firebase modules for accounts
import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';


//will fire after a user proceedes past either the log in or sign up form
function userSucessfullyLoggedIn() {

    //animate the login popup away then remove it from the DOM
    try {

        document.getElementById('innerLoginPopupWrapper').classList.remove('shown');
        setTimeout(() => {
            document.getElementById('innerLoginPopupWrapper').remove();

            //refresh the window to update the header image
            window.location.reload();
        }, 751);
    }
    catch(error) {
        return;
    };
};

class LoginPopup extends Component {
    
    state = {
        panelContent: <></>
    };

    async componentDidMount() {
        setTimeout(() => {
            document.getElementById('innerLoginPopupWrapper').classList.add('shown');
        }, 100);
    };

    shouldComponentUpdate() {
        //only load this popup if the user is not already logged in
        return sessionStorage.getItem('loggedIn') == 'true' ? false : true
    };

    render() {
        return (
            <React.Fragment>
                <div id="innerLoginPopupWrapper" className="popupWrapper">
                    <h2 id="popupHeader">
                        You're going to need an account!
                    </h2>
                    <table style={{borderBottom: '7px solid #555555'}}>
                        <thead>
                            <tr>
                                <td style={{borderRight: '5px solid #555555'}}>

                                    {/*log in button */}
                                    <button className="loginPanelSelector" type="button" id="logInPanelSelectorButton" onClick={() => {this.showLogInOrSignUp(true)}}>
                                        <h3 style={{padding: 0}}>
                                            Log in
                                        </h3>
                                    </button>
                                </td>
                                <td>

                                    {/*sign up button */}
                                    <button className="loginPanelSelector" type="button" id="signUpPanelSelectorButton" onClick={() => {this.showLogInOrSignUp(false)}}>
                                        <h3 style={{padding: 0}}>
                                            Sign up
                                        </h3>
                                    </button>
                                </td>
                            </tr>
                        </thead>
                    </table>

                    <div id="loginPanelContent">
                        {/*content will be generated here when the user loads either log in or sign up*/}
                        {this.state.panelContent}
                    </div>
                </div>

            </React.Fragment>
        );
    };

    showLogInOrSignUp(logInBool) {
        //only ask the user to log in if they have not already logged in
        if (sessionStorage.getItem('loggedIn') == 'false') {

            const panelContent = document.getElementById('loginPanelContent');
            panelContent.style.opacity = 0.0;
    
    
            //define function to fire when the user submits their login details
            function loginFormSubmitted(event) {
                event.preventDefault()
    
                //get the inputted data from the form
                const form = event.currentTarget;
                const credentials = {email: form.email.value, password: form.password.value}
    
                //attempt to log in with the provided credentials
                const auth = getAuth();
                
                try {
    
                    signInWithEmailAndPassword(auth, credentials.email, credentials.password)
                        .then((userCreds) => {
                            const user = userCreds.user;
        
                            //store credentials to the user's local storage
                            const creds = {
                                email: credentials.email,
                                password: credentials.password,
                            };
                            localStorage.setItem('hunterPCsAccountCredentials', JSON.stringify(creds));

                            sessionStorage.setItem('loggedIn', 'true');
                            userSucessfullyLoggedIn();
                        })
        
                        .catch((error) => {
        
                            //if the user entered the incorrect login details
                            console.log(error.message)
                            const errorText = document.createElement('p');
                            errorText.innerText = 'Looks like your email or password is incorrect, have another go';
                            errorText.style.color = 'red';
                            document.getElementById('logInHeader').appendChild(errorText);
                        });
                }
                catch(error) {
                    console.log(error);
                };
            };
    
            //define function to fire when a new user is signing up
            function signUpFormSubmitted(event) {
                event.preventDefault();
    
                const form = event.currentTarget;
    
                //make sure that the 2 passwords the user entered were the same
                try {
                    if (form.password0.value ===! form.password1.value) {
                        throw('passwordsNotEqual');
                    }
                    const creds = {email: form.email.value, password: form.password0.value}
                    const auth = getAuth();
                    createUserWithEmailAndPassword(auth, creds.email, creds.password)
                        .then((userCredential) => {
                            const user = userCredential.user;
    
                            //save the user's email and password to their browser's storage
                            localStorage.setItem('hunterPCsAccountCredentials', JSON.stringify(creds));
                            sessionStorage.setItem('loggedIn', 'true');
    
                            userSucessfullyLoggedIn();
                        });
                }
    
                catch(error) {
                    const errorText = document.createElement('p');
                    if (error == 'passwordsNotEqual') {
                        errorText.innerText = 'The passwords you entered were not the same. Try again.';
                    }
                    else {
                        errorText.innerText = 'We encountered an error, please try again.';
                    }
                    document.getElementById('signInHeader').appendChild(errorText);
                };
            };
    
            //function for a user attempting to log in with google
            function logInWithGoogle() {
                const auth = getAuth();
                auth.useDeviceLanguage();
    
                const provider = new GoogleAuthProvider;
    
    
                signInWithPopup(auth, provider)
                    .then((res) => {
    
                        //store user data
                        const userCredential = GoogleAuthProvider.credentialFromResult(res);

                        sessionStorage.setItem('loggedIn', 'true');
    
                        userSucessfullyLoggedIn();
                    })
                    .catch((error) => {
                        console.log(error);
                        let text = error == 'passwordsNotEqual' ? 'Incorrect password, please try again.' : 'We encountered an error, please try again.';
                        const errorText = document.createElement('p');
                        errorText.innerText = text;
                    });
            };
    
            //delay to allow the login panel content to fade out before its html is replaced
            setTimeout(() => {
                let panelContentHTML = [];
    
                if (logInBool) {
        
                    //desktop login in form
                    if (!isMobile()) {
                        panelContentHTML.push(
                            <React.Fragment>
                                <h2 id="logInHeader">
                                    Log in
                                </h2>
            
                                {/*Email and password input*/}
                                <form id="loginForm">
                                    <table>
                                        <thead>
                                            <tr>
                                                <td>
                                                    <p>
                                                        Email:
                                                    </p>
                                                    <label htmlFor="email">Email</label>
                                                    <input type="text" id="email" name="email" placeholder='Enter your Email...'></input>
                                                </td>
                                                <td>
                                                    <p>
                                                        Password:
                                                    </p>
                                                    <label htmlFor="password">Password</label>
                                                    <input type="password" id="password" name="password" placeholder='Enter your password...'></input>
                                                </td>
                                            </tr>
                                        </thead>
                                    </table>
                                        <input type="submit" value="Submit" className="submit"></input>
                                </form>
        
                                <div className="cleanLinkButtonDivider" style={{maxWidth: '85%', marginTop: '5vh'}}></div>
        
                                <button type="button" onClick={function() {logInWithGoogle()}}>
                                    <h3 style={{marginBottom: 0, paddingBottom: 0}} >
                                        Or log in with:
                                        <img src='https://firebasestorage.googleapis.com/v0/b/hunter-pcs-firebase.appspot.com/o/images%2FinteractiveElements%2Fgoogle%20logo.png?alt=media&token=e18829e4-9cba-4141-bb2e-385eb563e8f5'
                                        style={{height: 'auto', width: '60px'}} className="centered"/>
                                    </h3>
                                </button>
                            </React.Fragment>
                        );
                    }

                    //mobile login form
                    else {
                        panelContentHTML.push (
                            <React.Fragment>
                                <h1 id="logInHeader">
                                    Log in
                                </h1>

                                {/*email and password input*/}
                                <form id="loginForm">
                                    <p>
                                        Email:
                                    </p>
                                    <label htmlFor="email">Email</label>
                                    <input type="text" id="email" name="email" placeholder='Enter your Email...'></input>

                                    <div className="dividerLine"></div>

                                    <p>
                                        Password:
                                    </p>
                                    <label htmlFor="password">Password</label>
                                    <input type="password" id="password" name="password" placeholder='Enter your password...'></input>

                                    <input type="submit" value="Submit" className="submit"></input>

                                    <div className="dividerLine"></div>

                                    <button type="button" onClick={function() {logInWithGoogle()}}>
                                        <h3>
                                            Or log in with:
                                            <img src='https://firebasestorage.googleapis.com/v0/b/hunter-pcs-firebase.appspot.com/o/images%2FinteractiveElements%2Fgoogle%20logo.png?alt=media&token=e18829e4-9cba-4141-bb2e-385eb563e8f5'
                                        style={{height: 'auto', width: '40px'}} className="centered"/>
                                        </h3>
                                    </button>
                                </form>
                            </React.Fragment>
                        )
                    }
                }
                else {
        
                    //desktop sign in form
                    if (!isMobile()) {
                        panelContentHTML.push(
                            <React.Fragment>
                                <h2>
                                    Sign up
                                </h2>
                                <p>
                                    Creating an account with us is easy, just enter your email address and create a password
                                </p>
                                <form id="signUpForm">
                                    <table>
                                        <tr>
                                            <td>
                                                <p>
                                                    Email:
                                                </p>
                                                <label htmlFor="email">Email</label>
                                                <input id="email" type="text" name="email" placeholder='Enter your email...'></input>
                                            </td>
        
                                            <td>
                                                <p>
                                                    Password:
                                                </p>
                                                <label htmlFor="password0">Password</label>
                                                <input id="password0" type="password" name="password0" placeholder='Enter your password...'></input>
                                                <p>
                                                    Confirm password:
                                                </p>
                                                <label htmlFor="password1">Confirm password</label>
                                                <input id="password1" type="password" name="password1" placeholder='Confirm your password...'></input>
                                            </td>
                                        </tr>
                                    </table>
                                    <input id="submit" type="submit" className="submit" name="submit"></input>
                                </form>
        
                                <div className="cleanLinkButtonDivider" style={{maxWidth: '85%', marginTop: '5vh'}}></div>
        
                                <button type="button" onClick={function() {logInWithGoogle()}}>
                                    <h3>
                                        Or log in with:
                                        <img src='https://firebasestorage.googleapis.com/v0/b/hunter-pcs-firebase.appspot.com/o/images%2FinteractiveElements%2Fgoogle%20logo.png?alt=media&token=e18829e4-9cba-4141-bb2e-385eb563e8f5'
                                        style={{height: 'auto', width: '60px'}} className="centered"/>
                                    </h3>
                                </button>
                            </React.Fragment>
                        );
                    }

                    //mobile sign in form
                    else {
                        panelContentHTML.push (
                            <React.Fragment>
                                <h1>
                                    Sign up
                                </h1>
                                <p>
                                    Creating your HunterPcs account is easy, just enter your email address and create a password
                                </p>

                                <form id="signUpForm">
                                    <p>
                                        Email:
                                    </p>
                                    <label htmlFor="email">Email</label>
                                    <input id="email" type="text" name="email" placeholder='Enter your email...'></input>

                                    <div className="dividerLine"></div>

                                    <table>
                                        <thead>
                                            <tr>
                                                <td>
                                                    <p>
                                                        Password:
                                                    </p>
                                                    <label htmlFor="password0">Password</label>
                                                    <input id="password0" type="password" name="password0" placeholder='Enter your password...'></input>
                                                </td>
                                                <td>
                                                    <p>
                                                        Confirmation:
                                                    </p>
                                                    <label htmlFor="password1">Confirm password</label>
                                                    <input id="password1" type="password" name="password1" placeholder='Confirm your password...'></input>
                                                </td>
                                            </tr>
                                        </thead>
                                    </table>

                                    <input id="submit" type="submit" className="submit" name="submit"></input>
                                </form>

                                <div className="dividerLine"></div>

                                <button type="button" onClick={function() {logInWithGoogle()}}>
                                    <h3>
                                        Or log in with:
                                        <img src='https://firebasestorage.googleapis.com/v0/b/hunter-pcs-firebase.appspot.com/o/images%2FinteractiveElements%2Fgoogle%20logo.png?alt=media&token=e18829e4-9cba-4141-bb2e-385eb563e8f5'
                                        style={{height: 'auto', width: '40px'}} className="centered"/>
                                    </h3>
                                </button>
                            </React.Fragment>
                        )
                    }
                };
    
                //load the generated HTML into DOM
                this.setState({panelContent: panelContentHTML});
    
                //add event listeners to the forms
                setTimeout(() => {
                    if (document.querySelectorAll('#loginForm').length != 0) {
                        document.getElementById('loginForm').addEventListener("submit", loginFormSubmitted);
                    }
                    else {
                        document.getElementById('signUpForm').addEventListener("submit", signUpFormSubmitted);
                    };
                }, 100);
    
                //fade in the pannel content
                panelContent.style.opacity = 1.0;
            }, 500);
        }
    };
};

export default LoginPopup;