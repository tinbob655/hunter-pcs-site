import React, {Component} from 'react';
import { sendToDiscord } from '../../../index.js';

class ChangeCasePopup extends Component {

    componentDidMount() {
        document.getElementById('changeCasePopupWrapper').classList.add('shown');
    };

    render() {
        return (
            <React.Fragment> 
                <h2>
                    Change your PC's case
                </h2>
                <p style={{marginTop: 0, paddingTop: 0, maxWidth: '75%', marginLeft: 'auto', marginRight: 'auto'}}>
                    We understand that for some, the looks of a system are just as important as the performance. That's why we fully support any case you could dream of.
                </p>

                <div className="dividerLine"></div>

                <p>
                    Just tell us which case you want:
                </p>
                <form onSubmit={(event) => {this.caseFormSubmitted(event);}}>
                    <input type="text" name="case" placeholder="Enter your dream case here..." id="case" required style={{maxWidth: '85%'}}></input>

                    <input type="submit" name="submit" id="submit" className="submit" style={{marginTop: '2vh', marginBottom: '3vh'}}></input>
                </form>
            </React.Fragment>
        );
    };

    caseFormSubmitted(event) {
        event.preventDefault();

        //frontend
        document.getElementById('changeCasePopupWrapper').classList.remove('shown');


        //send the new case as well as the user's order id and email to discord
        const userCase = event.currentTarget.case.value;
        const email = sessionStorage.getItem('email');
        const orderId = sessionStorage.getItem('orderId');

        sendToDiscord(`The user with email: ${email} and order id: ${orderId} has requested for the case of their pc to be changed to: ${userCase}. Please can @Ice_$hark357 check if this case would work in the build.`);
    };
};

export default ChangeCasePopup;