import React, {Component} from 'react';
import ReactDOMServer from 'react-dom/server';
import './loginStyles.scss';

//firebase modules for accounts
import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword} from 'firebase/auth';


//will fire after a user proceedes past either the log in or sign up form
function userSucessfullyLoggedIn() {

    //frontend
    document.getElementById('loginPopupWrapper').classList.remove('shown');
};


class LoginPopup extends Component {

    state = {
        randomVar: 0,
    };

    componentDidMount() {
        setTimeout(() => {
            document.getElementById('loginPopupWrapper').classList.add('shown');
            console.log('rendering');
        }, 500);
    };

    render() {

        return (
            <React.Fragment>
                <div id="loginPopupWrapper">
                    <h2>
                        To do that, you'll need an account!
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
                    </div>
                </div>

            </React.Fragment>
        );
    };

    showLogInOrSignUp(logInBool) {
        const panelContent = document.getElementById('loginPanelContent');
        panelContent.style.opacity = 0.0;


        //define function to fire when the user submits their login details
        function loginFormSubmitted(event) {
            event.preventDefault();

            //get the inputted data from the form
            const form = event.currentTarget;
            const credentials = {email: form.email.value, password: form.password.value}

            //attempt to log in with the provided credentials
            const auth = getAuth();
            signInWithEmailAndPassword(auth, credentials.email, credentials.password)
                .then((userCreds) => {
                    const user = userCreds.user;
                })

                .catch((error) => {

                    //if the user entered the incorrect login details
                    console.log(error.message)
                    const errorText = document.createElement('p');
                    errorText.innerText = 'Looks like your email or password is incorrect, have another go';
                    errorText.style.color = 'red';
                    document.getElementById('logInHeader').appendChild(errorText);
                });

            userSucessfullyLoggedIn();
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
                createUserWithEmailAndPassword(auth, creds.email, creds.password);
            }

            catch(error) {
                const errorText = document.createElement('p');
                if (error == 'passwordsNotEqual') {
                    errorText.innerText = 'The passwords you entered were not the same. Try again.';
                }
                else {
                    errorText.innerText = 'We encountered an errors, please try again.';
                }
                document.getElementById('signInHeader').appendChild(errorText);
            };

            userSucessfullyLoggedIn();
        };

        //delay to allow the login panel content to fade out before its html is replaced
        setTimeout(() => {
            let panelContentHTML;

            if (logInBool) {
    
                //show the log in content
                panelContentHTML = (
                    <React.Fragment>
                        <h2 id="logInHeader">
                            Log in
                        </h2>
    
                        {/*Email and password input*/}
                        <form id="logInForm">
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
                    </React.Fragment>
                );
            }
            else {
    
                //show the sign up content
                panelContentHTML = (
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
                    </React.Fragment>
                );
            };

            panelContent.innerHTML = ReactDOMServer.renderToStaticMarkup(panelContentHTML);

            //create event listeners for either the log in form submit button on the sign up for submit button
            document.getElementById('logInForm')?.addEventListener('submit', loginFormSubmitted);
            document.getElementById('signUpForm')?.addEventListener('submit', signUpFormSubmitted);

            //update state to cause the component to refresh (and thus show changes)
            this.setState = ({randomvar: Math.random()});

            panelContent.style.opacity = 1.0;
        }, 500);
    };
};

export default LoginPopup;