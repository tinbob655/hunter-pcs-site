import React, {Component} from 'react';
import PageHeader from '../../multiPageComponents/pageHeader.jsx';
import GenericMarkupSection from '../../multiPageComponents/genericMarkupSection.jsx';
import DividerLine from '../../multiPageComponents/dividerLine.jsx';
import FancyButton from '../../multiPageComponents/fancyButton.jsx';
import AutoNav from '../../multiPageComponents/autoNav.jsx';
import firebaseInstance from '../../../classes/firebase.js';
import {getDocs, query, collection} from 'firebase/firestore';
import SmartImage from '../../multiPageComponents/smartImage.jsx';
import MobileProvider from '../../../context/mobileContext.jsx';

class PcsMain extends Component {

    static contextType = MobileProvider;

    constructor(props) {
        super(props);
        
        //an auto nav is required for navigation to the product page as params are required to be passed in (and it is not being used in the usual sense of a component, rather a page)
        this.state = {
            autoNav: <></>,
            products: ['solid', 'strong', 'powerful', 'supreme', 'dominant'],
            fancyButtonsHTML: [<></>]*5,
            isMobile: this.context,
        };
    };

    componentDidMount() {

        //set isMobile
        this.setState({
            isMobile: this.context,
        });

        //fetch the price of each product from firestore
        let productSubheadings = {};

        const firestore = firebaseInstance.getFirebaseFirestore;
        const docQuery = query(collection(firestore, 'products'));
        getDocs(docQuery).then((docSnap) => {
            docSnap.forEach((doc) => {
                
                //repeating for each document found in the 'products' collection in firestore
                //get the name of the document
                const name = doc.id.replace('Pc', '');
                
                //save the prices of each product to the productSubheadings map
                productSubheadings[name] = doc.data().subheaderDescription;
            });

            //generate html for each fancy button
            let fancyButtonsHTML = [];
            this.state.products.forEach((product) => {
    
                //capitalise the first letter of the product name for the frontend
                const frontendProductName = product.substring(0, 1).toUpperCase() + product.substring(1);
    
                //add the HTML to the array
                fancyButtonsHTML.push(
                    <React.Fragment>
                        <FancyButton widthOverridePercentage={85} title={frontendProductName} action={() => {
                            sessionStorage.setItem('product', product);
                            this.setState({
                                autoNav: <AutoNav destination={'/productPage'} />
                            });
                        }} />
                        <p className="noVerticalSpacing" style={{marginBottom: this.context ? '60px' : '45px', marginTop: '15px', fontSize: '17px'}}>
                            {productSubheadings[product]}
                        </p>
                    </React.Fragment>
                );
    
                //save the html array to state
                this.setState({
                    fancyButtonsHTML: fancyButtonsHTML,
                });
            });
        });

    };

