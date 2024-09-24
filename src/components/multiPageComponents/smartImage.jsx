import React, {Component} from 'react';
import firebaseInstance from '../../classes/firebase.js';
import {getDownloadURL, ref} from 'firebase/storage';

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

    render() {
        return (
            <img src={this.fetchImage()} className={this.state.imageClasses || null} style={this.state.imageStyles || null} id={this.state.imageId || null} />
        );
    };

    fetchImage() {

        //method to either return the image url if it already exists, or fetch one from firebase
        if (this.state.imageURL) {
            return this.state.imageURL;
        }
        else {

            //get image url from image page and firestore
            const storage = firebaseInstance.getFirebaseStorage();
            getDownloadURL(ref(storage, this.state.imagePath)).then((url) => {
                return url;
            });
        };
    };
};

export default SmartImage;