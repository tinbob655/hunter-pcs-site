import React, {Component} from 'react';
import SlidingButton from '../../slidingButton.jsx';

//TASK: GET CURRENCY CONVERSIONS WORKING

class PcsMain extends Component {

    render() {
        return (
            <React.Fragment>
                <div>
                    <h1 className="alignRight">
                        Hand crafted gaming pcs, ready to go
                    </h1>
                    <table>
                        <thead>
                            <tr>
                                <td>
                                    <img src='https://firebasestorage.googleapis.com/v0/b/hunter-pcs-firebase.appspot.com/o/images%2FgamingSetupWIDE1.jpeg?alt=media&token=aa72a5f1-7adb-42cd-98d2-a0e8795822da' 
                                    className="mainImage"/>
                                </td>
                                <td>
                                    <h2 className="alignRight">
                                        Design your dream setup
                                    </h2>
                                    <p className="alignLeft">
                                        We sell pcs ranging from the highest performing to the most budget effective. Whatever your needs, satisfy them here
                                    </p>
                                </td>
                            </tr>
                        </thead>
                    </table>
                </div>
                <div className="purpleGrey">
                    <h1>
                        For high quality pcs, you're in the right place
                    </h1>
                    <table>
                        <thead>
                            <tr>
                                
                                {/*BUDGET PC BUTTON*/}
                                <td>
                                    <SlidingButton 
                                    id="solidPcsButton"
                                    imgSrc=""
                                    linkLocation=""
                                    textContent="Solid £000" />
                                </td>

                                {/*LOW MID RANGE PC BUTTON*/}
                                <td>
                                    <SlidingButton 
                                    id="strongPcsButton"
                                    imgSrc=""
                                    linkLocation=""
                                    textContent="Strong £000" />
                                </td>

                                {/*UPPER MID RANGE PC BUTTON*/}
                                <td>
                                    <SlidingButton 
                                    id="powerfulPcsButton"
                                    imgSrc=""
                                    linkLocation=""
                                    textContent="Powerful £000" />
                                </td>

                                {/*ALL OUT PC BUTTON*/}
                                <td>
                                    <SlidingButton 
                                    id="dominantPcsButton"
                                    imgSrc=""
                                    linkLocation=""
                                    textContent="Dominant £000" />
                                </td>
                            </tr>
                        </thead>
                    </table>
                </div>
            </React.Fragment>
        );
    };
};

export default PcsMain;