    render() {

        //desktop pcsMain page
        if (!this.state.isMobile) {
            return (
                <React.Fragment>
                    <PageHeader heading="Gaming PCs" subheading="Hand crafted and ready to go" />
    
                    {/*get your dream setup section*/}
                    <div>
                        <GenericMarkupSection
                            heading="Get your dream setup"
                            paragraph="Our gaming pcs are designed with a passion for quality, meaning whatever you choose, you can be sure that your PC will get you in the game. We have models ranging from the highest performing, to the most budget effective. Whatever your needs, satisfy them here."
                            left={true}
                            imagePath="images/gamingSetupWIDE1.jpeg" />
                    </div>
    
                    <DividerLine purple={false} />
    
                    {/*buttons for each model section*/}
                    <div className="intoPurple">
                        <h2>
                            For high quality Gaming PCs, you're in the right place!
                        </h2>
                        <table>
                            <thead>
                                <tr>
                                    <td>
                                        {this.state.fancyButtonsHTML[0]}
                                    </td>
                                    <td>
                                        {this.state.fancyButtonsHTML[1]}
                                    </td>
                                    <td>
                                        {this.state.fancyButtonsHTML[2]}
                                    </td>
                                </tr>
                            </thead>
                        </table>
                        <table style={{width: '66%', marginLeft: 'auto', marginRight: 'auto'}}>
                            <thead>
                                <tr>
                                    <td>
                                        {this.state.fancyButtonsHTML[3]}
                                    </td>
                                    <td>
                                        {this.state.fancyButtonsHTML[4]}
                                    </td>
                                </tr>
                            </thead>
                        </table>
                    </div>
    
                    <DividerLine purple={true} />
    
                    {/*pick your perfect model section*/}
                    <div className="outOfPurple">
                        <table>
                            <thead>
                                <tr>
                                    <td style={{width: '55%'}}>
                                        <h2 className="alignLeft">
                                            Pick your perfect model
                                        </h2>
                                        <p>
                                            We understand it can be hard to select the ideal PC from our range of prebuilt PCs. Need help? Look no further:
                                        </p>
                                        
                                        {/*solid*/}
                                        <h2 style={{marginBottom: 0, paddingBottom: 0}} className="alignRight">
                                            Solid:
                                        </h2>
                                        <p style={{marginTop: 0, marginBottom: '20px'}} className="alignRight">
                                            Our solid model is aimed at gamers who wish to play most games in 1080p with high FPS.
                                        </p>
    
                                        {/*strong*/}
                                        <h2 style={{marginBottom: 0, paddingBottom: 0}} className="alignLeft">
                                            Strong:
                                        </h2>
                                        <p style={{marginTop: 0, marginBottom: '20px'}} className="alignLeft">
                                            Our strong model is for gamers who wish to play all games easily in 1080p with very high FPS, and many single-player games in 1440p with lower FPS.
                                        </p>
    
                                        {/*powerful*/}
                                        <h2 style={{marginBottom: 0, paddingBottom: 0}} className="alignRight">
                                            Powerful:
                                        </h2>
                                        <p style={{marginTop: 0, marginBottom: '20px'}} className="alignRight">
                                            Our powerful model is aimed at those who wish to easily play all games in 1440p  with high FPS as well as have high aesthetic build quality.
                                        </p>
    
                                        {/*supreme*/}
                                        <h2 style={{marginBottom: 0, paddingBottom: 0}} className="alignLeft">
                                            Supreme:
                                        </h2>
                                        <p style={{marginTop: 0, marginBottom: '20px'}} className="alignLeft">
                                            Our supreme model is designed with gamers who want to play games in 4K with an RGB flair as well as never have to worry about storage space or cooling whatsoever.
                                        </p>
    
                                        {/*dominant*/}
                                        <h2 style={{marginBottom: 0, paddingBottom: 0}} className="alignRight">
                                            Dominant:
                                        </h2>
                                        <p style={{marginTop: 0, marginBottom: '20px'}} className="alignRight">
                                            Our dominant model is curated for gamers with a passion for quality, easily running any game on max settings in 4K resolution without breaking a sweat. For dominating the competition, this is the perfect solution.
                                        </p>
                                    </td>
                                    <td>
                                        <SmartImage imageClasses="mainImage" imagePath="images/gamingPcVTall.png" imageStyles={{maxHeight: 'unset'}} />
                                    </td>
                                </tr>
                            </thead>
                        </table>
                    </div>
    
                    <DividerLine purple={false} />
    
                    {/*custom pcs section*/}
                    <div>
                        <GenericMarkupSection
                            heading="Build your dreams"
                            paragraph="Using our custom PC creator, you can design the PC of your dreams online, right now. Choose from a massive range of available parts and we'll be in touch to verify whether your build works, giving you peace of mind and and easy purchase."
                            linkText="Click here to get started ⟶"
                            linkDestination="/customPCs"
                            left={true}
                            imagePath="images/motherboardTall.jpeg" />
                    </div>
    
                    {/*for programmatic navigation*/}
                    {this.state.autoNav}
                </React.Fragment>
            );
        }

        //mobile pcsMain page
        else {
            return (
                <React.Fragment>
                    <PageHeader heading="Gaming PCs" subheading="Hand crafted and ready to go" />

                    {/*get your dream setup section*/}
                    <div>
                        <GenericMarkupSection
                            heading="Get your dream setup"
                            paragraph="Our gaming pcs are designed with a passion for quality, meaning whatever you choose, you can be sure that your PC will get you in the game. We have models ranging from the highest performing, to the most budget effective. Whatever your needs, satisfy them here."
                            left={true}
                            imagePath="images/gamingSetupWIDE1.jpeg" />
                    </div>

                    <DividerLine purple={false} />

                    {/*button for each model section*/}
                    <div className="intoPurple" style={{paddingBottom: '10px'}}>
                        <h2>
                            For high quality Gaming PCs, you're in the right place!
                        </h2>
                        {this.state.fancyButtonsHTML}
                    </div>

                    <DividerLine purple={true} />

                    {/*pick your perfect model section*/}
                    <div className="outOfPurple">
                        <table>
                            <thead>
                                <tr>
                                    <td style={{width: '40%'}}>
                                        <h2 className="alignRight">
                                            Pick your perfect model
                                        </h2>
                                    </td>
                                    <td>
                                        <SmartImage imageClasses="mainImage" imagePath="images/gamingPcVTall.png" />
                                    </td>
                                </tr>
                            </thead>
                        </table>
                        <p>
                            We understand it can be hard to select the ideal PC from our range of prebuilt PCs. Need help? Look no further:
                        </p>

                        {/*solid*/}
                        <h2 style={{marginBottom: 0, paddingBottom: 0}} className="alignRight">
                            Solid:
                        </h2>
                        <p style={{marginTop: 0, marginBottom: '20px'}} className="alignRight">
                            Our solid model is aimed at gamers who wish to play most games in 1080p with high FPS.
                        </p>

                        {/*strong*/}
                        <h2 style={{marginBottom: 0, paddingBottom: 0}} className="alignLeft">
                            Strong:
                        </h2>
                        <p style={{marginTop: 0, marginBottom: '20px'}} className="alignLeft">
                            Our strong model is for gamers who wish to play all games easily in 1080p with very high FPS, and many single-player games in 1440p with lower FPS.
                        </p>

                        {/*powerful*/}
                        <h2 style={{marginBottom: 0, paddingBottom: 0}} className="alignRight">
                            Powerful:
                        </h2>
                        <p style={{marginTop: 0, marginBottom: '20px'}} className="alignRight">
                            Our powerful model is aimed at those who wish to easily play all games in 1440p  with high FPS as well as have high aesthetic build quality.
                        </p>

                        {/*supreme*/}
                        <h2 style={{marginBottom: 0, paddingBottom: 0}} className="alignLeft">
                            Supreme:
                        </h2>
                        <p style={{marginTop: 0, marginBottom: '20px'}} className="alignLeft">
                            Our supreme model is designed with gamers who want to play games in 4K with an RGB flair as well as never have to worry about storage space or cooling whatsoever.
                        </p>

                        {/*dominant*/}
                        <h2 style={{marginBottom: 0, paddingBottom: 0}} className="alignRight">
                            Dominant:
                        </h2>
                        <p style={{marginTop: 0, marginBottom: '20px'}} className="alignRight">
                            Our dominant model is curated for gamers with a passion for quality, easily running any game on max settings in 4K resolution without breaking a sweat. For dominating the competition, this is the perfect solution.
                        </p>
                    </div>

                    <DividerLine purple={false} />

                    {/*custom pcs section*/}
                    <div>
                        <GenericMarkupSection
                            heading="Build your dreams"
                            paragraph="Using our custom PC creator, you can design the PC of your dreams online, right now. Choose from a massive range of available parts and we'll be in touch to verify whether your build works, giving you peace of mind and and easy purchase."
                            linkText="Click here to get started ⟶"
                            linkDestination="/customPCs"
                            left={true}
                            imagePath="images/motherboardTall.jpeg" />
                    </div>

                    {/*for programmatic navigation*/}
                    {this.state.autoNav}
                </React.Fragment>
            );
        };
    };
};

export default PcsMain;