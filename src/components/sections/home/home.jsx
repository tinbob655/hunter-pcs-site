import React, {Component} from 'react';
import { changePage } from '../../../index.js';
import SlidingButton from '../../slidingButton.jsx';

class Home extends Component {

    render() {
        return (
            <React.Fragment>
                {/*PAGE HEADER*/}
                <div>
                    <h1 style={{marginLeft: '50%', textAlign: 'unset'}}>
                        Pcs made to measure
                    </h1>

                    <table>
                        <thead>
                            <tr>
                                <td style={{width: '60%'}}>
                                    <img src="https://firebasestorage.googleapis.com/v0/b/hunter-pcs-firebase.appspot.com/o/images%2Falt%20Logo.jpg?alt=media&token=83dd8d5d-16ec-4f74-bb00-0fb407d8e659"
                                    style={{width: '50vw', height: '50vw', marginLeft: '7.5%', marginRight: 'unset', boxShadow: '0 0 50px 5px #222222', borderRadius: '10px'}}
                                    alt="loading..."/>
                                </td>
                                <td style={{paddingRight: '5%'}}>
                                    <h2 style={{marginRight: '1%', textAlign: 'right'}}>
                                        Packing a serious punch
                                    </h2>
                                    <p style={{textAlign: 'right', marginRight: '15%'}}>
                                        -AAA gaming
                                    </p>
                                    <p style={{textAlign: 'right', marginRight: '20%'}}>
                                        -Ultra low latency
                                    </p>
                                    <p style={{textAlign: 'right', marginRight: '25%'}}>
                                        -Office and work
                                    </p>
                                    <p style={{textAlign: 'right', marginRight: '30%'}}>
                                        Streaming video
                                    </p>
                                    <p style={{textAlign: 'right', marginRight: '40%'}}>
                                        -Just chilling
                                    </p>
                                </td>
                            </tr>
                        </thead>
                    </table>
                </div>

                {/*GAMING, PREBULIT, CUSTOM BUTTONS*/}
                <div className="purpleGrey">
                    <table style={{width: '100%'}}>
                        <thead>
                            <tr>

                                {/*GAMING PCS BUTTON*/}
                                <td style={{width: '33.3%'}}>
                                    <SlidingButton 
                                    id="gamingPcs"
                                    imgSrc='https://firebasestorage.googleapis.com/v0/b/hunter-pcs-firebase.appspot.com/o/images%2Fimage%20of%20pc.jpeg?alt=media&token=057583b8-036a-4ffd-9657-58e010d7e8e8'
                                    linkLocation='pcsMain'
                                    textContent='Gaming' />
                                </td>

                                {/*PREBULIT PCS BUTTON*/}
                                <td style={{width: '33.3%'}}>
                                    <SlidingButton
                                    id="preBuilt"
                                    imgSrc='https://firebasestorage.googleapis.com/v0/b/hunter-pcs-firebase.appspot.com/o/images%2Frainbow%20pc.png?alt=media&token=0e548201-b1c6-4ea6-8efb-bea42aea9bdb'
                                    linkLocation='preBuiltPcs'
                                    textContent='Prebuilt' />
                                </td>

                                {/*CUSTOM PCS BUTTON*/}
                                <td style={{width: '33.3%'}}>
                                    <SlidingButton 
                                    id="custom"
                                    imgSrc="https://firebasestorage.googleapis.com/v0/b/hunter-pcs-firebase.appspot.com/o/images%2Fstock%20pc%20parts.png?alt=media&token=f920a622-e3cc-4e59-9df1-ee6cf27c9c7b"
                                    linkLocation='customPcs'
                                    textContent='Custom' />
                                </td>
                            </tr>
                        </thead>
                    </table>
                </div>

                {/*PERFECT FOR GAMING SECTION*/}
                <div>
                    <table>
                        <thead>
                            <tr>
                                <td>
                                <h1 style={{textAlign: 'left', marginLeft: '2%'}}>
                                    Perfect for gaming
                                </h1>
                                <p style={{width: '75%', marginLeft: '15%', textAlign: 'right'}}>
                                    Here at Hunter pcs, we know that the best pcs are designed to run games smooth as butter. That's why we've been working hard to deliver you the 
                                    best gaming experience at the lowest price. <br/>We make all our computers with high end components from trusted manufacturers.
                                </p>
                                <button onClick={function() {changePage('gamingPcs')}} type="button">
                                    <h3>
                                        Browse all gaming pcs  ⟶
                                    </h3>
                                </button>
                                </td>

                                <td style={{width: '50%'}}>
                                <img src="https://firebasestorage.googleapis.com/v0/b/hunter-pcs-firebase.appspot.com/o/images%2Frounded%20skull%202.jpeg?alt=media&token=c9e0128f-15ca-4595-bc92-15618109e0de" 
                                    style={{width: '85%'}} className="mainImage" alt="loading..."/>
                                </td>
                            </tr>
                        </thead>
                    </table>
                </div>

                {/*VIDEOS FROM PCS SECTION*/}
                <div>
                    <h1>
                        Play your favourite titles
                    </h1>
                    {this.getVideos()}
                </div>

                {/*DESIGN YOUR OWN PC SECTION*/}
                <div className="purpleGrey" style={{ marginTop: '15vh'}}>
                    <h1 className="alignRight">
                        Design your own, custom build
                    </h1>
                    <table>
                        <thead>
                            <tr>
                                <td>
                                    <p className="alignLeft">
                                        Need that specific pc you've always wanted? Well you're in luck: here at Hunter Pcs, you can design your own cusom pc
                                         and have one of our experts assemble it for you. We'll even deliver it straight to your door as well
                                    </p>
                                    <button type="button" onClick={function() {changePage('customPcs')}}>
                                        <h3>
                                            Design your dream pc ⟶
                                        </h3>
                                    </button>
                                </td>
                                <td style={{width: '50%'}}>
                                    <img src="https://firebasestorage.googleapis.com/v0/b/hunter-pcs-firebase.appspot.com/o/images%2Fimage%20of%20pc.jpeg?alt=media&token=057583b8-036a-4ffd-9657-58e010d7e8e8"
                                    className="mainImage" style={{marginRight: 'auto', width: '65%', marginLeft: '10%'}} alt="loading..." />
                                </td>
                            </tr>
                        </thead>
                    </table>
                </div>

                {/*HANDCRAFTED BY EXPERTS SECTION*/}
                <div>
                    <h1 className="alignLeft">
                        Hand-crafted by experts
                    </h1>
                    <p className="alignRight">
                        Here at Hunter Pcs we're committed to quality: each and every one of our gaming pcs is crafted by hand. And not just that,
                         our trained experts test all of the pcs they make to ensure that you get the best performance out of your build.
                    </p>
                </div>
            </React.Fragment>
        );
    };

