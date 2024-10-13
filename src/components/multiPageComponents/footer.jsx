import React, {useState, useEffect} from 'react';
import DividerLine from './dividerLine.jsx';
import SmartImage from './smartImage.jsx';
import { useLocation } from 'react-router-dom';

export default function Footer() {

    const [aboveBackgroundColor, setAboveBackgroundColor] = useState(null);
    const {pathname} = useLocation();

    useEffect(() => {

        //need to see if the background image of the bottom div of the page is purple or black
        //first step is to get the last element of the page content (not header or footer)
        const pageContent = document.getElementById('pageContentWrapper');
        const lastDiv = pageContent.children[pageContent.children.length - 1];
        let color;

        //only run if the page has content
        if (pageContent && lastDiv) {

            //the page does have content
        
            //check what background color the last element has
            const lastDivClasses = lastDiv.classList.toString();
            const purpleClasses = ['purple', 'intoPurple'];
        
            //if the last div has any of the classes in the array, then it's bottom is purple
            if (purpleClasses.includes(lastDivClasses)) {
        
                //bottom of the last div of the page is purple
                color = 'purple';
            }
            else {
        
                //bottom of the last div of the page is black
                color = 'black';
            };
        }
        else {

            //the page does not have content so assume the footer should be black
            color = 'black';
        };
    
        setAboveBackgroundColor(color);
    }, [pathname]);

    return (
        <div id="footer">
            <DividerLine purple={aboveBackgroundColor == 'purple' ? true : false} key={aboveBackgroundColor} />

            {/*make the background fade to black*/}
            <div className={aboveBackgroundColor == 'purple' ? 'outOfPurple' : ''}>
                <SmartImage imagePath="images/Logo No Background.png" imageStyles={{maxWidth: '50%', width: 'auto', maxHeight: '70vh', marginLeft: 'auto', marginRight: 'auto'}} />
            </div>
        </div>
    );
};