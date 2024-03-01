import React, {Component} from 'react';
import { sendToDiscord } from '../../../../index.js';

class EmailPopup extends Component {

    componentDidMount() {

        //setup popup scripts
        function showPopup() {
            const rectifyEmailFormSubmitted = (event) => {
                event.preventDefault();

                //make sure a valid email address was entered
                const email = event.currentTarget.email.value;
                if (email == undefined || email.indexOf('@') === -1) {

                    //invalid email address entered
                    document.getElementById('emailNotValidPopup').style = {visibility: 'visible', height: 'auto'};
                    document.getElementById('emailPopupWrapper').scrollTop = 0;
                }
                
                else {

                    //valid email address entered, save it and notify discord
                    const oldEmail = sessionStorage.getItem('email');
                    sessionStorage.setItem('email', email);

                    //send new email to discord
                    sendToDiscord(`The user with old email address: ${oldEmail} has requested for their email to be updated to ${email}.`)

                    //finally, close the popup
                    document.getElementById('emailPopupWrapper').classList.remove('shown');

                    //refresh the page (for email changes to take effect)
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                };
            };

            document.getElementById('emailPopupWrapper').classList.add('shown');
            document.getElementById('rectifyEmailForm').addEventListener('submit', rectifyEmailFormSubmitted);
        };
        
        //show the popup
        try {
            showPopup();
        } catch(error) {
            setTimeout(() => {
                showPopup();
            }, 100);
        };
    };

    render() {
        return (
            <React.Fragment>
                <div id="emailNotValidPopup" style={{visibility: 'hidden', height: 0}}>
                    <h2 style={{color: 'red'}}>
                        Please enter a valid email address
                    </h2>
                </div>

                <h1>
                    Update your email
                </h1>

                <div className="dividerLine"></div>

                <form id="rectifyEmailForm">
                    <p>
                        Enter new email:
                    </p>
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" name="email" style={{maxWidth: '75%'}} placeholder='New email...'></input>

                    <label htmlFor="submit">Submit</label>
                    <input type="submit" id="submit" name="submit" value="Submit" className="submit" style={{fontWeight: 900, paddingBottom: '2vh'}}></input>
                </form>
            </React.Fragment>
        );
    };
};

export default EmailPopup;