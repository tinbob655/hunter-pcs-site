import React from 'react';
import { buttonExpand, isMobile } from '../../index.js';
import { useNavigate } from 'react-router-dom';

function SlidingButton({id, imgSrc, linkLocation, textContent, ssIndex, ssValue}) {

    const navigate = useNavigate();

    return(
        <React.Fragment>
            <button id={id+'button'} type="button" className="linkButton"

                onMouseOver={function() {buttonExpand(id)}}
                onClick={function() {ssValue ? (sessionStorage.setItem(ssIndex, ssValue)) : console.log('No value to store in session storage');
                if (isMobile()) {
                    setTimeout(() => {
                        navigate(linkLocation);
                    }, 1500);
                }
                else {
                    navigate(linkLocation);
                }}}
                    >

                    <h2 id={id+'title'} className="linkButtonTitle">
                        {textContent}
                    </h2>

                    <div className="linkButtonDivider" id={id+'divider'} ></div>

                    <img src={imgSrc} alt="loading..."
                    style={isMobile() ? {width: '30%', height: 'auto'} : {width: '25%', height: 'auto'}} className="centered"/>
                </button>
        </React.Fragment>
    );
};

export default SlidingButton;