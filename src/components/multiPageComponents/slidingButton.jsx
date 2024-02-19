import React from 'react';
import { buttonExpand, isMobile } from '../../index.js';
import { useNavigate } from 'react-router-dom';
import Image from './image.jsx';

function SlidingButton({id, imgSrc, linkLocation, textContent, ssIndex, ssValue, onClickFunction, customButtonStyles}) {

    const navigate = useNavigate();

    return(
        <React.Fragment>
            <button id={id+'button'} style={customButtonStyles} type="button" className={"linkButton " + (linkLocation === 'productPage' ? 'bigWhenExpanded' : '')}

                onMouseOver={function() {buttonExpand(id)}}
                onClick={function() {ssValue ? (sessionStorage.setItem(ssIndex, ssValue)) : console.error('No value to store in session storage');

                //only navigate to new page if a link is provided
                if (linkLocation) {
                    if (isMobile()) {
                        setTimeout(() => {
                            navigate(linkLocation);
                        }, 1500);
                    }
                    else {
                        navigate(linkLocation);
                    }}
                else if (onClickFunction) {
                    if (isMobile()) {
                        setTimeout(() => {
                            onClickFunction();
                        });
                    }
                    else {
                        onClickFunction();
                    };
                };
                }}

                    >

                    <h2 id={id+'title'} className="linkButtonTitle">
                        {textContent}
                    </h2>

                    <div className="linkButtonDivider" id={id+'divider'} ></div>

                    <Image imagePath={imgSrc} imageClasses="centered" imageStyles={isMobile? {width: '30%', height: 'auto'} : {width: '25%', height: 'auto'}} />
                </button>
        </React.Fragment>
    );
};

export default SlidingButton;