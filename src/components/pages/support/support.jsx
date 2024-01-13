import React, {Component} from 'react';
import {isMobile} from '../../../index.js';
import GenericMarkupSection from '../../multiPageComponents/genericMarkupSection.jsx';
import { Link } from 'react-router-dom';

class Support extends Component {

    componentDidMount() {
        const scrollTarget = document.getElementById(sessionStorage.getItem('supportPageScroll'));
        if (scrollTarget) {
            setTimeout(() => {
                scrollTarget.scrollIntoView(true);
            }, 1100);
        };
        sessionStorage.setItem('supportPageScroll', undefined);
    }

    render() {

        //desktop support page
        if (!isMobile()) {

            return (
                <React.Fragment>
                    <h1 className="alignRight">
                        Support is here 24/7
                    </h1>
    
                    {/*NO EXPENSES SPARED SECTION*/}
                    <div id="noExpensesSpared">
                        <table>
                            <thead>
                                <tr>
                                    <td>
                                        <img src='https://firebasestorage.googleapis.com/v0/b/hunter-pcs-firebase.appspot.com/o/images%2FgamingSetup3.jpeg?alt=media&token=14f48700-0317-41ad-8a46-723bdc52bc5c'
                                        className="mainImage centered" style={{width: '85%'}} alt="loading..." />
                                    </td>
                                    <td style={{width: '40%'}}>
                                        <h2 className="alignRight">
                                            We guarantee no expenses spared
                                        </h2>
                                        <p className="alignLeft" style={{maxWidth: '85%'}}>
                                            Ever bought some tech only for it not to work? We have and we know it can be infuriating. That's why we can promise you that your
                                            gaming PC will be thoroughly tested for any chinks in its armour. What's more, we make sure that we only use trusted manufacturers
                                            for each of the components in your PC. More on that later
                                        </p>
                                    </td>
                                </tr>
                            </thead>
                        </table>
                    </div>
    
                    {/*CONTACT US SECTION*/ }
                    <div id="contactUs">
                        <h1 className="alignRight">
                            Contact us any time, anywhere
                        </h1>
                        <table>
                            <thead>
                                <tr>
                                    <td style={{width: '40%'}}>
                                        <h2 className="alignLeft">
                                            We're here for you
                                        </h2>
                                        <p className="alignRight">
                                            We're dedicated to making sure that every step of the way between being here and owning a Hunter PC is smooth sailing. That's why
                                            you shouldn't hesitate to contact us
                                        </p>
                                        <a href="mailto:hunterpcsuk@gmail.com" target="_blank">
                                            <h3 className="limitedSize">
                                                Contact us at: hunterpcsuk@gmail.com ⟶
                                            </h3>
                                        </a>
                                    </td>
                                    <td>
                                        <img src='https://firebasestorage.googleapis.com/v0/b/hunter-pcs-firebase.appspot.com/o/images%2Frounded%20skull%202.jpeg?alt=media&token=c9e0128f-15ca-4595-bc92-15618109e0de'
                                        className="mainImage centered" style={{width: '85%'}} alt="loading..." />
                                    </td>
                                </tr>
                            </thead>
                        </table>
                    </div>
    
                    {/*BRANDS WE USE SECTION*/}
                    <div id="brandsWeUse" className="purpleGrey">
                        <h1 className="alignLeft">
                            Only the best in a Hunter PC
                        </h1>
                        <table>
                            <thead>
                                <tr>
                                    <td>
                                        <img src='https://firebasestorage.googleapis.com/v0/b/hunter-pcs-firebase.appspot.com/o/images%2Fimage%20of%20pc.jpeg?alt=media&token=057583b8-036a-4ffd-9657-58e010d7e8e8' 
                                        className="mainImage centered" style={{width: '85%'}} alt="loading..." />
                                    </td>
                                    <td>
                                        <h2 className="alignRight">
                                            Trusted brands only
                                        </h2>
                                        <p className="alignLeft">
                                            Here at Hunter PCs, we know that quality is vital to high-performance PCs like ours. That's why we only ship PCs with components
                                            from trusted manufacturers, like these:
                                        </p>
                                        <p className="alignLeft">
                                            -AMD and Intel for CPUs 
                                        </p>
                                        <p className="alignLeft">
                                            -NVIDIA for GPUs 
                                        </p>
                                        <p className="alignLeft">
                                            -Corsair for power supply units
                                        </p>
                                        <p className="alignLeft">
                                            -Kingston and Samsung for SSDs
                                        </p>
                                    </td>
                                </tr>
                            </thead>
                        </table>
                    </div>
    
                    {/*RETURNS SECTION*/}
                    <div id="returns">
                        <h1>
                            Our return policy
                        </h1>
                        <table>
                            <thead>
                                <tr>
                                    <td style={{borderRight: '5px white solid'}}>
                                        <h2 className="alignRight">
                                            If its our fault
                                        </h2>
                                    </td>
    
                                    <td>
                                        <h2 className="alignLeft">
                                            If its your fault
                                        </h2>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{borderRight: '5px white solid'}}>
                                        <p className="alignLeft">
                                            Faulty parts? Short lifespan? Awful speeds? That's our fault: you can return the entire PC and we will fix it up like new 
                                            for you free of charge (minus delivery fees)
                                        </p>
                                    </td>
                                    <td>
                                        <p className="alignRight">
                                            Spill some water? Loose power mid update? Drop the PC? Thats your fault but don't fear: we can still repair your PC for you 
                                            but you'll need to cover the cost. You will be billed for each part we replace as well as a fixed cost of £149.99 for the repairs
                                        </p>
                                    </td>
                                </tr>
                            </thead>
                        </table>
                        <a href="mailto:hunterpcsuk@gmail.com" target="_blank">
                            <h2>
                                Can't work out who's fault it is?
                            </h2>
                            <h3 className="limitedSize">
                                Then just message us here and we'll have a chat about what we can do to get you back in the game as soon as possible ⟶
                            </h3>
                        </a>
                    </div>
    
                    {/*WARRANTY INFORMATION SECTION*/}
                    <div id="warrantyInformation">
                        <GenericMarkupSection
                        headingText='Warranty Information'
                        subheadingText="Tinker to your heart's content"
                        paragraphText={`Love tinkering with a pc? Us too: you can tinker and edit your PC all you want, however do so at your own risk.
                        If something breaks and you removed your warranty sticker, then that's on you. We can still fix it, but you'll be paying for the replacement parts`}
                        imgSrc='https://firebasestorage.googleapis.com/v0/b/hunter-pcs-firebase.appspot.com/o/images%2FmotherboardTall.jpeg?alt=media&token=1e13e531-cf90-4a64-953f-84e850755064'
                        leftBool={false}
                        customImageStyles={{maxHeight: '400px', objectFit: 'cover'}} />
                    </div>
    
                    {/*FRAUD PREVENTION SECTION*/}
                    <div className="purpleGrey" id="fraudPrevention">
                        <GenericMarkupSection
                        headingText='Fraud Prevention'
                        subheadingText="Fraud is illegal, don't do it"
                        paragraphText={`We HATE fraud, so we may request to see any customer's photo id as well as an image of the bank card used to purchase a PC. This is to 
                        make sure that our real customers can get their PC faster, and to stop you dirty AI startups taking everyone else's GPUs
                       
                        If you don't send us images on request then we may revoke access to your Hunter PCs account and refuse to send you any gaming PCs
                        
                        By purchasing any product from Hunter PCs, you agree to our fraud prevention program`}
                        imgSrc='https://firebasestorage.googleapis.com/v0/b/hunter-pcs-firebase.appspot.com/o/images%2Frounded%20skull%204.jpeg?alt=media&token=fc2925fe-3d55-47ca-adc8-42bcf4a8b025'
                        leftBool={true} 
                        customImageCellStyles={{width: '45%'}}/>
                    </div>
    
                    {/*PRIVACY POLICY and TERMS OF SERVICE*/}
                    <div>
                        <h1 className="alignRight">
                            Boring legal stuff
                        </h1>
                        <table>
                            <thead>
                                <tr>
                                    <td>
                                        <div id="privacyPolicy">
                                            <h2 className="alignLeft">
                                                Privacy policy
                                            </h2>
                                            <p className="alignRight">
                                                We collect the minimal amount of information possible, and store it in a safe place
                                            </p>
                                            <Link to='/privacyPolicy'>
                                                <h3>
                                                    Read full privacy policy ⟶
                                                </h3>
                                            </Link>
                                        </div>
                                        
                                        <div id="termsOfService" style={{borderTop: '5px solid white'}}>
                                            <h2 className="alignLeft">
                                                Terms of service
                                            </h2>
                                            <p className="alignRight legalText">
                                                ENTER_TERMS_OF_SERVICE_HERE
                                            </p>
                                        </div>
                                    </td>
                                    <td>
                                        <img src='https://firebasestorage.googleapis.com/v0/b/hunter-pcs-firebase.appspot.com/o/images%2FgamingSetupTall3.jpeg?alt=media&token=2aa1cc21-dfdf-44aa-b228-e1de4cc45337'
                                        className="mainImage centered" style={{width: '85%'}} alt="loading..." />
                                    </td>
                                </tr>
                            </thead>
                        </table>
                    </div>

                    {/*DELIVERY INFORMATION SECTION*/}
                    <div id="deliveryInformation">
                        <GenericMarkupSection
                        headingText='Delivery Information'
                        subheadingText='We deliver'
                        paragraphText="We only use the highest quality services for delivery. All Hunter PCs are delivered using DPD, one of the world's leading parcel delivery networks.
                         At current, we only deliver to England."
                        imgSrc='https://firebasestorage.googleapis.com/v0/b/hunter-pcs-firebase.appspot.com/o/images%2FgamingSetup5.jpeg?alt=media&token=ae0b17a9-63c4-4632-89c4-265c75e1a2bd'
                        leftBool={true} 
                        customImageCellStyles={{width: '60%'}}/>
                    </div>
                </React.Fragment>
            );
        }

