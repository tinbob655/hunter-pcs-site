import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {isMobile} from '../index.js';
import AutoNav from './multiPageComponents/autoNav.jsx';
import TrustpilotTrustBox from './multiPageComponents/trustpilotWidget/trustpilotWidget.jsx';
import Image from './multiPageComponents/image.jsx';

class Footer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            logoImageWidth: isMobile() ? '60%' : '25%',
            navigator: <></>,
        };
    };

    render() {
        return (
            <React.Fragment>
                <div id="footerContent" style={isMobile() ? {marginTop: '5vh'} : {marginTop: '20vh'}}>

                    {/*list of all pages on one collumn and support page sections on the other collumn*/}
                    <div style={{width: '90%', backgroundColor: 'white', height: '5px', margin: 'auto'}}></div>
                    <table style={{width: '99vw', margin: 'auto'}}>
                        <thead>
                            <tr>
                                <td style={isMobile() ? {width: '70%'} : {width: '60%'}}>
                                    <table>
                                        <thead>
                                            <tr>
                                                <td>
                                                    <h2>
                                                        Info
                                                    </h2>
                                                </td>
                                                <td>
                                                    <h2>
                                                        Menu
                                                    </h2>
                                                </td>
                                            </tr>
                                            {this.getFooterLinks()}
                                        </thead>
                                    </table>
                                </td>
                                <td>
                                     <Image imagePath="images/gamingSetupTall1.jpeg" imageClasses="mainImage centered" imageStyles={{width: '80%', marginLeft: 0}} />
                                </td>
                            </tr>
                        </thead>
                    </table>

                    {/*follow us and trustpilot box*/}
                    <table style={isMobile? {width: '80%', margin: 'auto'} : {width: '50%', margin: 'auto'}}>
                        <thead>
                            <tr>
                                <td>
                                    <a href='https://www.instagram.com/hunterpcsuk/?igsh=MW1yYW5sb3o0N2tvYg%3D%3D&utm_source=qr' target="_blank">
                                        <h3>
                                            Follow us ⟶
                                        </h3>
                                    </a>
                                </td>
                                <td style={isMobile? {width: '75%'} : {}}>
                                    <TrustpilotTrustBox/>
                                </td>
                            </tr>
                        </thead>
                    </table>
                </div>

                {/*final H logo*/}
                <Image imagePath="images/hunterPcsLogo.png" imageClasses="centered" imageStyles={{width: this.state.logoImageWidth}} />

                {this.state.navigator}
            </React.Fragment>
        );
    };

    getFooterLinks() {

        {/*method to get the links for the linky section of the footer and return them to the DOM*/}
        let footerLinksHTML = [];
        const informationLinks = ['brandsWeUse', 'returns', 'fraudPrevention', 'warrantyInformation', 'termsOfService', 'privacyPolicy'];
        const menuLinks = ['pcsMain', 'home', 'about', 'support', 'tellAFriend', 'account', 'basket'];

        menuLinks.forEach((link) => {

            let infoLink = informationLinks[menuLinks.indexOf(link)];

            //convert the backend link name to a frontend link name
            if (infoLink) {
                var frontendLinkName = infoLink.replace(/([A-Z])/g, " $1");
                frontendLinkName = frontendLinkName.charAt(0).toUpperCase() + frontendLinkName.slice(1);
            };

            //do the same for the menu link
            let frontendMenuLinkName = link.replace(/([A-Z])/g, " $1");
            frontendMenuLinkName = frontendMenuLinkName.charAt(0).toUpperCase() + frontendMenuLinkName.slice(1);

            if (frontendMenuLinkName === 'Pcs Main') {
                frontendMenuLinkName = 'Gaming PCs';
            };

            //generate this row's HTML
            footerLinksHTML.push(
                <React.Fragment>
                    <tr>
                        {/*INFORMATION SECTION*/}
                        {infoLink? (
                            <td>
                                <button type="button" onClick={() => {
                                    sessionStorage.setItem('supportPageScroll', infoLink);
                                    this.setState({navigator: null});
                                    this.setState({navigator: <AutoNav destination='/support' randomHash={Math.random()}/>});
                                }}>
                                    <h3 style={{padding: 0}}>
                                        {frontendLinkName}
                                    </h3>
                                </button>
                            </td>
                        ) : <td></td>}

                        {/*MENU SECTION*/}
                        <td>
                            <Link to={'/'+link}>
                                <h3 style={{padding: 0}}>
                                    {frontendMenuLinkName}
                                </h3>
                            </Link>
                        </td>
                    </tr>
                </React.Fragment>
            );
        });

        //return the generated HTML
        return footerLinksHTML;
    };
};

export default Footer;