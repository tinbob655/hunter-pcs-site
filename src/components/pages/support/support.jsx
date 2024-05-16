import React, {Component} from 'react';
import {isMobile} from '../../../index.js';
import GenericMarkupSection from '../../multiPageComponents/genericMarkupSection.jsx';
import { Link } from 'react-router-dom';
import Image from '../../multiPageComponents/image.jsx';

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
                                        <Image imagePath="images/gamingSetup3.jpeg" imageClasses="mainImage centered" imageStyles={{width: '85%'}} />
                                    </td>
                                    <td style={{width: '40%'}}>
                                        <h2 className="alignRight">
                                            We guarantee no expense spared
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
                    <div id="contactUs" className="intoPurple">
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
                                        <Image imagePath="images/rounded skull 2.jpeg" imageClasses="mainImage centered" imageStyles={{width: '85%'}} />
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
                                        <Image imagePath="images/image of pc.jpeg" imageClasses="mainImage centered" imageStyles={{width: '85%'}} />
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
                    <div id="returns" className="outofPurple">
                        <h1>
                            Our return policy
                        </h1>
                        <table>
                            <thead>
                                <tr>
                                    <td style={{borderRight: '5px white solid'}}>
                                        <h2 className="alignLeft">
                                            If it's our fault
                                        </h2>
                                    </td>
    
                                    <td>
                                        <h2 className="alignRight">
                                            If it's your fault
                                        </h2>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{borderRight: '5px white solid'}}>
                                        <p className="alignRight">
                                            Faulty parts? Short lifespan? Awful speeds? That's our fault: you can return the entire PC and we will fix it up like new 
                                            for you free of charge (minus delivery fees)
                                        </p>
                                    </td>
                                    <td>
                                        <p className="alignLeft">
                                            Spill some water? Loose power mid update? Drop the PC? That's your fault but don't fear: we can still repair your PC for you 
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
                        imgSrc='images/motherboardTall.jpeg'
                        leftBool={false}
                        customImageStyles={{maxHeight: '400px', objectFit: 'cover'}} />
                    </div>
    
                    {/*FRAUD PREVENTION SECTION*/}
                    <div className="intoPurple" id="fraudPrevention">
                        <GenericMarkupSection
                        headingText='Fraud Prevention'
                        subheadingText="Fraud is illegal, don't do it"
                        paragraphText={`We HATE fraud, so we may request to see any customer's photo id as well as an image of the bank card used to purchase a PC. This is to 
                        make sure that our real customers can get their PC faster, and to stop you dirty AI startups taking everyone else's GPUs
                       
                        If you don't send us images on request then we may revoke access to your Hunter PCs account and refuse to send you any gaming PCs
                        
                        By purchasing any product from Hunter PCs, you agree to our fraud prevention program`}
                        imgSrc='images/rounded skull 4.jpeg'
                        leftBool={true} 
                        customImageCellStyles={{width: '45%'}}/>
                    </div>
    
                    {/*PRIVACY POLICY and TERMS OF SERVICE*/}
                    <div className="outofPurple">
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
                                            <p className="alignRight">
                                                More on how we operate
                                            </p>
                                            <Link to='/termsOfService'>
                                                <h3>
                                                    Read full terms of service ⟶
                                                </h3>
                                            </Link>
                                        </div>
                                    </td>
                                    <td>
                                        <Image imagePath="images/gamingSetupTall3.jpeg" imageClasses="mainImage centered" imageStyles={{width: '85%'}} />
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
                        imgSrc='images/gamingSetup5.jpeg'
                        leftBool={true} 
                        customImageCellStyles={{width: '60%'}}/>
                    </div>

                    {/*FIND YOUR MODEL SECTION*/}
                    <div id="findYourModel">
                        <h1 className="alignRight">
                            Find your model
                        </h1>
                        <table>
                            <thead>
                                <tr>
                                    <td>
                                        <h2 className="alignLeft">
                                            We'll help you pick your perfect model
                                        </h2>
                                        <p>
                                            We understand it can be hard to select the ideal PC from our range of prebuilt PCs. Need help? Look no further:
                                        </p>

                                        {/*solid*/}
                                        <h2 style={{paddingBottom: 0, marginBottom: 0}} className="alignRight">
                                            Solid:
                                        </h2>
                                        <p style={{marginTop: 0, paddingTop: 0}} className="alignRight">
                                            Our solid model is aimed at gamers who wish to play most games in 1080p with high FPS.
                                        </p>

                                        {/*strong*/}
                                        <h2 style={{paddingBottom: 0, marginBottom: 0}} className="alignLeft">
                                            Strong:
                                        </h2>
                                        <p style={{marginTop: 0, paddingTop: 0}} className="alignLeft">
                                            Our strong model is for gamers who wish to play all games easily in 1080p with very high FPS, and many single-player games in 1440p with lower FPS.
                                        </p>

                                        {/*powerful*/}
                                        <h2 style={{paddingBottom: 0, marginBottom: 0}} className="alignRight">
                                            Powerful:
                                        </h2>
                                        <p style={{marginTop: 0, paddingTop: 0}} className="alignRight">
                                            Our powerful model is aimed at those who wish to easily play all games in 1440p with high FPS as well as have high aesthetic build quality.
                                        </p>

                                        {/*supreme*/}
                                        <h2 style={{paddingBottom: 0, marginBottom: 0}} className="alignLeft">
                                            Supreme:
                                        </h2>
                                        <p style={{paddingTop: 0, marginTop: 0}} className="alignLeft">
                                            Our supreme model is designed with gamers who want to play games in 4K with an RGB flair as well as never have to worry about storage space or cooling in mind.
                                        </p>

                                        {/*dominant*/}
                                        <h2 style={{paddingBottom: 0, marginBottom: 0}} className="alignRight">
                                            Dominant:
                                        </h2>
                                        <p style={{paddingTop: 0, marginTop: 0}} className="alignRight">
                                            Our dominant model is curated for gamers with a passion for quality, easily running any game on max settings in 4K resolution without breaking a sweat. For dominanting the competition, this is the perfect solution.
                                        </p>
                                    </td>
                                    <td>
                                        <Image imagePath="images/gamingPcVTall.png" imageClasses="mainImage centered" imageStyles={{maxHeight: 'unset'}} />
                                    </td>
                                </tr>
                            </thead>
                        </table>
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
                                    <Image imagePath="images/gamingSetup3.jpeg" imageClasses="mainImage centered"/>
                                </td>
                                <td>
                                    <h2 className="alignLeft">
                                        We guarantee no expense spared
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
                    <div id="contactUs" className="intoPurple">
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
                                        <Image imagePath="images/rounded skull 2.jpeg" imageClasses="mainImage centered" />
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
                                        <Image imagePath="images/image of pc.jpeg" imageClasses="mainImage centered" />
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
                    <div id="returns" className="outofPurple">
                        <h1>
                            Our Return Policy
                        </h1>

                        <h2 className="alignRight">
                            If it's our fault
                        </h2>
                        <p className="alignRight">
                            Faulty parts? Limited lifespan? Slow speeds? That's our fault: you can return the entire PC and we will fix it up like new 
                            for you free of charge (minus delivery fees)
                        </p>

                        <h2 className="alignLeft" style={{marginTop: '3vh'}}>
                            If it's your fault
                        </h2>
                        <p className="alignLeft">
                            Spill some water? Loose power mid update? Drop the PC? That's your fault but don't fear: we can still repair your PC for you 
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
                        imgSrc='images/motherboardTall.jpeg'
                        leftBool={false} 
                        customImageStyles={{maxHeight: '250px', objectFit: 'cover'}} />
                    </div>

                    {/*FRAUD PREVENTION SECTION*/}
                    <div id="fraudPrevention" className="intoPurple">
                        <GenericMarkupSection
                        headingText='Fraud Prevention'
                        subheadingText="Fraud is illegal, don't do it"
                        paragraphText={`We HATE fraud, so we may request to see any customer's photo id as well as an image of the bank card used to purchase a PC. This is to 
                        make sure that our real customers can get their PC faster, and to stop you dirty AI startups taking everyone else's GPUs.
                        If you don't send us images on request then we may revoke access to your Hunter PCs account and refuse to send you any gaming PCs.
                        By purchasing any product from Hunter PCs, you agree to our fraud prevention program`}
                        imgSrc='images/rounded skull 4.jpeg'
                        leftBool={true} />
                    </div>

                    {/*PRIVACY POLICY AND TERMS OF SERVICE*/}
                    <div className="purpleGrey">
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
                            <Link to='/termsOfService'>
                                <h3>
                                    Read full terms of service ⟶
                                </h3>
                            </Link>
                        </div>
                    </div>

                    <div className="dividerLine"></div>

                    {/*DELIVERY INFORMATION SECTION*/}
                    <div id="deliveryInformation" className="outofPurple">
                        <GenericMarkupSection
                        headingText='Delivery Information'
                        subheadingText='We deliver'
                        paragraphText="We only use the highest quality services for delivery. All Hunter PCs are delivered using DPD, one of the world's leading parcel delivery networks.
                         At current, we only deliver to England."
                        imgSrc='images/gamingSetup5.jpeg'
                        leftBool={false} />
                    </div>

                    {/*FIND YOUR MODEL SECTION*/}
                    <div id="findYourModel">
                        <h1>
                            Find your model
                        </h1>
                        <table>
                            <thead>
                                <tr>
                                    <td>
                                        <Image imagePath="images/gamingSetup3.jpeg" imageClasses="mainImage centered" />
                                    </td>
                                    <td>
                                        <h2 className="alignLeft">
                                            We'll help you pick your perfect model
                                        </h2>
                                    </td>
                                </tr>
                            </thead>
                        </table>
                        <p>
                            We understand it can be hard to select the ideal PC from our range of prebuilt PCs. Need help? Look no further:
                        </p>

                        {/*solid*/}
                        <h2 style={{paddingBottom: 0, marginBottom: 0}} className="alignRight">
                            Solid:
                        </h2>
                        <p style={{marginTop: 0, paddingTop: 0}} className="alignRight">
                            Our solid model is aimed at gamers who wish to play most games in 1080p with high FPS.
                        </p>

                        {/*strong*/}
                        <h2 style={{paddingBottom: 0, marginBottom: 0}} className="alignLeft">
                            Strong:
                        </h2>
                        <p style={{marginTop: 0, paddingTop: 0}} className="alignLeft">
                            Our strong model is for gamers who wish to play all games easily in 1080p with very high FPS, and many single-player games in 1440p with lower FPS.
                        </p>

                        {/*powerful*/}
                        <h2 style={{paddingBottom: 0, marginBottom: 0}} className="alignRight">
                            Powerful:
                        </h2>
                        <p style={{marginTop: 0, paddingTop: 0}} className="alignRight">
                            Our powerful model is aimed at those who wish to easily play all games in 1440p with high FPS as well as have high aesthetic build quality.
                        </p>

                        {/*supreme*/}
                        <h2 style={{paddingBottom: 0, marginBottom: 0}} className="alignLeft">
                            Supreme:
                        </h2>
                        <p style={{paddingTop: 0, marginTop: 0}} className="alignLeft">
                            Our supreme model is designed with gamers who want to play games in 4K with an RGB flair as well as never have to worry about storage space or cooling in mind.
                        </p>

                        {/*dominant*/}
                        <h2 style={{paddingBottom: 0, marginBottom: 0}} className="alignRight">
                            Dominant:
                        </h2>
                        <p style={{paddingTop: 0, marginTop: 0}} className="alignRight">
                            Our dominant model is curated for gamers with a passion for quality, easily running any game on max settings in 4K resolution without breaking a sweat. For dominanting the competition, this is the perfect solution.
                        </p>
                    </div>
                </React.Fragment>
            );
        };
    };
};

export default Support;