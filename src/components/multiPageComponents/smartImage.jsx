import React, {Component} from 'react';
import firebaseInstance from '../../classes/firebase.js';
import {getDownloadURL, ref} from 'firebase/storage';

/**
 * @param {string} imageURL the URL of the image
 * @param {string} imagePath the path of the image
 * @param {string} imageClasses optional image classes
 * @param {string} imageId optional image id
 * @param {object} imageStyles optional image styles 
 */

class SmartImage extends Component {

    constructor(props) {
        super(props);

        //props will be passed down which specify image properties
        this.state = {
            imageURL: this.props.imageURL, 
            imagePath: this.props.imagePath,
            imageClasses: this.props.imageClasses,
            imageStyles: this.props.imageStyles,
            imageId: this.props.imageId,
        };

        //throw an error if neither an imageURL nor an imagePath is specified, also throw an error if both are specified
        if (!this.props.imageURL && !this.props.imagePath) {
            throw new Error('Either an imageURL or an imagePath must be specified.');
        }
        else if (this.props.imageURL && this.props.imagePath) {
            throw new Error('Only one of imageURL or imagePath can be specified.');
        };
    };

    componentDidMount() {
        
        //if an imagePath was provided, fetch the image url from firebase
        if (this.props.imagePath) {
            const storage = firebaseInstance.getFirebaseStorage;
            getDownloadURL(ref(storage, this.props.imagePath)).then((url) => {
                this.setState({imageURL: url});
            });
        };
    };

    render() {
        return (
            <img src={this.state.imageURL} className={this.state.imageClasses || null} style={this.state.imageStyles || null} id={this.state.imageId || null} />
        );
    };
};

export default SmartImage;