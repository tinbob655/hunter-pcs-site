import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { isMobile } from '../index.js';
import '../hamburgers.css';
import { convertOutOfCamelCase } from '../index.js';

class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {
            logInImage: sessionStorage.getItem('loggedIn') == 'true' ? 
            'https://firebasestorage.googleapis.com/v0/b/hunter-pcs-firebase.appspot.com/o/images%2FinteractiveElements%2FloggedInSymbol.png?alt=media&token=94582489-6f5b-4204-84df-a7814b97b66a'
            :
            'https://firebasestorage.googleapis.com/v0/b/hunter-pcs-firebase.appspot.com/o/images%2FinteractiveElements%2FaccountIcon.png?alt=media&token=af8b312a-50d4-49cc-b874-010dd0b2201a',
            basketImage: 'https://firebasestorage.googleapis.com/v0/b/hunter-pcs-firebase.appspot.com/o/images%2FinteractiveElements%2FbasketIcon.png?alt=media&token=e2448ce8-e238-45d8-ba6a-f8b87f8b23ac',
        };
    };

    componentDidMount() {

        //only show the header after startup animations
        if (isMobile()) {
            setTimeout(() => {
                document.getElementById('mobileHeader').style.visibility = 'visible';
            }, 1500);
        };

        //check if there is anything in the basket
        let basketArray = [];
        for (let i = 0; i < 100; i++) {
            if (localStorage.getItem('hunterPcsProduct'+i)) {
                basketArray.push(convertOutOfCamelCase(localStorage.getItem('hunterPcsProduct'+i)));
            };
        };
        if (basketArray.length > 0) {
            this.setState({basketImage: 'https://firebasestorage.googleapis.com/v0/b/hunter-pcs-firebase.appspot.com/o/images%2FinteractiveElements%2FbasketIconExclamation.png?alt=media&token=4cf3a924-96ac-4b18-9ecf-e43a6e83201e'})
        }
    };

    render() {

        //desktop header
        if (!isMobile()) {
            document.addEventListener("scroll", (event) => {
                const header = document.getElementById('headerTable');
                if (window.scrollY == 0) {
                    header.style.opacity = 1.0;
                }
                else{
                    header.style.opacity = 0.75;
                }
            });
    
            window.onload = () => {document.getElementById('headerTable').style.opacity = 1.0;}
            return (
                <React.Fragment>
                    <table style={{backgroundColor: '#070707', boxShadow: '0 0 5px 5px #070707', position: 'fixed', top: '0', left: '0', zIndex: '99', height: '100px'}} 
                    className="fadeinWithHover" id="headerTable" >
                        <thead>
                            <tr>
                                {this.getHeaders()}
                            </tr>
                        </thead>
                    </table>
                </React.Fragment>
            );
        }

        //mobile header
        else {
            return (
            <React.Fragment>

                {/*hamburger button*/}
                <button id="headerButton" className="hamburger hamburger--emphatic" type="button"
                onClick={() => {
                    const header = document.getElementById('mobileHeader');
                    const button = document.getElementById('headerButton');
                    const content = document.getElementById('content');

                    button.classList.toggle('is-active');
                    header.classList.toggle('shown');
                    
                    content.addEventListener('click', function openMobileHeader() {
                        header.classList.remove('shown');
                        button.classList.remove('is-active');
                    });
                }}>
                    <span className="hamburger-box">
                        <span className="hamburger-inner"></span>
                    </span>
                </button>

                {/*actual header content*/}
                <div id="mobileHeader" className="hiddenScroll" style={{visibility: 'hidden'}}>
                    {this.getMobileHeaders()}
                </div>
            </React.Fragment>
            );
        };
    };

    getHeaders() {
        function headerHoveredOver(headerId) {

            //edit styles for the dividor line
            const divLine = document.getElementById(headerId+'divLine');
            divLine.classList.add('hovered');

            //edit dtyles for the text (if present)
            const text = document.getElementById(headerId+'text');
            if (headerId != 'Basket' && headerId != 'Log In') {
                text.style.color = '#bb68a5'
            }

            //edit styles for the image (if present)
            else {
                document.getElementById(headerId+'image').style.backgroundColor = '#bb68a5';
            };

            //edit styles for the cell
            const cell = document.getElementById(headerId+'cell');
            cell.style.backgroundColor = '#333333';

            document.getElementById(headerId+'button').onmouseleave = () => {

                //reset styles for the dividor line
                divLine.classList.remove('hovered');

                //reset styles for the text (if present)
                if (headerId != 'Basket' && headerId != 'Log In') {
                    text.style.color = '#606060';
                }

                //reset styles for the image (if present)
                else {
                    document.getElementById(headerId+'image').style.backgroundColor = 'unset';
                };

                //reset styles for the cell
                cell.style.backgroundColor = 'unset';
            };
        };

        let headersHTML = [];
        const frontendHeaders = ['Gaming PCs', 'Home', 'About', 'Support', 'Tell a Friend', 'Log In', 'Basket']
        const backendHeaders = ['/pcsMain', '/', '/about', '/support', '/tellAFriend', '/logIn', '/basket'];

        frontendHeaders.forEach((header) => {
            headersHTML.push(
                <React.Fragment>
                    <td id={header+'cell'} style={{transitionProperty: 'background-color', transitionDuration: '0.33s', borderRadius: '5px'}}>
                        <div style={{marginTop: '10%'}}>
                            <Link to={backendHeaders[frontendHeaders.indexOf(header)]} id={header+'button'}>
                                <h3 style={{padding: '0', marginTop: '0', marginBottom: '0', fontSize: '20px', whiteSpace: 'nowrap', color: '#606060'}} 
                                onMouseOver={function() {headerHoveredOver(header)}} id={header+'text'} >

                                    {/*RETURN TEXT FOR TEXT HEADRS, AND RESPECTIVE IMAGES FOR THE Log in AND BASKET PAGES*/}
                                    {header != 'Basket' && header != 'Log In' ? header : (
                                        header == 'Basket' ? <img src={this.state.basketImage}
                                        style={{height: '50px', transitionProperty: 'background-color', transitionDuration: '1s'}}
                                        className="centered rounded" id={header+'image'} />
                                        :
                                        <img src={this.state.logInImage}
                                        style={{height: '50px', transitionProperty: 'background-color', transitionDuration: '1s'}}
                                        className="centered rounded" id={header+'image'} alt="loading..."/>
                                    )}
                                </h3>
                            </Link>
                        </div>
                        <div className="cleanLinkButtonDivider" id={header+'divLine'} style={{marginTop: '10%'}}></div>
                    </td>
                </React.Fragment>
            );
        });

        return headersHTML;
    };

    getMobileHeaders() {
        const frontendHeaders = ['Gaming PCs', 'Home', 'About', 'Support', 'Tell a Friend', 'Log In', 'Basket']
        const backendHeaders = ['/pcsMain', '/', '/about', '/support', '/tellAFriend', '/logIn', '/basket'];

        let headersHTML = [];

        backendHeaders.forEach((backendHeader) => {
            headersHTML.push (
                <React.Fragment>
                    <div style={{width: '75%', marginTop: '3vh'}}>
                        <Link to={backendHeader}>
                            <h3>
                                {frontendHeaders[backendHeaders.indexOf(backendHeader)]}
                            </h3>
                        </Link>
                    </div>
                </React.Fragment>
            );
        });

        return headersHTML;
    };
};

export default Header;