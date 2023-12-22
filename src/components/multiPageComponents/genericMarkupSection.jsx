import React from 'react';
import {isMobile} from '../../index.js';
import {Link} from'react-router-dom';

function GenericMarkupSection({headingText, subheadingText, paragraphText, linkContent, linkDestination, imgSrc,
     leftBool, customImageStyles, customImageCellStyles, DontShowDividerLineBool}) {

    //make each noteworthy element its own constant
    let heading;
    let subheading;
    let paragraph;
    let image = <img className="mainImage centered" src={imgSrc} style={customImageStyles} />

    if (!isMobile()) {
        heading = <h1 className={leftBool ? 'alignLeft' : 'alignRight'}>{headingText}</h1>
        subheading = <h2 className={leftBool ? 'alignRight' : 'alignLeft'}>{subheadingText}</h2>
        paragraph = <p className={leftBool ? 'alignLeft' : 'alignRight'}>{paragraphText}</p>
    }
    else {
        heading = <h1>{headingText}</h1>
        subheading = <h2 className={leftBool ? 'alignLeft' : 'alignRight'}>{subheadingText}</h2>
        paragraph = <p>{paragraphText}</p>
    }

    //only make the link if requested
    let link
    if (linkContent) {
        link = <Link to={linkDestination}>
            <h3>
                {linkContent}
            </h3>
        </Link>
    }
    else {
        link = <></>
    };

    //desktop markup section
    if (!isMobile()) {
        return (
            <React.Fragment>
                <h1 className={leftBool ? 'alignLeft' : 'alignRight'}>
                    {headingText}
                </h1>
                {leftBool ? (
                    <React.Fragment>
                        <table>
                            <thead>
                                <tr>
                                    <td style={customImageCellStyles}>
                                        {image}
                                    </td>
                                    <td>
                                        {subheading}
                                        {paragraph}
                                        {link}
                                    </td>
                                </tr>
                            </thead>
                        </table>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <table>
                            <thead>
                                <tr>
                                    <td>
                                        {subheading}
                                        {paragraph}
                                        {link}
                                    </td>
                                    <td style={customImageCellStyles}>
                                        {image}
                                    </td>
                                </tr>
                            </thead>
                        </table>
                    </React.Fragment>
                )}
            </React.Fragment>
        );
    }

    //mobile markup section
    else {
        return (
            <React.Fragment>
                {heading}
                <table>
                    <thead>
                        <tr>
                            <td style={leftBool ? {width: '60%'} : {}}>
                                {leftBool ? image: subheading}
                            </td>
                            <td style={leftBool ? {} : {width: '60%'}}>
                                {leftBool ? subheading : image}
                            </td>
                        </tr>
                    </thead>
                </table>
                {paragraph}
                {link}
                {DontShowDividerLineBool ? <></> : <div className="dividerLine"></div>}
            </React.Fragment>
        );
    };
};

export default GenericMarkupSection;