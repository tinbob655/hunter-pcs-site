import React, {Component} from 'react';
import { isMobile } from '../../../index.js';
import { Link } from 'react-router-dom';
import GenericMarkupSection from '../../multiPageComponents/genericMarkupSection.jsx';
import TrustpilotTrustBox from '../../multiPageComponents/trustpilotWidget/trustpilotWidget.jsx';
import Image from '../../multiPageComponents/image.jsx';

class About extends Component {

    render() {

        //desktop about page
        if (!isMobile()) {
            return (
                <React.Fragment>
                    <h1 className="alignRight">
                        All about us at Hunter PCs
                    </h1>
    
                    {/*CUSTOMISABLE SECTION*/}
                    <div>
                        <table>
                            <tr>
                                <td>
                                    <Image imagePath="images/gamingSetupWIDE2.jpeg" imageClasses="mainImage centered" />
                                </td>
                                <td style={{width: '40%'}}>
                                    <h2 className="alignRight">
                                        Fully customisable
                                    </h2>
                                    <p className="alignLeft">
                                        Each and every PC you find in our prebuilt gaming PCs section can be fully customised to your heart's content.
                                        Just have a look over on our custom PCs page
                                    </p>
                                    <Link to='/customPcs'>
                                        <h3>
                                            Customise your own PC
                                        </h3>
                                    </Link>
                                </td>
                            </tr>
                        </table>
                    </div>
    
                    {/*WHY HUNTER PCS SECTION*/}
                    <div className="intoPurple">
                        <GenericMarkupSection
                        headingText='Why Hunter PCs?'
                        subheadingText="Because we're the best"
                        paragraphText={`Choose Hunter PCs because here, we guarantee that all our products are thoroughly tested. Not only that, but each and every
                        PC we ship to you will come fitted with components exclusivley from brands we can all trust such as corsair, AMD and NVIDIA.
                        \n\n
                        That's the Hunter Pcs no expenses spared gurantee`}
                        linkContent='Read more on our no expenses spared guarantee ⟶'
                        linkDestination='/support'
                        imgSrc='images/image of pc.jpeg'
                        leftBool={false} />
                    </div>

                    {/*OUR SOCIALS SECTION*/}
                    <div className="purpleGrey">
                        <h1 className="alignLeft">
                            Our socials
                        </h1>
                        <table>
                            <thead>
                                <tr>
                                    <td>
                                        <Image imagePath="images/gamingSetup5.jpeg" imageClasses="mainImage centered" />
                                    </td>
                                    <td>
                                        <h2 className="alignRight">
                                            Drop us a follow
                                        </h2>
                                        <p className="alignLeft">
                                            We work hard to provide high quality social media posts so you can have a better insight to what goes on at Hunter PCs.
                                        </p>
                                        <a href='https://www.instagram.com/hunterpcsuk/?igsh=MW1yYW5sb3o0N2tvYg%3D%3D&utm_source=qr' target="_blank">
                                            <h3>
                                                Follow us ⟶
                                            </h3>
                                        </a>
                                    </td>
                                </tr>
                            </thead>
                        </table>
                    </div>
    
                    {/*GET IN TOUCH SECTION*/}
                    <div className="outofPurple">
                        <h1 className="alignRight">
                            Get in touch
                        </h1>
                        <table>
                            <thead>
                                <tr>
                                    <td>
                                        <h2 className="alignLeft">
                                            We're here for you
                                        </h2>
                                        <p className="alignRight">
                                            You can contact us, anytime. One of our trained support officers will contact you within 0-5 business days with the full intent
                                            of making your life easier. Here at Hunter PCs, we pride ourselves on the quality of our customer support.
                                        </p>
                                        <a href="mailto:hunterpcsuk@gmail.com" target="_blank">
                                            <h3 className="limitedSize">
                                                Just drop us a message at hunterpcsuk@gmail.com ⟶
                                            </h3>
                                        </a>
                                    </td>
                                    <td>
                                        <Image imagePath="images/rounded skull 2.jpeg" imageClasses="mainImage centered" />
                                    </td>
                                </tr>
                            </thead>
                        </table>
                    </div>

                    {/*LEAVE A REVIEW SECTION*/}
                    <div>
                        <h1 className="alignLeft">
                            Leave a Review
                        </h1>
                        <table>
                            <thead>
                                <tr>
                                    <td>
                                        <Image imagePath="images/rounded skull 3.jpeg" imageClasses="mainimage centered" />
                                    </td>
                                    <td>
                                        <h2 className="alignRight">
                                            Tell us what you think
                                        </h2>
                                        <p className="alignLeft">
                                            Please consider leaving us a review using the below button. It helps us out making sure other gamers get high quality PCs from us and 
                                            gets the community in the game as soon as possible
                                        </p>
                                        <TrustpilotTrustBox />
                                    </td>
                                </tr>
                            </thead>
                        </table>
                    </div>
    
                    {/*DELIVERY SECTION*/}
                    <div>
                        <GenericMarkupSection
                        headingText='We deliver'
                        subheadingText='From us to your doorstep'
                        paragraphText="Not able to come and pick up your PC? Don't want to? We've got you sorted. We'll deliver anything to you provided you tell us where
                        to drop it off. If it gets damaged in the post, that's on us and we'll come to collect your pc and repair it fully free of charge.
                        Its all just part of the Hunter Pcs quality guarantee"
                        linkContent='More on our quality guarantee ⟶'
                        linkDestination='/support'
                        imgSrc='images/image of pc 2.jpeg'
                        leftBool={false} />
                    </div>
                </React.Fragment>
            );
        }

        //mobile about page
        else {
            return (
                <React.Fragment>
                    <h1>
                        All about us at Hunter Pcs
                    </h1>

                    {/*CUSTOMISABLE SECTION*/}
                    <div>
                        <table>
                            <tr>
                                <td>
                                    <Image imagePath="images/gamingSetupWIDE2.jpeg" imageClasses="mainImage centered" />
                                </td>
                                <td style={{width: '40%'}}>
                                    <h2 className="alignLeft">
                                        Fully customisable
                                    </h2>
                                </td>
                            </tr>
                        </table>
                        <p>
                            Each and every PC you find in our prebuilt gaming pcs section can be fully customised to your heart's content.
                            Just have a look over on our custom PCs page
                        </p>
                        <Link to='/customPcs'>
                            <h3>
                                Customise your own PC ⟶
                            </h3>
                        </Link>
                    </div>

                    <div className="dividerLine"></div>

                    {/*WHY HUNTER PCS SECTION*/}
                    <div className="intoPurple">
                        <GenericMarkupSection
                        headingText='Why Hunter PCs?'
                        subheadingText="Becase we're the best"
                        paragraphText={`Choose Hunter PCs because here, we guarantee that all our products are thoroughly tested. Not only that, but each and every
                        PC we ship to you will come fitted with components exclusivley from brands we can all trust such as corsair, AMD and NVIDIA.
                        \n\n
                        That's the Hunter PCs no expenses spared guarantee`}
                        linkContent='Read more on our no expenses spared guarantee ⟶'
                        linkDestination='/support'
                        imgSrc='images/image of pc.jpeg'
                        leftBool={false}
                        DontShowDividerLineBool={true} />
                    </div>

                    <div className="dividerLine"></div>

                    {/*OUR SOCIALS SECTION*/}
                    <div className="purpleGrey">
                        <h1>
                            Our socials
                        </h1>
                        <table>
                            <thead>
                                <tr>
                                    <td>
                                        <Image imagePath="images/gamingSetup5.jpeg" imageClasses="mainImage centered" />
                                    </td>
                                    <td style={{width: '40%'}}>
                                        <h2 className="alignLeft">
                                            Drop us a follow
                                        </h2>
                                    </td>
                                </tr>
                            </thead>
                        </table>
                        <p>
                            We work hard to provide high quality social media posts so you can have a better insight to what goes on at Hunter PCs.
                        </p>
                        <a href='https://www.instagram.com/hunterpcsuk/?igsh=MW1yYW5sb3o0N2tvYg%3D%3D&utm_source=qr' target="_blank">
                            <h3>
                                Follow us ⟶
                            </h3>
                        </a>
                    </div>

                    <div className="dividerLine"></div>

                    {/*GET IN TOUCH SECTION*/}
                    <div className="outofPurple">
                        <h1>
                            Get in Touch
                        </h1>
                        <table>
                            <tr>
                                <td>
                                    <h2 className="alignRight">
                                        We're here for you
                                    </h2>
                                </td>
                                <td style={{width: '60%'}}>
                                    <Image imagePath="images/rounded skull 2.jpeg" imageClasses="mainImage centered" />
                                </td>
                            </tr>
                        </table>
                        <p>
                            You can contact us, anytime. One of our trained support officers will contact you within 0-5 business days with the full intent
                            of making your life easier. Here at Hunter PCs, we pride ourselves on the quality of our customer support.
                        </p>
                        <a href="mailto:hunterpcsuk@gmail.com" target="_blank">
                            <h3>
                                Just drop us a message at hunterpcsuk@gmail.com ⟶
                            </h3>
                        </a>
                    </div>

                    <div className="dividerLine"></div>

                    {/*LEAVE A REVIEW SECTION*/}
                    <div>
                        <h1>
                            Leave a Review
                        </h1>
                        <table>
                            <thead>
                                <tr>
                                    <td>
                                        <Image imagePath="images/rounded skull 3.jpeg" imageClasses="mainImage centered" />
                                    </td>
                                    <td>
                                        <h2 className="alignLeft">
                                            Tell us what you think
                                        </h2>
                                    </td>
                                </tr>
                            </thead>
                        </table>
                        <p>
                            Please consider leaving us a review using the below button. It helps us out making sure other gamers get high quality PCs from us and 
                            gets the community in the game as soon as possible
                        </p>
                        <TrustpilotTrustBox />
                    </div>

                    <div className="dividerLine"></div>

                    {/*DELIVERY SECTION*/}
                    <div>
                        <GenericMarkupSection
                            headingText='We deliver'
                            subheadingText='From us to your doorstep'
                            paragraphText="Not able to come and pick up your PC? Don't want to? We've got you sorted. We'll deliver anything to you provided you tell us where
                            to drop it off. If it gets damaged in the post, that's on us and we'll come to collect your PC and repair it fully free of charge.
                            Its all just part of the Hunter PCs quality guarantee"
                            linkContent='More on our quality guarantee ⟶'
                            linkDestination='/support'
                            imgSrc='images/image of pc 2.jpeg'
                            DontShowDividerLineBool={true}
                            leftBool={false} />
                    </div>
                </React.Fragment>
            );
        };
    };
};

export default About;