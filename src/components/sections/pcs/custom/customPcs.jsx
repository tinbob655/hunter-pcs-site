import React, {Component} from 'react';
import './customPcsStyles.scss';
import { clickGetStartedButton } from './customPcsScripts.js';

class CustomPcs extends Component {

    render() {
        return (
            <React.Fragment>
                <h1 className="alignRight">
                    Design your custom pc
                </h1>
                
                {/*DESCRIPTION SECTION*/}
                <div>
                    <table>
                        <thead>
                            <tr>
                                <td>
                                    <h2 className="alignLeft">
                                        Build your dreams
                                    </h2>
                                    <p className="alignRight">
                                        Below is the hunter pcs custom pc designer, so you can create your own custom rig with ease. We'll build it and ship it to you as 
                                        usual
                                    </p>
                                    <button type="button" onClick={function() {clickGetStartedButton()}}>
                                        <h3>
                                            Get started!
                                        </h3>
                                    </button>
                                </td>
                                <td>
                                    <img src='https://firebasestorage.googleapis.com/v0/b/hunter-pcs-firebase.appspot.com/o/images%2FgamingSetupWIDE2.jpeg?alt=media&token=f45440e7-bb17-4e56-9213-6bb178ed49df'
                                    className="mainImage centered" style={{width: '85%'}} alt="loading..." />
                                </td>
                            </tr>
                        </thead>
                    </table>
                </div>

                <div id="pcPartsDialogueBox">
                    <h2>
                        All finished?
                    </h2>
                    <a href="mailto:huterpcs@gmail.com?subject=" target="_blank">
                        <p>
                            Perfect. Just click here and then send us a screenshot of your pc from pcpartpicker. We'll start building it for you right away to get you in the game
                            as soon as possible!
                        </p>
                    </a>
                </div>
            </React.Fragment>
        );
    };
};

export default CustomPcs;