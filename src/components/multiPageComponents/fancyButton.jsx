import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import MobileProvider from '../../context/mobileContext';

/**
 * @param {string} title the main text of the button
 * @param {string} destination the destination for the button starting '/' (if wanted)
 * @param {function} action the action for the button to do (if wanted)
 * @param {number} widthOverridePercentage the new width of the button  (if wanted)
 */

class FancyButton extends Component {

    static contextType = MobileProvider;

    constructor(props) {
        super(props);

        //save props to state
        this.state = {
            title: this.props.title,
            destination: this.props.destination || null,
            action: this.props.action || null,
            uniqueId: Math.random()*Math.random().toString(),
            isMobile: this.context || undefined,
            widthOverride: this.props.widthOverridePercentage,
        };

        //if neither an action not a destination was supplied, throw an error
        if (!this.props.action && !this.props.destination) {
            throw new Error('Either an action or a destination must be provided.');
        }
        
        //if both an action and a destination were provided, throw an error
        else if (this.props.action && this.props.destination) {
            throw new Error('Only one of action or destination can be provided.');
        };
    };

    componentDidMount() {
        this.setState({isMobile: this.context});

        //if mobile, add a delay to the beginning of the action function
        if (this.context && this.state.action) {

        }
    };

    render() {
        return (
            <React.Fragment>
                <div className="fancyButtonWrapper" id={`${this.state.uniqueId}Wrapper`} onMouseOver={() => {this.buttonHovered()}} onMouseLeave={() => {this.buttonUnhovered()}} style={this.state.widthOverride ? {width: `${this.state.widthOverride}%`} : {}}>
                    {this.state.action ? (
                        <React.Fragment>

                            {/*if an action was provided, wrap the code in a button which does that action on click*/}
                            <button type="button" onClick={() => {this.state.action()}} style={{width: '100%'}}>
                                <h2 className="fancyButtonTitle" id={`${this.state.uniqueId}Title`}>
                                    {this.state.title}
                                    <span className="fancyButtonArrow" id={`${this.state.uniqueId}Arrow`}>⟶</span>
                                </h2>
                            </button>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            
                            {/*if an action was not provided, then a destination must have been provided, wrap the code in a link to that destination*/}
                            <Link to={this.state.destination}>
                                <h2 className="fancyButtonTitle" id={`${this.state.uniqueId}Title`}>
                                    {this.state.title}
                                    <span className="fancyButtonArrow" id={`${this.state.uniqueId}Arrow`}>⟶</span>
                                </h2>
                            </Link>
                        </React.Fragment>
                    )}
                </div>
            </React.Fragment>
        );
    };

    getElements() {

        //for code reusability, return an array of DOM elements to prevent this code being written twice
        const wrapper = document.getElementById(`${this.state.uniqueId}Wrapper`);
        const title = document.getElementById(`${this.state.uniqueId}Title`);
        const arrow = document.getElementById(`${this.state.uniqueId}Arrow`);

        return [wrapper, title, arrow];
    };

    buttonHovered() {

        //when the button is hovered over, play the fancy animations
        const elements = this.getElements();
        elements.forEach((element) => {
            element.classList.add('hovered');
        });
    };

    buttonUnhovered() {

        //when the user's mouse leave the button, play the animations in reverse
        const elements = this.getElements();
        elements.forEach((element) => {
            element.classList.remove('hovered');
        });
    };
};

export default FancyButton;