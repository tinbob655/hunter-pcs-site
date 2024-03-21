import React from 'react';
import {isMobile} from '../../index.js';
import { useNavigate } from 'react-router-dom';
import Image from './image.jsx';

//function for when a button is hovered over
function buttonExpand(id) {
  
    //desktop button
    if (!isMobile()) {
  
      //edit the styles of the button
      const button = document.getElementById(id+'button');
      button.classList.add('expanded');
    
      //make the text slide in from the left
      const text = document.getElementById(id+'title');
      text.classList.add('inMiddle')
    
      //make the arrow spin in
      const arrow = document.getElementById(id+'arrow');
      arrow.classList.add('shown')
    
      //wait until the mouse is no longer over the button and then reset all styles
      button.onmouseleave = () => {
        button.classList.remove('expanded');
        text.classList.remove('inMiddle');
        arrow.classList.remove('shown');
      };
    }
  
    //mobile button
    else {
      //edit the styles of the button
      const button = document.getElementById(id+'button');
      button.classList.add('expanded');
  
      //make the text slide in from the left
      const text = document.getElementById(id+'title');
      text.style.transform = 'translateX(0)';
  
      //make the dividor line spin in
      const dividor = document.getElementById(id+'divider');
      setTimeout(() => {
        dividor.style.opacity = 1.0;
        setTimeout(() => {
          dividor.style.transform = 'scale(10, 5)';
        }, 250)
      }, 500);
  
      //wait until the mouse is no longer over the button and then reset all styles
      button.onmouseleave = () => {
        button.classList.remove('expanded');
        text.style.transform = 'translateX(-15%)'
        setTimeout(() => {
          dividor.style.visibility = 'hidden';
          dividor.style.transform = 'unset';
          setTimeout(() => {
            dividor.style.visibility = 'visible';
          }, 400);
        }, 750);
      };
    }
};

function SlidingButton({id, textAfterArrow, imgSrc, linkLocation, textContent, ssIndex, ssValue, onClickFunction, customButtonStyles}) {

    const navigate = useNavigate();

    if (!isMobile() || !imgSrc) {
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
                            {textContent + '⠀'}
                            <span className="linkButtonArrow" id={id+'arrow'}>
                                ⟶
                            </span>
                            {textAfterArrow}
                        </h2>
                    </button>
            </React.Fragment>
        );
    }
    else {
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
};

export default SlidingButton;