        //mobile support page
        else {
            return (
                <React.Fragment>
                    <h1>
                        Support is here 24/7
                    </h1>

                    {/*NO EXPENSES SPARED SECTION*/}
                    <div id="noExpensesSpared">
                        <table>
                            <tr>
                                <td style={{width: '60%'}}>
                                    <img src='https://firebasestorage.googleapis.com/v0/b/hunter-pcs-firebase.appspot.com/o/images%2FgamingSetup3.jpeg?alt=media&token=14f48700-0317-41ad-8a46-723bdc52bc5c'
                                            className="mainImage centered" alt="loading..." /> 
                                </td>
                                <td>
                                    <h2 className="alignLeft">
                                        We guarantee no expenses spared
                                    </h2>
                                </td>
                            </tr>
                        </table>
                        <p className="alignRight">
                            Ever bought some tech only for it not to work? We have and we know it can be infuriating. That's why we can promise you that your
                            gaming PC will be thoroughly tested for any chinks in its armour. What's more, we make sure that we only use trusted manufacturers
                            for each of the components in your PC. More on that later
                        </p>
                    </div>

                    <div className="dividerLine"></div>

                    {/*CONTACT US SECTION*/}
                    <div id="contactUs">
                        <h1>
                            Contact us any time, anywhere
                        </h1>
                        <table>
                            <thead>
                                <tr>
                                    <td>
                                        <h2 className="alignRight">
                                            We're here for you
                                        </h2>
                                    </td>
                                    <td style={{width: '60%'}}>
                                        <img src='https://firebasestorage.googleapis.com/v0/b/hunter-pcs-firebase.appspot.com/o/images%2Frounded%20skull%202.jpeg?alt=media&token=c9e0128f-15ca-4595-bc92-15618109e0de'
                                        className="mainImage centered" alt="loading..." />
                                    </td>
                                </tr>
                            </thead>
                        </table>
                        <p className="alignLeft">
                            We're dedicated to making sure that every step of the way between being here and owning a Hunter PC is smooth sailing. That's why
                            you shouldn't hesitate to contact us
                        </p>
                        <a href="mailto:hunterpcsuk@gmail.com" target="_blank">
                            <h3 className="limitedSize">
                                Contact us at: hunterpcsuk@gmail.com ⟶
                            </h3>
                        </a>
                    </div>

                    <div className="dividerLine"></div>

                    {/*BRANDS WE USE SECTION*/}
                    <div id="brandsWeUse" className="purpleGrey">
                        <h1>
                            Only the best in a Hunter PC
                        </h1>
                        <table>
                            <thead>
                                <tr>
                                    <td style={{width: '60%'}}>
                                        <img src='https://firebasestorage.googleapis.com/v0/b/hunter-pcs-firebase.appspot.com/o/images%2Fimage%20of%20pc.jpeg?alt=media&token=057583b8-036a-4ffd-9657-58e010d7e8e8' 
                                        className="mainImage centered" alt="loading..." />
                                    </td>
                                    <td>
                                        <h2 className="alignLeft">
                                            Trusted brands only
                                        </h2>
                                    </td>
                                </tr>
                            </thead>
                        </table>
                        <p className="alignLeft">
                            Here at Hunter PCs, we know that quality is vital to high-performance pcs like ours. That's why we only ship PCs with components
                             from trusted manufacturers, like these:
                             <br/><br/>
                             -AMD and Intel for CPUs 
                             <br/><br/>
                             -NVIDIA for GPUs 
                             <br/><br/>
                             -Corsair for power supply units
                             <br/><br/>
                             -Kingston and Samsung for SSDs
                        </p>
                    </div>

                    <div className="dividerLine"></div>

                    {/*RETURNS SECTION*/}
                    <div id="returns">
                        <h1>
                            Our Return Policy
                        </h1>

                        <h2 className="alignRight">
                            If its our fault
                        </h2>
                        <p className="alignRight">
                            Faulty parts? Limited lifespan? Slow speeds? That's our fault: you can return the entire PC and we will fix it up like new 
                            for you free of charge (minus delivery fees)
                        </p>

                        <h2 className="alignLeft" style={{marginTop: '3vh'}}>
                            If its your fault
                        </h2>
                        <p className="alignLeft">
                            Spill some water? Loose power mid update? Drop the PC? Thats your fault but don't fear: we can still repair your PC for you 
                            but you'll need to cover the cost. You will be billed for each part we replace as well as a fixed cost of £149.99 for the repairs
                        </p>

                        <a href="mailto:hunterpcsuk@gmail.com" target="_blank">
                            <h2 style={{marginTop: '3vh'}}>
                                Can't work out who's fault it is?
                            </h2>
                            <h3 className="limitedSize">
                                Then just message us here and we'll have a chat about what we can do to get you back in the game as soon as possible ⟶
                            </h3>
                        </a>
                    </div>

                    <div className="dividerLine"></div>

                    {/*WARRANTY INFORMATION SECTION*/}
                    <div id="warrantyInformation">
                        <GenericMarkupSection
                        headingText='Warranty Information'
                        subheadingText="Tinker to your heart's content"
                        paragraphText="Love tinkering with a PC? Us too: you can tinker and edit your PC all you want, however do so at your own risk.
                        If something breaks and you removed your warranty sticker, then thats on you. We can still fix it, but you'll be paying for the replacement parts"
                        imgSrc='https://firebasestorage.googleapis.com/v0/b/hunter-pcs-firebase.appspot.com/o/images%2FmotherboardTall.jpeg?alt=media&token=1e13e531-cf90-4a64-953f-84e850755064'
                        leftBool={false} 
                        customImageStyles={{maxHeight: '250px', objectFit: 'cover'}} />
                    </div>

                    {/*FRAUD PREVENTION SECTION*/}
                    <div id="fraudPrevention" className="purpleGrey">
                        <GenericMarkupSection
                        headingText='Fraud Prevention'
                        subheadingText="Fraud is illegal, don't do it"
                        paragraphText={`We HATE fraud, so we may request to see any customer's photo id as well as an image of the bank card used to purchase a PC. This is to 
                        make sure that our real customers can get their PC faster, and to stop you dirty AI startups taking everyone else's GPUs.
                        If you don't send us images on request then we may revoke access to your Hunter PCs account and refuse to send you any gaming PCs.
                        By purchasing any product from Hunter PCs, you agree to our fraud prevention program`}
                        imgSrc='https://firebasestorage.googleapis.com/v0/b/hunter-pcs-firebase.appspot.com/o/images%2Frounded%20skull%204.jpeg?alt=media&token=fc2925fe-3d55-47ca-adc8-42bcf4a8b025'
                        leftBool={true} />
                    </div>

                    {/*PRIVACY POLICY AND TERMS OF SERVICE*/}
                    <div>
                        <h1>
                            Boring legal stuff
                        </h1>

                        <div id="privacyPolicy">
                            <h2 className="alignRight">
                                Privacy Policy
                            </h2>
                            <p>
                                We collect the minimal amount of information possible, and store it in a safe place
                            </p>
                            <Link to='/privacyPolicy'>
                                <h3>
                                    Read full privacy policy ⟶
                                </h3>
                            </Link>
                        </div>

                        <div id="termsOfService" style={{marginTop: '3vh'}}>
                            <h2 className="alignLeft">
                                Terms of Service
                            </h2>
                            <p className="alignLeft">
                                ENTER_TERMS_OF_SERVICE_HERE
                            </p>
                        </div>
                    </div>

                    <div className="dividerLine"></div>

                    {/*DELIVERY INFORMATION SECTION*/}
                    <div id="deliveryInformation">
                        <GenericMarkupSection
                        headingText='Delivery Information'
                        subheadingText='We deliver'
                        paragraphText="We only use the highest quality services for delivery. All Hunter PCs are delivered using DPD, one of the world's leading parcel delivery networks.
                         At current, we only deliver to England."
                        imgSrc='https://firebasestorage.googleapis.com/v0/b/hunter-pcs-firebase.appspot.com/o/images%2FgamingSetup5.jpeg?alt=media&token=ae0b17a9-63c4-4632-89c4-265c75e1a2bd'
                        leftBool={false}
                        DontShowDividerLineBool={true} />
                    </div>
                </React.Fragment>
            );
        };
    };
};

export default Support;