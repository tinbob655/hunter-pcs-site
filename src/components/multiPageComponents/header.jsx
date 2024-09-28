import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {

    render() {
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
};

export default Header;