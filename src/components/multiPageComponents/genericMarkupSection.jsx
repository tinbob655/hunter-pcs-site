import React, {Component} from 'react';
import SmartImage from './smartImage.jsx';
import { Link } from 'react-router-dom';
import MobileProvider from '../../context/mobileContext.jsx';

/**
 * @param {string} heading main section heading
 * @param {string} paragraph section paragraph
 * @param {boolean} left true if the image is on the left
 * @param {string} imageURL the url of the image
 * @param {string} imagePath the firebase storage path of the image
 * @param {string} buttonText the text to be displayed if there is a button
 * @param {function} buttonAction the function to call when the button is clicked
 * @param {string} linkText the text to be displayed if there is a link
 * @param {string} linkDestination the destination for the link, starting with '/'
 */

class GenericMarkupSection extends Component {

    static contextType = MobileProvider;

    constructor(props) {
        super(props);

        //props which define the actual content will be passed down from parent
        this.state = {
            heading: this.props.heading,
            paragraph: this.props.paragraph,
            left: this.props.left,
            imageURL: this.props.imageURL,
            imagePath: this.props.imagePath,
            buttonText: this.props.buttonText,
            buttonAction: this.props.buttonAction,
            linkText: this.props.linkText,
            linkDestination: this.props.linkDestination,
            isMobile: this.context,
        };

        //throw an error if neither an imageURL nor an imagePath is provided
        if (!this.props.imageURL && !this.props.imagePath) {
            throw new Error('An image URL or path must be provided');
        };

        //throw an error is both a button and a link are requested
        if (this.props.buttonAction && this.props.linkDestination) {
            throw new Error('Either a button or a link can be provided, not both.');
        };
    };

    componentDidMount() {
        this.setState({isMobile: this.context});
    };

    render() {
        if (this.state.left) {

            //image on left, content on right
            return (
                <React.Fragment>
                    <table>
                        <thead>
                            <tr>
                                <td style={{width: this.state.isMobile ? '60%' : '45%'}}>
                                    <SmartImage imagePath={this.state.imagePath || undefined} imageURL={this.props.imageURL || undefined} imageClasses="mainImage centered" alt="IMAGE" />
                                </td>
                                <td>
                                    <h2 className="alignLeft">
                                        {this.state.heading}
                                    </h2>
                                    {this.state.isMobile ? (
                                        <></>
                                    ) : (
                                        <p className="alignRight" style={{whiteSpace: 'pre-wrap'}}>
                                            {this.state.paragraph}
                                        </p>
                                    )}

                                    {/*if there was a button, add it*/}
                                    {this.state.buttonText && !this.state.isMobile ? (
                                        <React.Fragment>
                                            <button onClick={() => {this.state.buttonAction()}} type="button">
                                                <h3>
                                                    {this.state.buttonText}
                                                </h3>
                                            </button>
                                        </React.Fragment>
                                    ) : <React.Fragment></React.Fragment>}

                                    {/*if there was a link, add it*/}
                                    {this.state.linkText && !this.state.isMobile ? (
                                        <React.Fragment>
                                            <Link to={this.state.linkDestination}>
                                                <h3>
                                                    {this.state.linkText}
                                                </h3>
                                            </Link>
                                        </React.Fragment>
                                    ) : <React.Fragment></React.Fragment>}
                                </td>
                            </tr>
                        </thead>
                    </table>

                    {/*paragraph for mobile*/}
                    {this.state.isMobile ? (
                        <React.Fragment>
                            <p style={{whiteSpace: 'pre-wrap'}}>
                                {this.state.paragraph}
                            </p>
                        </React.Fragment>
                    ) : <></>}

                    {/*button and link for mobile */}
                    {this.state.isMobile && this.state.buttonText ? (
                        <React.Fragment>
                            <button onClick={() => {this.state.buttonAction()}} type="button">
                                <h3>
                                    {this.state.buttonText}
                                </h3>
                            </button>
                        </React.Fragment>
                    ) : (
                        <React.Fragment></React.Fragment>
                    )}

                    {this.state.isMobile && this.state.linkText ? (
                        <React.Fragment>
                            <Link to={this.state.linkDestination}>
                                <h3>
                                    {this.state.linkText}
                                </h3>
                            </Link>
                        </React.Fragment>
                    ) : <></>}
                </React.Fragment>
            );
        }
        else {

            //content on left, image on right
            return (
                <React.Fragment>
                    <table>
                        <thead>
                            <tr>
                                <td>
                                    <h2 className="alignRight">
                                        {this.state.heading}
                                    </h2>
                                    {this.state.isMobile ? <></> : (
                                        <p className="alignLeft" style={{whiteSpace: 'pre-wrap'}}>
                                            {this.state.paragraph}
                                        </p>
                                    )}

                                    {/*if there was a button, add it*/}
                                    {this.state.buttonText && !this.state.isMobile ? (
                                        <React.Fragment>
                                            <button onClick={() => {this.state.buttonAction()}} type="button">
                                                <h3>
                                                    {this.state.buttonText}
                                                </h3>
                                            </button>
                                        </React.Fragment>
                                    ) : <React.Fragment></React.Fragment>}

                                    {/*if there was a link, add it*/}
                                    {this.state.linkText && !this.state.isMobile ? (
                                        <React.Fragment>
                                            <Link to={this.state.linkDestination}>
                                                <h3>
                                                    {this.state.linkText}
                                                </h3>
                                            </Link>
                                        </React.Fragment>
                                    ) : <React.Fragment></React.Fragment>}
                                </td>
                                <td style={{width: this.state.isMobile ? '60%' : '45%'}}>
                                    <SmartImage imagePath={this.state.imagePath || undefined} imageURL={this.state.imageURL || undefined} imageClasses="mainImage centered" alt="IMAGE"/>
                                </td>
                            </tr>
                        </thead>
                    </table>

                    {/*mobile paragraph*/}
                    {this.state.isMobile ? (
                        <p style={{whiteSpace: 'pre-wrap'}}>
                            {this.state.paragraph}
                        </p>
                    ) : <></>}

                    {/*mobile button and link*/}
                    {this.state.isMobile && this.state.buttonText ? (
                        <button type="button" onClick={() => {this.state.buttonAction()}}>
                            <h3>
                                {this.state.buttonText}
                            </h3>
                        </button>
                    ) : <></>}
                    {this.state.isMobile && this.state.linkText ? (
                        <Link to={this.state.linkDestination}>
                            <h3>
                                {this.state.linkText}
                            </h3>
                        </Link>
                    ) : <></>}
                </React.Fragment>
            );
        };
    };
};

export default GenericMarkupSection;