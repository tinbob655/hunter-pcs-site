import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import SlidingButton from '../../multiPageComponents/slidingButton.jsx';
import gamesCompilationVideo from '../../../media/HunterPcs all games compilation.mp4';
import {isMobile} from '../../../index.js';
import './homeStyles.scss';
import Image from '../../multiPageComponents/image.jsx';

class Home extends Component {

    componentDidMount() {
        
        //fancy animations for home page on load

        async function animateParagraphs() {
            const paragraphs = document.querySelectorAll('[id^="homePageParagraph"]');

            for(let i = 0; i < paragraphs.length; i++) {
                paragraphs[i].classList.add('startAnimation');
                await new Promise(r => {setTimeout(r, 500)});
            };
        };
        
        function startAnimationForElement(elementId, delay) {
            setTimeout(() => {
                const element = document.getElementById(elementId);
                element.classList.add('startAnimation');
            }, delay);
        };

        startAnimationForElement('homePageHeader', 500);
        startAnimationForElement('homePageSubheader', 750);
        startAnimationForElement('homePageImage', 1000);
        setTimeout(() => {
            animateParagraphs();
        }, 1500);


    };

    render() {

        //desktop home page
        if (!isMobile()) {
            return (
                <React.Fragment>
                    {/*PAGE HEADER*/}
                    <div>
                        <h1 style={{marginLeft: '50%', textAlign: 'unset'}} id="homePageHeader">
                            PCs made to measure
                        </h1>
    
                        <table>
                            <thead>
                                <tr>
                                    <td style={{width: '60%'}}>
                                        <img src="https://firebasestorage.googleapis.com/v0/b/hunter-pcs-firebase.appspot.com/o/images%2Falt%20Logo.jpg?alt=media&token=83dd8d5d-16ec-4f74-bb00-0fb407d8e659"
                                        style={{width: '50vw', height: '50vw', marginLeft: '7.5%', marginRight: 'unset', borderRadius: '10px'}}
                                        alt="loading..." id="homePageImage"/>
                                    </td>
                                    <td style={{paddingRight: '5%'}}>
                                        <h2 style={{marginRight: '1%', textAlign: 'right'}} id="homePageSubheader">
                                            Packing a serious punch
                                        </h2>
                                        <p className="alignRight homePageAnimatedParagraph" id="homePageParagraph0">
                                            Perfect for:
                                        </p>
                                        <p style={{textAlign: 'right', marginRight: '15%'}} id="homePageParagraph1" className="homePageAnimatedParagraph">
                                            -AAA gaming
                                        </p>
                                        <p style={{textAlign: 'right', marginRight: '20%'}} id="homePageParagraph2" className="homePageAnimatedParagraph">
                                            -Ultra low latency
                                        </p>
                                        <p style={{textAlign: 'right', marginRight: '25%'}} id="homePageParagraph3" className="homePageAnimatedParagraph">
                                            -Office and work
                                        </p>
                                        <p style={{textAlign: 'right', marginRight: '30%'}} id="homePageParagraph4" className="homePageAnimatedParagraph">
                                            -Streaming video
                                        </p>
                                        <p style={{textAlign: 'right', marginRight: '40%'}} id="homePageParagraph5" className="homePageAnimatedParagraph">
                                            -Just chilling
                                        </p>
                                    </td>
                                </tr>
                            </thead>
                        </table>
                    </div>
    
                    {/*GAMING, PREBULIT, CUSTOM BUTTONS*/}
                    <div className="intoPurple">
                        <table style={{width: '100%'}}>
                            <thead>
                                <tr>
    
                                    {/*GAMING PCS BUTTON*/}
                                    <td style={{width: '33.3%'}}>
                                        <SlidingButton 
                                        id="gamingPcs"
                                        imgSrc='images/image of pc.jpeg'
                                        linkLocation='/pcsMain'
                                        textContent='Gaming' />
                                    </td>
    
                                    {/*PREBULIT PCS BUTTON*/}
                                    <td style={{width: '33.3%'}}>
                                        <SlidingButton
                                        id="preBuilt"
                                        imgSrc='images/rainbow pc.png'
                                        linkLocation='/pcsMain'
                                        textContent='Prebuilt' />
                                    </td>
    
                                    {/*CUSTOM PCS BUTTON*/}
                                    <td style={{width: '33.3%'}}>
                                        <SlidingButton 
                                        id="custom"
                                        imgSrc="images/stock pc parts.png"
                                        linkLocation='/customPcs'
                                        textContent='Custom' />
                                    </td>
                                </tr>
                            </thead>
                        </table>
                    </div>
    
                    {/*PERFECT FOR GAMING SECTION*/}
                    <div className="purpleGrey">
                        <table>
                            <thead>
                                <tr>
                                    <td>
                                    <h1 style={{textAlign: 'left', marginLeft: '2%'}}>
                                        Perfect for gaming
                                    </h1>
                                    <p style={{width: '75%', marginLeft: '15%', textAlign: 'right'}}>
                                        Here at Hunter PCs, we know that the best PCs are designed to run games smooth as butter. That's why we've been working hard to deliver you the 
                                        best gaming experience at the lowest price. <br/>We make all our computers with high end components from trusted manufacturers.
                                    </p>
                                    <Link to='/pcsMain'>
                                        <h3>
                                            Browse all gaming PCs  ⟶
                                        </h3>
                                    </Link>
                                    </td>
    
                                    <td style={{width: '50%'}}>
                                        <Image imagePath="images/rounded skull 2.jpeg" imageClasses="mainImage centered" imageStyles={{width: '85%'}} />
                                    </td>
                                </tr>
                            </thead>
                        </table>
                    </div>
    
                    {/*VIDEO FROM PC SECTION*/}
                    <div className="outofPurple">
                        <h1>
                            Play your favourite titles
                        </h1>
                            <video autoPlay loop loading="lazy" alt="loading..." controls>
                            <source src={gamesCompilationVideo} type="video/mp4"/>
                        </video>
                    </div>
    
                    {/*DESIGN YOUR OWN PC SECTION*/}
                    <div style={{ marginTop: '15vh'}}>
                        <h1 className="alignRight">
                            Design your own, custom build
                        </h1>
                        <table>
                            <thead>
                                <tr>
                                    <td>
                                        <p className="alignLeft">
                                            Need that specific PC you've always wanted? Well you're in luck: here at Hunter PCs, you can design your own custom PC
                                             and have one of our experts assemble it for you. We'll even deliver it straight to your door as well
                                        </p>
                                        <Link to='/customPcs'>
                                            <h3>
                                                Design your dream PC ⟶
                                            </h3>
                                        </Link>
                                    </td>
                                    <td style={{width: '50%'}}>
                                        <Image imagePath="images/image of pc.jpeg" imageClasses="mainImage centered" imageStyles={{marginRight: 'auto', width: '65%', marginLeft: '10%'}} />
                                    </td>
                                </tr>
                            </thead>
                        </table>
                    </div>
    
                    {/*QUALITY GUARANTEED SECTION*/}
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <td>
                                        <Image imagePath="images/gamingSetupTall2.jpeg" imageClasses="mainImgae centered" imageStyles={{width: '85%'}} />
                                    </td>
    
                                    <td style={{width: '60%'}}>
                                        <h1 className="alignRight">
                                            Quality guaranteed
                                        </h1>
                                        <p className="alignRight">
                                            We guarantee no expense spared. That means every one of your PC's components is made by branded and trusted manufacturers.
                                            And not just that, we will also thoroughly test your build to make sure you get the maximum performance possible
                                        </p>
                                        <Link to='/support'>
                                            <h3>
                                                Learn more about our no expense spared guarantee ⟶
                                            </h3>
                                        </Link>
                                    </td>
    
                                </tr>
                            </thead>
                        </table>
                    </div>
                </React.Fragment>
            );
        }

        //mobile home page
        else {
            return (
                <React.Fragment>

                    {/*PAGE HEADER*/}
                    <div>
                        <h1 id="homePageHeader">
                            PCs Made to Measure
                        </h1>
                        <table>
                            <tr>
                                <td>
                                    <img src="https://firebasestorage.googleapis.com/v0/b/hunter-pcs-firebase.appspot.com/o/images%2Falt%20Logo.jpg?alt=media&token=83dd8d5d-16ec-4f74-bb00-0fb407d8e659"
                                    className="mainImage centered"
                                    alt="loading..." id="homePageImage"/>
                                </td>
                                <td style={{width: '40%'}}>
                                    <h2 className="alignLeft" id="homePageSubheader">
                                        Packing a serious punch
                                    </h2>
                                </td>
                            </tr>
                        </table>
                        <table>
                            <thead>
                                <tr>
                                    <td>
                                        <p id="homePageParagraph0" className="homePageAnimatedParagraph">
                                            -AAA gaming
                                        </p>
                                    </td>
                                    <td>
                                        <p id="homePageParagraph1" className="homePageAnimatedParagraph">
                                            -Ultra low latency
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p id="homePageParagraph2" className="homePageAnimatedParagraph"> 
                                            -Office and work
                                        </p>
                                    </td>
                                    <td>
                                        <p id="homePageParagraph3" className="homePageAnimatedParagraph">
                                            -Streaming video
                                        </p>
                                    </td>
                                </tr>
                            </thead>
                        </table>
                        <p id="homePageParagraph4" className="homePageAnimatedParagraph">
                            -Just chilling
                        </p>
                    </div>

                    <div className="dividerLine"></div>

                    {/*GAMING, PREBUILT AND CUSTOM BUTTONS*/}
                    <div className="intoPurple">
                        <SlidingButton 
                        id="gamingPcs"
                        imgSrc='images/image of pc.jpeg'
                        linkLocation='pcsMain'
                        textContent='Gaming' />

                        <SlidingButton
                        id="preBuilt"
                        imgSrc='images/rainbow pc.png'
                        linkLocation='pcsMain'
                        textContent='Prebuilt' />

                        <SlidingButton 
                        id="custom"
                        imgSrc="images/stock pc parts.png"
                        linkLocation='customPcs'
                        textContent='Custom' />
                    </div>

                    <div className="dividerLine"></div>

                    {/*PERFECT FOT GAMING SECTION*/}
                    <div className="purpleGrey">
                        <h1>
                            Perfect for gaming
                        </h1>
                        <table>
                            <tr>
                                <td style={{width: '40%'}}>
                                    <h2 className="alignRight">
                                        Maximum speed
                                    </h2>
                                </td>
                                <td>
                                    <Image imagePath="images/rounded skull 2.jpeg" imageClasses="mainImage centered" />
                                </td>
                            </tr>
                        </table>
                        <p>
                            Here at Hunter PCs, we know that the best PCs are designed to run games smooth as butter. That's why we've been working hard to deliver you the 
                            best gaming experience at the lowest price. <br/>We make all our computers with high end components from trusted manufacturers.
                        </p>
                        <Link to='/pcsMain'>
                            <h3>
                                Browse all gaming PCs  ⟶
                            </h3>
                        </Link>
                    </div>

                    <div className="dividerLine"></div>

                    {/*VIDEO OF GAMEPLAY SECTION*/}
                    <div className="outofPurple">
                        <h1>
                            Play your favourite titles, no sweat
                        </h1>
                        <video autoPlay loop loading="lazy" alt="loading..." controls>
                            <source src={gamesCompilationVideo} type="video/mp4" />
                        </video>
                    </div>

                    <div className="dividerLine"></div>

                    {/*DESIGN YOUR OWN PC SECTION*/}
                    <div>
                        <h1>
                            Design your own, custom build
                        </h1>
                        <table>
                            <thead>
                                <tr>
                                    <td>
                                        <Image imagePath="images/image of pc.jpeg" imageClasses="mainImage centered" />
                                    </td>
                                    <td style={{width: '40%'}}>
                                        <h2 className="alignLeft">
                                            Build your dreams
                                        </h2>
                                    </td>
                                </tr>
                            </thead>
                        </table>
                        <p>
                            Need that specific PC you've always wanted? Well you're in luck: here at Hunter PCs, you can design your own custom PC
                            and have one of our experts assemble it for you. We'll even deliver it straight to your door as well
                        </p>
                        <Link to='/customPcs'>
                            <h3>
                                Pick your perfect parts ⟶
                            </h3>
                        </Link>
                    </div>

                    <div className="dividerLine"></div>

                    {/*QUALITY GUARANTEED SECTION*/}
                    <div>
                        <h1>
                            Quality guaranteed
                        </h1>
                        <table>
                            <thead>
                                <tr>
                                    <td style={{width: '40%'}}>
                                        <h2 className="alignRight">
                                            No expense spared
                                        </h2>
                                    </td>
                                    <td>
                                        <Image imagePath="images/gamingSetupTall2.jpeg" imageClasses="mainImage centered" imageStyles={{width: '85%'}} />
                                    </td>
                                </tr>
                            </thead>
                        </table>
                        <p>
                            We guarantee no expense spared. That means every one of your PC's components is made by branded and trusted manufacturers.
                            And not just that, we will also thoroughly test your build to make sure you get the maximum performance possible
                        </p>
                        <Link to='/support'>
                            <h3>
                                Learn more about our no expense spared guarantee ⟶
                            </h3>
                        </Link>
                    </div>
                </React.Fragment>
            );
        };
    };
};

export default Home;