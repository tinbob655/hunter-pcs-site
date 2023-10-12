import React, {Component} from 'react';
import { changePage } from '../../../index.js';
import { buttonExpand } from '../../../index.js';

class Home extends Component {

    render() {
        return (
            <React.Fragment>
                {/*PAGE HEADER*/}
                <div>
                    <h1 style={{marginLeft: '50%', textAlign: 'unset'}}>
                        Pcs made to measure
                    </h1>

                    <table>
                        <thead>
                            <tr>
                                <td>
                                    <img src="https://firebasestorage.googleapis.com/v0/b/hunter-pcs-firebase.appspot.com/o/images%2Falt%20Logo.jpg?alt=media&token=83dd8d5d-16ec-4f74-bb00-0fb407d8e659"
                                    style={{width: '50vw', height: '50vw', marginLeft: '7.5%', marginRight: 'unset', boxShadow: '0 0 50px 5px #222222', borderRadius: '10px'}}/>
                                </td>
                                <td>
                                    <h2 style={{marginRight: '1%', textAlign: 'right'}}>
                                        Packing a serious punch
                                    </h2>
                                    <p style={{textAlign: 'right', marginRight: '15%'}}>
                                        -AAA gaming
                                    </p>
                                    <p style={{textAlign: 'right', marginRight: '20%'}}>
                                        -Ultra low latency
                                    </p>
                                    <p style={{textAlign: 'right', marginRight: '25%'}}>
                                        -Office and work
                                    </p>
                                    <p style={{textAlign: 'right', marginRight: '30%'}}>
                                        Streaming video
                                    </p>
                                    <p style={{textAlign: 'right', marginRight: '40%'}}>
                                        -Just chilling
                                    </p>
                                </td>
                            </tr>
                        </thead>
                    </table>
                </div>

                {/*GAMING, PREBULIT, CUSTOM BUTTONS*/}
                <div className="purpleGrey">
                    <table style={{width: '100%'}}>
                        <thead>
                            <tr>
                                
                                {/*GAMING PCS BUTTON*/}
                                <td style={{width: '33.3%'}}>
                                    <button id="gamingPcsbutton" onClick={function() {changePage('pcsMain')}} type="button" className="linkButton"
                                    onMouseOver={function() {buttonExpand('gamingPcs')}}>
                                        <h2 id="gamingPcstitle" className="linkButtonTitle">
                                            Gaming
                                        </h2>
                                        <div className="linkButtonDivider" id="gamingPcsdivider"></div>
                                        <img src={'https://firebasestorage.googleapis.com/v0/b/hunter-pcs-firebase.appspot.com/o/images%2Fimage%20of%20pc.jpeg?alt=media&token=057583b8-036a-4ffd-9657-58e010d7e8e8'}
                                        style={{width: '25%', height: 'auto'}} className="centered"/>
                                    </button>
                                </td>

                                {/*PREBULIT PCS BUTTON*/}
                                <td style={{width: '33.3%'}}>
                                    <button id="pre-builtbutton" onClick={function() {changePage('preBuiltPcs')}} type="button" className="linkButton"
                                        onMouseOver={function() {buttonExpand('pre-built')}}>
                                        <h2 id="pre-builttitle" className="linkButtonTitle">
                                            Prebuilt
                                        </h2>
                                        <div className="linkButtonDivider" id="pre-builtdivider"></div>
                                        <img src="https://firebasestorage.googleapis.com/v0/b/hunter-pcs-firebase.appspot.com/o/images%2Frainbow%20pc.png?alt=media&token=0e548201-b1c6-4ea6-8efb-bea42aea9bdb"
                                        style={{width: '30%', height: 'auto'}} className="centered"/>
                                    </button>
                                </td>

                                {/*CUSTOM PCS BUTTON*/}
                                <td style={{width: '33.3%'}}>
                                    <button id="custombutton" onClick={function() {changePage('customPcs')}} type="button" className="linkButton"
                                    onMouseOver={function() {buttonExpand('custom')}}>
                                        <h2 id="customtitle" className="linkButtonTitle">
                                            Custom
                                        </h2>
                                        <div className="linkButtonDivider" id="customdivider"></div>
                                        <img src={'https://firebasestorage.googleapis.com/v0/b/hunter-pcs-firebase.appspot.com/o/images%2Fstock%20pc%20parts.png?alt=media&token=f920a622-e3cc-4e59-9df1-ee6cf27c9c7b'}
                                        style={{width: '35%', height: 'auto'}} className="centered"/>
                                    </button>
                                </td>

                            </tr>
                        </thead>
                    </table>
                </div>

                {/*PERFECT FOR GAMING SECTION*/}
                <div>
                    <table>
                        <thead>
                            <tr>
                                <td>
                                <h1 style={{textAlign: 'left', marginLeft: '2%'}}>
                                    Perfect for gaming
                                </h1>
                                <p style={{width: '75%', marginLeft: '15%', textAlign: 'right'}}>
                                    Here at Hunter pcs, we know that the best pcs are designed to run games smooth as butter. That's why we've been working hard to deliver you the 
                                    best gaming experience at the lowest price. <br/>We make all our computers with high end components from trusted manufacturers.
                                </p>
                                <button onClick={function() {changePage('gamingPcs')}} type="button">
                                    <h3>
                                        Browse all gaming pcs  ⟶
                                    </h3>
                                </button>
                                </td>

                                <td style={{width: '50%'}}>
                                <img src="https://firebasestorage.googleapis.com/v0/b/hunter-pcs-firebase.appspot.com/o/images%2Frounded%20skull%202.jpeg?alt=media&token=c9e0128f-15ca-4595-bc92-15618109e0de" 
                                    style={{width: '85%', boxShadow: '0 0 50px 5px #070707', borderRadius: '10px'}} />
                                </td>
                            </tr>
                        </thead>
                    </table>
                </div>

                {/*VIDEOS FROM PCS SECION*/}
                <div>
                    <h1>
                        Play your favourite titles
                    </h1>
                    <p>
                    contentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontent
                    </p>
                    <h2>
                        INSET VIDEO OF GAMEPLAY HERE
                    </h2>
                </div>

            </React.Fragment>
        );
    };
};

export default Home;