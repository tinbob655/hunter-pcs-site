import React, {Component} from 'react';
import './loginPopupStyles.scss';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import firebaseInstance from '../../../classes/firebase.js';
import MobileProvider from '../../../context/mobileContext.jsx';

/**
 * @param {boolean} shown whether the popup is displayed or not
 */

class LoginPopup extends Component {

    static contextType = MobileProvider;

    constructor(props) {
        super(props);

        //boolean to store if the popup is shown or not
        this.state = {
            shown: this.props.shown,
            popupWrapperClass: '',
            panelOption: 'none',
            isMobile: this.context,
            errorMessage: '',
        };
    };

    componentDidMount() {
        this.setState({isMobile: this.context});
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

        //desktop login popup
        if (!this.state.isMobile) {
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

                        <p style={this.state.errorMessage.length > 0 ? {visibility: 'visible', color: 'red'} : {visibility: 'hidden'}} key={this.state.errorMessage} >
                            {this.state.errorMessage}
                        </p>
    
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
                                    Create password:
                                </p>
                                <input type="password" name="password" placeholder="Create password..." required className="popup" />
                                <p className="aboveInput" style={{marginTop: '30px'}}>
                                    Confirm  new password:
                                </p>
                                <input type="password" name="confirmPassword" placeholder="Confirm new password..." required className="popup" />
                                <input type="submit" className="submit" value="Submit" />
                            </form>
                        </div>
                    </div>
                </React.Fragment>
            );
        }

        //mobile login popup
        else {
            return (
                <React.Fragment>
                    <div className={`popupWrapper ${this.state.popupWrapperClass}`} id="loginPopupWrapper" style={this.state.shown ? {} : {opacity: 0}}>
                        <h1>
                            Join us
                        </h1>

                        {/*log in / sign up buttons*/}
                        <table>
                            <thead>
                                <tr>
                                    <td>
                                        <button onClick={() => {this.signUpLogInSelector('logIn')}} type="button" style={{width: '100%'}}>
                                            <h3 style={{fontSize: '20px'}}>
                                                Log in ⟶
                                            </h3>
                                        </button>
                                    </td>
                                    <td>
                                        <button onClick={() => {this.signUpLogInSelector('signUp')}} type="button" style={{width: '100%'}}>
                                            <h3 style={{fontSize: '20px'}}>
                                                Sign up ⟶
                                            </h3>
                                        </button>
                                    </td>
                                </tr>
                            </thead>
                        </table>
                        
                        <p style={this.state.errorMessage.length > 0 ? {visibility: 'visible', color: 'red'} : {visibility: 'hidden'}} key={this.state.errorMessage} >
                            {this.state.errorMessage}
                        </p>

                        <div style={{width: '75%', height: '5px', backgroundColor: 'white', marginLeft: 'auto', marginRight: 'auto'}}></div>

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
        }
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

        try {

            await signInWithEmailAndPassword(auth, email, password);
        }
        catch(err) {
            if (err.code == 'auth/invalid-credential') {
                this.setState({errorMessage: 'Incorrect email or password'});
                throw new Error(err);
            };
        };

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
            this.setState({errorMessage: 'Passwords do not match, please try again'});
            throw new Error('Passwords do not match, please try again');
        };

        //create the user's account
        const userCred = await createUserWithEmailAndPassword(auth, email, password1);
        
        //create a basket for the new user, with no items in to start with
        const firestore = firebaseInstance.getFirebaseFirestore;
        const uid = userCred.user.uid;
        await setDoc(doc(firestore, 'baskets', uid), {
            solidPc: 0,
            strongPc: 0,
            powerfulPc: 0,
            supremePc: 0,
            dominantPc: 0,
            almightyPc: 0,
        });

        //if there were no errors, refresh the page
        window.location.reload();
    };
};

export default LoginPopup;