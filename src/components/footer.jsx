import React, {Component} from 'react';
import { changePage } from '../index.js';
import {isMobile} from '../index.js';

class Footer extends Component {

    render() {
        return (
            <React.Fragment>
                <div id="footerContent" style={isMobile() ? {marginTop: '5vh'} : {marginTop: '20vh'}}>
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
                </div>

                <img src='https://firebasestorage.googleapis.com/v0/b/hunter-pcs-firebase.appspot.com/o/images%2FhunterPcsLogo.png?alt=media&token=c7353b9c-aa81-4882-ac8f-cfdc9dcc61ea'
                    className="centered" style={{width: '25%', margin: 'auto', marginTop: '5vh'}} />
            </React.Fragment>
        );
    };

    getFooterLinks() {
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

            if (frontendMenuLinkName == 'Pcs Main') {
                frontendMenuLinkName = 'Gaming Pcs';
            };

            //generate this row's HTML
            footerLinksHTML.push(
                <React.Fragment>
                    <tr>
                        {/*INFORMATION SECTION*/}
                        {infoLink? (
                            <td>
                                <button type="button" onClick={function() {
                                    sessionStorage.setItem('supportPageScroll', infoLink);
                                    changePage('support');
                                }}>
                                    <h3 style={{padding: 0}}>
                                        {frontendLinkName}
                                    </h3>
                                </button>
                            </td>
                        ) : <td></td>}

                        {/*MENU SECTION*/}
                        <td>
                            <button type="button" onClick={function() {changePage(link)}}>
                                <h3 style={{padding: 0}}>
                                    {frontendMenuLinkName}
                                </h3>
                            </button>
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