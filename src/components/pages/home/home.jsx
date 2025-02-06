import React, {Component} from 'react';
import PageHeader from '../../multiPageComponents/pageHeader.jsx';
import SmartImage from '../../multiPageComponents/smartImage.jsx';
import './homeStyles.scss';
import FancyButton from '../../multiPageComponents/fancyButton.jsx';
import GenericMarkupSection from '../../multiPageComponents/genericMarkupSection.jsx';
import DividerLine from '../../multiPageComponents/dividerLine.jsx';
import firebaseInstance from '../../../classes/firebase.js';
import {getDownloadURL, ref} from 'firebase/storage';
import MobileProvider from '../../../context/mobileContext.jsx';

class Home extends Component {

    static contextType = MobileProvider;

    constructor(props) {
        super(props);

        this.state = {
            gameplayVideoURL: '',
            isMobile: false,
            preOrderTime: {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
            }
        };
    };

    async componentDidMount() {

        //TEMPORARY
        //get the time left until the NVIDIA 50 series gpus are released
        const releaseDate = new Date('January 30, 2025, 15:00');
        setInterval(() => {
            const currentDate = new Date();
            const timeLeft = new Date(releaseDate - currentDate);
            this.setState({
                preOrderTime: {
                    days: timeLeft.getDate() -1,
                    hours: timeLeft.getHours(),
                    minutes: timeLeft.getMinutes(),
                    seconds: timeLeft.getSeconds(),
                },
            });
        }, 1000);

        //save the date (as well as context) to state
        this.setState({
            isMobile: this.context,
        });

        this.loadVideo();

        //play page rendering animations
        const animatedImage = document.getElementById('animatedHomePageImage');
        const animatedParagraphs = document.querySelectorAll('.homePageAnimatedParagraph');
        const animatedHeader = document.getElementById('homePageAnimatedHeader');

        //function for delays rather that setTimeouts to reduce callback hell
        async function delay(amount) { 
            return new Promise(resolve => setTimeout(resolve, amount));
        };

        //show the main image
        await delay(500);
        animatedImage.classList.add('shown');

        //show the subheading
        await delay(100);
        animatedHeader.classList.add('shown');

        //gradually show the paragraphs
        if (animatedParagraphs && animatedParagraphs.length > 0) {
            await delay(500);
            let index = 0;
            while (index <= animatedParagraphs.length -1) {
                animatedParagraphs[index].classList.add('shown');
                await delay(500);
                index++;
            };
        };
    };

    componentDidUpdate() {
        if (this.state.isMobile && !document.getElementById('animatedParagraphsWrapperDiv').classList.contains('shown')) {
            setTimeout(() => {
                document.getElementById('animatedParagraphsWrapperDiv').classList.add('shown');
            }, 1000);
        };
    };

