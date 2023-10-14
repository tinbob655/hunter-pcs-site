import React, {Component} from 'react';
import { changePage } from '../index.js';

class Header extends Component {

    render() {
        return (
            <React.Fragment>
                <table style={{backgroundColor: '#070707', boxShadow: '0 0 5px 5px #070707', position: 'fixed', top: '0', left: '0', zIndex: '99'}} className="fadeinWithHover">
                    <thead>
                        <tr>
                            {this.getHeaders()}
                        </tr>
                    </thead>
                </table>
            </React.Fragment>
        );
    };

    getHeaders() {
        function headerHoveredOver(headerId) {

            //edit styles for the dividor line
            const divLine = document.getElementById(headerId+'divLine');
            divLine.classList.add('hovered');

            //edit dtyles for the text (if present)
            const text = document.getElementById(headerId+'text');
            if (headerId != 'Basket' && headerId != 'Account') {
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
                if (headerId != 'Basket' && headerId != 'Account') {
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
        const frontendHeaders = ['Gaming Pcs', 'Home', 'About', 'Support', 'Tell a Friend', 'Basket', 'Account']
        const backendHeaders = ['gamingPcs', 'home', 'about', 'support', 'referAFriend', 'basket', 'account'];

        frontendHeaders.forEach((header) => {
            headersHTML.push(
                <React.Fragment>
                    <td id={header+'cell'} style={{transitionProperty: 'background-color', transitionDuration: '0.33s', borderRadius: '5px'}}>
                        <button type="button" onClick={function() {changePage(backendHeaders[frontendHeaders.indexOf(header)])}} id={header+'button'}>
                            <h3 style={{padding: '0', marginTop: '0', marginBottom: '0', fontSize: '20px', whiteSpace: 'nowrap', color: '#606060'}} 
                            onMouseOver={function() {headerHoveredOver(header)}} id={header+'text'} >

                                {/*RETURN TEXT FOR TEXT HEADRS, AND RESPECTIVE IMAGES FOR THE ACCOUNT AND BASKET PAGES*/}
                                {header != 'Basket' && header != 'Account' ? header : (
                                    header == 'Basket' ? <img src={'https://firebasestorage.googleapis.com/v0/b/hunter-pcs-firebase.appspot.com/o/images%2FinteractiveElements%2FaccountIcon.png?alt=media&token=af8b312a-50d4-49cc-b874-010dd0b2201a'}
                                    style={{height: '50px', transitionProperty: 'background-color', transitionDuration: '1s'}}
                                     className="centered rounded" id={header+'image'} />
                                    :
                                    <img src={'https://firebasestorage.googleapis.com/v0/b/hunter-pcs-firebase.appspot.com/o/images%2FinteractiveElements%2FbasketIcon.png?alt=media&token=e2448ce8-e238-45d8-ba6a-f8b87f8b23ac'}
                                    style={{height: '50px', transitionProperty: 'background-color', transitionDuration: '1s'}}
                                    className="centered rounded" id={header+'image'} />
                                )}
                            </h3>
                        </button>
                        <div className="cleanLinkButtonDivider" id={header+'divLine'}></div>
                    </td>
                </React.Fragment>
            );
        });

        return headersHTML;
    };
};

export default Header;