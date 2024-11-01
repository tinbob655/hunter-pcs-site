import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import MobileProvider from '../../context/mobileContext.jsx';
import {Squash as Hamburger} from 'hamburger-react';

class Header extends Component {

    static contextType = MobileProvider;

    constructor(props) {
        super(props);

        this.state = {
            isMobile: this.context,
            hamburgerOpen: false,
        };
    };

    componentDidUpdate(prevProps, prevState) {

        //if the mobile header is opened or closed
        if (prevState.hamburgerOpen != this.state.hamburgerOpen) {
            const header = document.getElementById('headerWrapper');
            const hamburger = document.getElementById('hamburgerWrapper');
            const delay = 75 //time in ms between header and hamburger sliding from side to side

            if (this.state.hamburgerOpen) {

                //hamburger has been opened
                hamburger.classList.add('headerOpen');
                setTimeout(() => {
                    header.classList.add('headerOpen');
                }, delay);
            }
            else {

                //hamburger has been closed
                header.classList.remove('headerOpen');
                setTimeout(() => {
                    hamburger.classList.remove('headerOpen');
                }, delay);
            };
        };
    };

    render() {

        //desktop header
        if (!this.state.isMobile) {
            return(
                <React.Fragment>
                    <div id="headerWrapper">
                        <table style={{height: '100%'}}>
                            <thead>
                                <tr>
                                    {this.getHeaderCells()}
                                </tr>
                            </thead>
                        </table>
                    </div>
                </React.Fragment>
            );
        }

        //mobile header
        else {
            return (
                <React.Fragment>
                    <div id="headerWrapper">

                        {/*actual header content*/}
                        {this.getMobileHeaderCells()}
                    </div>
                    <div id="hamburgerWrapper">
                        <Hamburger toggled={this.state.hamburgerOpen} toggle={() => {this.setState({hamburgerOpen: !this.state.hamburgerOpen})}} duration={0.25} color='#ffffff' rounded hideOutline={true} size={37} />
                    </div>
                </React.Fragment>
            );
        };
    };

    componentDidMount() {
        this.setState({isMobile: this.context});
    };

    getHeaderCells() {
        let headerCellsHTML = [];
        const pages = [
            ['pcsMain', 'Gaming PCs'],
            ['', 'Home'],
            ['about', 'About'],
            ['support', 'Support'],
            ['tellAFriend', 'Tell a Friend'],
            ['account', 'Account'],
            ['basket', 'Basket'],
        ];

        //generate a cell for each page
        pages.forEach((page) => {
            headerCellsHTML.push(
                <React.Fragment>
                    <td className="headerCell" id={`headerCell${pages.indexOf(page)}`}>
                        <Link to={`/${page[0]}`} >
                            <h3 className="headerButton" onMouseOver={() => {this.cellHovered(pages.indexOf(page))}} onMouseLeave={() => {this.cellUnhovered(pages.indexOf(page))}}>
                                {page[1]}
                            </h3>
                        </Link>
                        <div className="headerCellWhiteLine" id={`headerCellWhiteLine${pages.indexOf(page)}`}></div>
                    </td>
                </React.Fragment>
            );
        });

        return headerCellsHTML;
    };

    cellHovered(cellNumber) {

        //when a cell is hovered over, expand the white lin div and change it's background color
        //fetch objects from DOM
        const whiteLine = document.getElementById(`headerCellWhiteLine${cellNumber}`);
        const cell = document.getElementById(`headerCell${cellNumber}`);

        //update styles
        whiteLine.classList.add('shown');
        cell.classList.add('hovered')
    };

    cellUnhovered(cellNumber) {

        //when the mouse leaves a cell, reset it's styles
        //fetch objects from DOM
        const whiteLine = document.getElementById(`headerCellWhiteLine${cellNumber}`);
        const cell = document.getElementById(`headerCell${cellNumber}`);

        //update styles
        whiteLine.classList.remove('shown');
        cell.classList.remove('hovered')
    };

    getMobileHeaderCells() {

        //generates HTML for the header buttons on mobile
        let headerCellsHTML = [];
        const pages = [
            ['pcsMain', 'Gaming PCs'],
            ['', 'Home'],
            ['about', 'About'],
            ['support', 'Support'],
            ['tellAFriend', 'Tell a Friend'],
            ['account', 'Account'],
            ['basket', 'Basket'],
        ];

        //calculate the suitable margins for each button in the header so that it takes just less than 80% of the page height (less than 80% due to margins not being repeated at top and not applied at bottom)
        const marginTopBottom = (Math.floor(80 / pages.length) /2).toString() + 'vh';

        pages.forEach((page) => {
            headerCellsHTML.push(
                <React.Fragment>
                    <Link to={page[0]} onClick={() => {this.setState({hamburgerOpen: false})}}>
                        <h3 style={{marginTop: marginTopBottom, marginBottom: marginTopBottom}}>
                            {page[1]}
                        </h3>
                    </Link>
                </React.Fragment>
            );
        });

        return headerCellsHTML;
    };
};

export default Header;