    getVideos() {
        let videoHTML = [];
        const videoURLs = ['https://firebasestorage.googleapis.com/v0/b/hunter-pcs-firebase.appspot.com/o/gameplayVideos%2Fgta%2Fgta%20test%20video.mp4?alt=media&token=527af84b-9499-492b-9078-918ace4e5357',
    'https://firebasestorage.googleapis.com/v0/b/hunter-pcs-firebase.appspot.com/o/gameplayVideos%2Fgta%2Fgta%20test%20video.mp4?alt=media&token=527af84b-9499-492b-9078-918ace4e5357',];
        const videoTitles = ['GTA_TEST', 'GTA_TEST_2'];

        function getVideo(url, onRight) {
            return (
                <React.Fragment>
                    <video loading="lazy" autoPlay loop className={onRight == true ? "videoInGallery onRight " : "videoInGallery onLeft "}>
                        <source src={url} type="video/mp4"/>
                    </video>
                </React.Fragment>
            )
    
        };

        //repeat for each video
        for (let i = 0; i < videoURLs.length; i = i + 2) {
            let video = videoURLs[i];
            //skip so that only every 2 cells are repeated
            if (videoURLs.indexOf(video) % 2 == 0) {
    
                //render the HTML
                //NOTE: AN EVEN LENGTH OF VIDEOS MUST BE SUPPLISED OR ELSE DOOM
                videoHTML.push(
                    <React.Fragment>
                        <table style={{marginTop: '2vh'}}>
                            <thead>
                                <tr>
                                    {/*FIRST CELL, FIRST ROW*/}
                                    <td style={{width: '75%'}}>
                                        {getVideo(video, false)}
                                    </td>
    
                                    {/*SECOND CELL, FIRST ROW*/}
                                    <td>
                                        <h2>
                                            {videoTitles[videoURLs.indexOf(video)]}
                                        </h2>
                                    </td>
                                </tr>
                            </thead>
                        </table>
    
                        <table style={{marginTop: '5vh'}}>
                            <thead>
                                <tr>
                                    {/*FIST CELL, SECOND ROW*/}
                                    <td style={{width: '25%'}}>
                                        <h2>
                                            {videoTitles[videoURLs.indexOf(video) + 1]}
                                        </h2>
                                    </td>
    
                                    {/*SECOND CELL, SECOND ROW*/}
                                    <td style={{width: '75%'}}>
                                        {getVideo(videoURLs[videoURLs.indexOf(video) +1], true)}
                                    </td>
                                </tr>
                            </thead>
                        </table>
                    </React.Fragment>
                );
            };
        };

        //return the HTML to the main script
        return videoHTML;
    };
};

export default Home;