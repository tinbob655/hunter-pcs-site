import React, {useEffect, useState} from 'react';
import {getDownloadURL, ref, getStorage} from 'firebase/storage';

export default function Image({imagePath, imageClasses, imageStyles}) {

    const [URL, setURL] = useState('');

    useEffect(() => {
        //get the image url
        const storage = getStorage();
        getDownloadURL(ref(storage, imagePath)) 
        .then((url) => {
            setURL(url);
        })
    });

    //return the iamge back to main
    return (
        <img src={URL} className={imageClasses} style={imageStyles ? imageStyles : {}} alt="loading..." />
    );
};