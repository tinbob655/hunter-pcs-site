import React, {Component} from 'react';
import './loginPopupStyles.scss';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import firebaseInstance from '../../../classes/firebase.js';

/**
 * @param {boolean} shown whether the popup is displayed or not
 */

class LoginPopup extends Component {

    constructor(props) {
        super(props);

        //boolean to store if the popup is shown or not
        this.state = {
            shown: this.props.shown,
            popupWrapperClass: '',
            panelOption: 'none',
        };
    };

    componentDidUpdate() {

        //if the popup is to be shown or hidden
        if (this.props.shown != this.state.shown && !this.state.forceClose ) {
            this.setState({
                shown: this.props.shown,
                popupWrapperClass: this.props.shown ? 'shown' : ''
            });
        };
    };

    render() {
        return(
            <React.Fragment>
                <div className={`popupWrapper ${this.state.popupWrapperClass}`} id="loginPopupWrapper" style={this.state.shown ? {} : {opacity: 0}} >
                    <h1 style={{marginBottom: 0, marginTop: '5px'}}>
                        Join us
                    </h1>

                    {/*log in or sign up buttons*/}
                    <table>
                        <thead>
                            <tr>
                                <td style={{borderRight: '5px solid #f2e1ee'}}>
                                    <button onClick={() => {this.signUpLogInSelector('logIn')}} type="button" >
                                        <h3>
                                            Log in
                                        </h3>
                                    </button>
                                </td>
                                <td>
                                    <button onClick={() => {this.signUpLogInSelector('signUp')}} type="button" >
                                        <h3>
                                            Sign up
                                        </h3>
                                    </button>
                                </td>
                            </tr>
                        </thead>
                    </table>

                    {/*log in form section*/}
                    <div id="logInFormWrapper" className="shown">
                        <h2>
                            Log in
                        </h2>
                        <form id="logInForm" onSubmit={(event) => {this.logInFormSubmitted(event)}}>
                            <p className="aboveInput">
                                Email:
                            </p>
                            <input type="email" name="email" placeholder="Email..." required className="popup" />
                            <p className="aboveInput" style={{marginTop: '30px'}}>
                                Password:
                            </p>
                            <input type="password" name="password" placeholder="Password..." required className="popup" />
                            <input type="submit" className="submit" value="Submit" />
                        </form>
                    </div>

                    {/*sign up form section*/}
                    <div id="signUpFormWrapper">
                        <h2>
                            Sign up
                        </h2>
                        <form id="signUpForm" onSubmit={(event) => {this.signUpFormSubmitted(event)}}>
                            <p className="aboveInput">
                                Email:
                            </p>
                            <input type="email" name="email" placeholder="Email..." required className="popup" />
                            <p className="aboveInput" style={{marginTop: '30px'}}>
                                Password:
                            </p>
                            <input type="password" name="password" placeholder="Password..." required className="popup" />
                            <p className="aboveInput" style={{marginTop: '30px'}}>
                                Confirm Password:
                            </p>
                            <input type="password" name="confirmPassword" placeholder="Confirm Password..." required className="popup" />
                            <input type="submit" className="submit" value="Submit" />
                        </form>
                    </div>
                </div>
            </React.Fragment>
        );
    };

    signUpLogInSelector(option) {


        //method to move the sign up log in panel to the left or right
        //first make sure the option is different to the current option
        if (option != this.state.panelOption) {
            const logIn = document.getElementById('logInFormWrapper');
            const signUp = document.getElementById('signUpFormWrapper');

            //if the user clicks the login button, toggle the login section's visibility and hide the sign up section
            if (option === 'logIn') {
                logIn.classList.toggle('shown');
                signUp.classList.remove('shown');
            }

            //else if the option is sign up, toggle the sign up section's visibility and hide the log in section
            else if (option === 'signUp') {
                signUp.classList.toggle('shown');
                logIn.classList.remove('shown');
            }

            //if the option is neither, throw an error
            else {
                throw new Error('Invalid login/sign up option');
            };
        };
    };

    async logInFormSubmitted(event) {
        event.preventDefault();
        const auth = firebaseInstance.getFirebaseAuth;

        //email validation is not required here as the <input /> tag is of type="email", so validation is already done
        const email = event.currentTarget.email.value;
        const password = event.currentTarget.password.value;

        await signInWithEmailAndPassword(auth, email, password);

        //if there were no errors, refresh the page
        window.location.reload();
    };

    async signUpFormSubmitted(event) {
        event.preventDefault();
        const auth = firebaseInstance.getFirebaseAuth;

        //email validation is not required here as the <input /> tag is of type="email", so validation is already done
        const email = event.currentTarget.email.value;
        const password1 = event.currentTarget.password.value;
        const password2 = event.currentTarget.confirmPassword.value;

        //make sure the 2 passwords match
        if (password1 != password2) {
            throw new Error('Passwords do not match, please try again');
        };

        //create the user's account
        await createUserWithEmailAndPassword(auth, email, password1);

        //if there were no errors, refresh the page
        window.location.reload();
    };
};

export default LoginPopup;