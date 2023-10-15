import React from 'react';
import { buttonExpand, changePage } from '../index.js';

function SlidingButton({id, imgSrc, linkLocation, textContent}) {
    return(
        <React.Fragment>
            <button id={id+'button'} onClick={function() {changePage(linkLocation)}} type="button" className="linkButton"
                onMouseOver={function() {buttonExpand(id)}}>
                    <h2 id={id+'title'} className="linkButtonTitle">
                        {textContent}
                    </h2>
                    <div className="linkButtonDivider" id={id+'divider'} ></div>
                    <img src={imgSrc}
                    style={{width: '25%', height: 'auto'}} className="centered"/>
                </button>
        </React.Fragment>
    );
};

export default SlidingButton;