import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {isMobile} from '../index.js';
import TrustpilotTrustBox from './multiPageComponents/trustpilotWidget/trustpilotWidget.jsx';

class Footer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            logoImageWidth: isMobile() ? '60%' : '25%',
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
                                    <img src='https://firebasestorage.googleapis.com/v0/b/hunter-pcs-firebase.appspot.com/o/images%2FgamingSetupTall1.jpeg?alt=media&token=032bf5f9-4dc2-4697-bb8d-ee8fdf61aa77'
                                     className="mainImage centered" style={{width: '80%', marginLeft: 0}} alt="loading..." />
                                </td>
                            </tr>
                        </thead>
                    </table>

                    {/*follow us and trustpilot box*/}
                    <table style={{width: '50%', margin: 'auto'}}>
                        <thead>
                            <tr>
                                <td>
                                    <a href='https://www.instagram.com/hunterpcsuk/?igsh=MW1yYW5sb3o0N2tvYg%3D%3D&utm_source=qr' target="_blank">
                                        <h3>
                                            Follow us ⟶
                                        </h3>
                                    </a>
                                </td>
                                <td>
                                    <TrustpilotTrustBox />
                                </td>
                            </tr>
                        </thead>
                    </table>
                </div>

                {/*final H logo*/}
                <img src='https://firebasestorage.googleapis.com/v0/b/hunter-pcs-firebase.appspot.com/o/images%2FhunterPcsLogo.png?alt=media&token=c7353b9c-aa81-4882-ac8f-cfdc9dcc61ea'
                    className="centered" style={{width: this.state.logoImageWidth}} alt='loading...' />
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
                                <Link to='/support' state={{targetLocation: infoLink}}>
                                    <h3 style={{padding: 0}}>
                                        {frontendLinkName}
                                    </h3>
                                </Link>
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