    render() {

        //desktop home page
        if (!this.state.isMobile) {
            return (
                <React.Fragment>
                    <PageHeader heading="Hunter PCs" subheading="Made to measure gaming PCs" />
                    
                    {/*packing a serious punch section*/}
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <td style={{width: '45%'}}>
                                        <SmartImage imageId="animatedHomePageImage" imageClasses="mainImage" imagePath="images/alt Logo.jpg" />
                                    </td>
                                    <td>
                                        <h2 className="alignRight" id="homePageAnimatedHeader">
                                            Packing a serious punch
                                        </h2>
    
                                        {/*separate paragraphs required so they can be gradually faded in*/}
                                        <p className="homePageAnimatedParagraph" style={{marginLeft: '70%'}}>
                                            Perfect for:
                                        </p>
                                        <p className="homePageAnimatedParagraph" style={{marginLeft: '56%'}}>
                                            -AAA gaming
                                        </p>
                                        <p className="homePageAnimatedParagraph" style={{marginLeft: '42%'}}>
                                            -Ultra low latency
                                        </p>
                                        <p className="homePageAnimatedParagraph" style={{marginLeft: '28%'}}>
                                            -Office and work
                                        </p>
                                        <p className="homePageAnimatedParagraph" style={{marginLeft: '16%'}}>
                                            -Streaming video
                                        </p>
                                        <p className="homePageAnimatedParagraph" style={{marginLeft: '0'}}>
                                            -Just chilling
                                        </p>
                                    </td>
                                </tr>
                            </thead>
                        </table>
                    </div>
    
                    <DividerLine />
    
                    {/*three fancy buttons section*/}
                    <div className="intoPurple">
                        <table>
                            <thead>
                                <tr>
                                    <td>
                                        <FancyButton title="Gaming" destination="/pcsMain" widthOverridePercentage={85} />
                                    </td>
                                    <td>
                                        <FancyButton title="Prebuilt" destination="/pcsMain" widthOverridePercentage={85} />
                                    </td>
                                    <td>
                                        <FancyButton title="Custom" destination='/customPCs' widthOverridePercentage={85} />
                                    </td>
                                </tr>
                            </thead>
                        </table>
                    </div>
    
                    <DividerLine purple={true} />
    
                    {/*perfect for gaming section*/}
                    <div className="purple">
                        <GenericMarkupSection
                         heading="Perfect for gaming"
                         paragraph="Here at Hunter PCs, we know that the best PCs are designed to run games smooth as butter. That's why we've been working hard to deliver you the best gaming experience at the lowest price. We make all our computers with high end components from trusted manufacturers."
                         left={false}
                         imagePath="images/rounded skull 2.jpeg"
                         linkText="Browse all gaming PCs ⟶"
                         linkDestination="/pcsMain" />
                    </div>
    
                    <DividerLine purple={true} />
    
                    {/*video of gameplay section*/}
                    <div className="outOfPurple">
                        <h2 style={{marginTop: 0, marginBottom: 0, paddingBottom: 0}}>
                            Play your favourite titles
                        </h2>
                        <p className="noVerticalSpacing" style={{marginBottom: '10px'}}>
                            Minecraft, Starfield, Red Dead, Sea of Thieves and many more run easily on Hunter PCs.
                        </p>
                        <video autoPlay loop loading="lazy" alt="loading..." controls id="gameplayVideo" key={this.state.gameplayVideoURL}>
                            <source src={this.state.gameplayVideoURL} type="video/mp4"/>
                        </video>
                    </div>
    
                    <DividerLine purple={false} />
    
                    {/*design your own pc section*/}
                    <div>
                        <GenericMarkupSection
                            heading="Design your own, custom build"
                            paragraph="Need that specific PC you've always wanted? Well you're in luck: here at Hunter PCs, you can design your own custom PC and have one of our experts assemble it for you. We'll even deliver it straight to your door as well"
                            left={false}
                            linkText="Design your dream PC ⟶"
                            linkDestination="/customPCs"
                            imagePath="images/image of pc.jpeg" />
                    </div>
    
                    <DividerLine purple={false} />
    
                    {/*no expense spared guarantee*/}
                    <div>
                        <GenericMarkupSection
                        heading="Quality guaranteed"
                        paragraph="We guarantee no expense spared. That means every one of your PC's components is made by branded and trusted manufacturers. And not just that, we will also thoroughly test your build to make sure you get the maximum performance possible."
                        buttonText="Learn more about our no expense spared guarantee ⟶"
                        buttonAction={() => {
                            
                            //button is required to enable support page scrolling
                            sessionStorage.setItem('supportPageScroll', 'noExpenseSpared');
                            window.location.href += 'support';
                        }}
                        left={true}
                        imagePath="images/gamingSetupTall2.jpeg" />
                    </div>
                </React.Fragment>
            );
        }

        //mobile home page
        else {
            return (
                <React.Fragment>
                    <PageHeader heading="Hunter PCs" subheading="Made to measure gaming PCs" />

                    {/*packing a serious punch section*/}
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <td style={{width: '60%'}}>
                                        <SmartImage imageId="animatedHomePageImage" imageClasses="mainImage" imagePath="images/alt Logo.jpg" />
                                    </td>
                                    <td>
                                        <h2 className="alignRight" id="homePageAnimatedHeader">
                                            Packing a serious punch
                                        </h2>
                                    </td>
                                </tr>
                            </thead>
                        </table>
                        <div id="animatedParagraphsWrapperDiv">
                            <p>
                                Perfect for:
                            </p>
                            <p>
                                -AAA gaming
                            </p>
                            <p>
                                -Ultra low latency
                            </p>
                            <p>
                                -Office and work
                            </p>
                            <p>
                                -Streaming video
                            </p>
                            <p>
                                -Just chilling
                            </p>
                        </div>
                    </div>

                    <DividerLine />

                    {/*three fancy buttons section*/}
                    <div className="intoPurple">
                        <FancyButton title="Gaming" destination="/pcsMain" />

                        <FancyButton title="Prebuilt" destination="/pcsMain" />

                        <FancyButton title="Custom" destination='/customPCs' />
                    </div>

                    <DividerLine purple={true} key={this.state.isMobile}/>

                    {/*perfect for gaming section*/}
                    <div className="purple" style={{paddingBottom: '10px'}}>
                    <GenericMarkupSection
                         heading="Perfect for gaming"
                         paragraph="Here at Hunter PCs, we know that the best PCs are designed to run games smooth as butter. That's why we've been working hard to deliver you the best gaming experience at the lowest price. We make all our computers with high end components from trusted manufacturers."
                         left={false}
                         imagePath="images/rounded skull 2.jpeg"
                         linkText="Browse all gaming PCs ⟶"
                         linkDestination="/pcsMain" />
                    </div>

                    <DividerLine purple={true} />

                    {/*video of gameplay section*/}
                    <div className="outOfPurple">
                        <h2 style={{marginTop: 0, marginBottom: 0, paddingBottom: 0}}>
                            Play your favourite titles
                        </h2>
                        <p className="noVerticalSpacing" style={{marginBottom: '10px'}}>
                            Minecraft, Starfield, Red Dead, Sea of Thieves and many more run easily on Hunter PCs.
                        </p>
                        <video autoPlay loop loading="lazy" alt="loading..." controls id="gameplayVideo" key={this.state.gameplayVideoURL}>
                            <source src={this.state.gameplayVideoURL} type="video/mp4" />
                        </video>
                    </div>

                    <DividerLine purple={false} key={this.state.isMobile} />

                    {/*design your own pc section*/}
                    <div>
                    <GenericMarkupSection
                            heading="Design your own, custom build"
                            paragraph="Need that specific PC you've always wanted? Well you're in luck: here at Hunter PCs, you can design your own custom PC and have one of our experts assemble it for you. We'll even deliver it straight to your door as well"
                            left={false}
                            linkText="Design your dream PC ⟶"
                            linkDestination="/customPCs"
                            imagePath="images/image of pc.jpeg" />
                    </div>

                    <DividerLine purple={false} />

                    {/*no expense spared section*/}
                    <div>
                        <GenericMarkupSection
                        heading="Quality guaranteed"
                        paragraph="We guarantee no expense spared. That means every one of your PC's components is made by branded and trusted manufacturers. And not just that, we will also thoroughly test your build to make sure you get the maximum performance possible."
                        buttonText="Learn more about our no expense spared guarantee ⟶"
                        buttonAction={() => {
                            
                            //button is required to enable support page scrolling
                            sessionStorage.setItem('supportPageScroll', 'noExpenseSpared');
                            window.location.href += 'support';
                        }}
                        left={true}
                        imagePath="images/gamingSetupTall2.jpeg" />
                    </div>
                </React.Fragment>
            );
        };
    };

    loadVideo() {

        //by using an intersection observer, we can detect when the gameplay video is actually seen by the user.
        //This means we are able to only load the video once it is visible and thus reduce firebase storage usage.
        new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.intersectionRatio > 0) {
                    
                    //the element is visible
                    //fetch the video from firebase storage
                    const storage = firebaseInstance.getFirebaseStorage;
                    getDownloadURL(ref(storage, 'gameplayVideos/HunterPcs all games compilation.mp4')).then((url) => {
                        this.setState({gameplayVideoURL: url});
                    });

                    //destroy the observer so it does not fire unless page is changed
                    observer.disconnect();
                };
            });
        }).observe(document.getElementById('gameplayVideo'));
    };
};

export default Home;