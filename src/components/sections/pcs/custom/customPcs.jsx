import React, {Component} from 'react';
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
                                            Get started designing your very own rig ⟶
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
                
                {/*button and content for after a pc is purchased*/}
                <div>
                    <h1 className="alignLeft">
                        All finished?
                    </h1>
                    <table>
                        <thead>
                            <tr>
                                <td style={{width: '40%'}}>
                                    <img src='https://firebasestorage.googleapis.com/v0/b/hunter-pcs-firebase.appspot.com/o/images%2Frounded%20skull%203.jpeg?alt=media&token=94698dad-8a82-45fc-a076-171fd9c833af'
                                    alt="loading..." className="mainImage centered" />
                                </td>
                                <td>
                                    <h2 className="alignRight">
                                        Buy now
                                    </h2>
                                    <p className="alignLeft">
                                        We will verify that the pc you have designed works and then build it and ship it to you as usual. A small build fee of 25%
                                         will also be charged.
                                    </p>
                                    <button type="button" onClick={() => {
                                        //custom pc purchase sequence
                                    }}>
                                        <h3>
                                            Get your custom pc delivered straight to you ⟶
                                        </h3>
                                    </button>
                                </td>
                            </tr>
                        </thead>
                    </table>
                </div>
            </React.Fragment>
        );
    };
};

export default CustomPcs;