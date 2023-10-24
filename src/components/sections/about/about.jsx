import React, {Component} from 'react';
import { changePage } from '../../../index.js';

class About extends Component {


    render() {
        return (
            <React.Fragment>
                <h1 className="alignRight">
                    All about us: Hunter Pcs
                </h1>

                {/*CUSTOMISABLE SECTION*/}
                <div>
                    <table>
                        <tr>
                            <td>
                                <img src='https://firebasestorage.googleapis.com/v0/b/hunter-pcs-firebase.appspot.com/o/images%2FgamingSetupWIDE2.jpeg?alt=media&token=f45440e7-bb17-4e56-9213-6bb178ed49df'
                                className="mainImage centered" style={{width: '85%'}} alt="loading..." />
                            </td>
                            <td style={{width: '40%'}}>
                                <h2 className="alignRight">
                                    Fully customisable
                                </h2>
                                <p className="alignLeft">
                                    Each and every pc you find in our prebuilt gaming pcs section can be fully customised to your heart's content.
                                    Just have a look over on our custom pcs page
                                </p>
                                <button type="button" onClick={function() {changePage('customPcs')}}>
                                    <h3>
                                        Customise your own pc
                                    </h3>
                                </button>
                            </td>
                        </tr>
                    </table>
                </div>

                {/*WHY HUNTER PCS SECTION*/}
                <div>
                    <h1 className="alignRight">
                        Why Hunter Pcs?
                    </h1>
                    <table>
                        <thead>
                            <tr>
                                <td>
                                    <h2 className="alignLeft">
                                        Because we're the best
                                    </h2>
                                    <p className="alignRight">
                                        Choose Hunter Pcs because here, we guarantee that all our products are thoroughly tested. Not only that, but each and every
                                        pc we ship to you will come fitted with components exclusivley from brands we can all trust such as corsair, AMD and NVIDIA.
                                        <br/>
                                        That's the Hunter Pcs no expenses spared gurantee
                                    </p>
                                    <button type="button" onClick={function() {
                                        sessionStorage.setItem('supportPageScroll', 'noExpensesSpared');
                                        changePage('support');
                                    }}>
                                        <h3 className="limitedSize">
                                            Read more on our no expenses spared guarantee
                                        </h3>
                                    </button>
                                </td>
                                <td>
                                    <img src='https://firebasestorage.googleapis.com/v0/b/hunter-pcs-firebase.appspot.com/o/images%2Fimage%20of%20pc.jpeg?alt=media&token=057583b8-036a-4ffd-9657-58e010d7e8e8'
                                    className="mainImage centered" style={{width: '80%'}} alt='loading...' />
                                </td>
                            </tr>
                        </thead>
                    </table>
                </div>

                {/*GET IN TOUCH SECTION*/}
                <div className="purpleGrey">
                    <h1 className="alignLeft">
                        Get in touch
                    </h1>
                    <table>
                        <thead>
                            <tr>
                                <td>
                                    <img src='https://firebasestorage.googleapis.com/v0/b/hunter-pcs-firebase.appspot.com/o/images%2Frounded%20skull%202.jpeg?alt=media&token=c9e0128f-15ca-4595-bc92-15618109e0de'
                                    className="mainImage centered" style={{width: '80%'}} alt="loading..." />
                                </td>
                                <td>
                                    <h2 className="alignRight">
                                        We're here for you
                                    </h2>
                                    <p className="alignLeft">
                                        You can contact us, anytime. One of our trained support officers will contact you within 0-5 buisiness days will the full intent
                                        of making your life easier. Here at Hunter Pcs, we pride ourselves on the quality of our customer support.
                                    </p>
                                    <a href="mailto:HunterPcsSupport@gmail.com" target="_blank">
                                        <h3 className="limitedSize">
                                            Just drop us a message at HunterPcsSuport@gmail.com
                                        </h3>
                                    </a>
                                </td>
                            </tr>
                        </thead>
                    </table>
                </div>

                {/*DELIVERY SECTION*/}
                <div>
                    <h1 className="alignRight">
                        We deliver
                    </h1>
                    <table>
                        <thead>
                            <tr>
                                <td>
                                    <h2 className="alignLeft">
                                        From us to your doorstep
                                    </h2>
                                    <p className="alignRight">
                                        Not able to come and pick up your pc? Don't want to? We got you sorted. We'll deliver anything to you provided you tell us where
                                        to drop it off. If it gets damaged in the post, that's on us and we'll come to collect your pc and repair it fully free of charge.
                                        Its all just part of the Hunter Pcs quality guarantee
                                    </p>
                                    <button type="button" onClick={function() {
                                        sessionStorage.setItem('supportPageScroll', 'noExpensesSpared');
                                        changePage('support');
                                    }}>
                                        <h3 className="limitedSize">
                                            More on our quality guarantee
                                        </h3>
                                    </button>
                                </td>
                                <td>
                                    <img src='https://firebasestorage.googleapis.com/v0/b/hunter-pcs-firebase.appspot.com/o/images%2Fimage%20of%20pc%202.jpeg?alt=media&token=130b9cda-a29c-4e11-a752-d1e68ef07788'
                                    className="mainImage centered" style={{width: '80%'}} alt="loading..." />
                                </td>
                            </tr>
                        </thead>
                    </table>
                </div>
            </React.Fragment>
        );
    };
};

export default About;