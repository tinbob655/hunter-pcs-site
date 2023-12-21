import React, {Component} from 'react';
import SlidingButton from '../multiPageComponents/slidingButton.jsx';
import {doc, getDoc, getFirestore} from 'firebase/firestore';
import { firebaseInit } from '../../../firebase.js';
import { isMobile } from '../../../index.js';
import { Link } from 'react-router-dom';
import GenericMarkupSection from '../multiPageComponents/genericMarkupSection.jsx';

firebaseInit();

class PcsMain extends Component {

    constructor (props) {
        super(props);

        this.state = {
            prices: {
            },
        };
    };

    async componentDidMount() {

        //fetch all the prices from database
        let fetchedPrices = [];
        const pcTypes = ['solidPc', 'strongPc', 'powerfulPc', 'supremePc', 'dominantPc'];

        //repeat for each product
        for (let pc = 0; pc < pcTypes.length; pc++) {
            const database = getFirestore();
            let docRef = doc(database, 'products', pcTypes[pc]);
            let docSnap = await getDoc(docRef);

            //append the fetched price to the array of prices
            fetchedPrices.push(docSnap.data().price)
        };

        //now add the fetched prices to state
        this.setState({prices: {
            solid: fetchedPrices[0],
            strong: fetchedPrices[1],
            powerful: fetchedPrices[2],
            supreme: fetchedPrices[3],
            dominant: fetchedPrices[4],
        }});
    };

    render() {

        //desktop gaming pcs page
        if (!isMobile()) {
            return (
                <React.Fragment>
                    {/*HEADER SECTION*/}
                    <div>
                        <h1 className="alignRight">
                            Hand crafted gaming pcs, ready to go
                        </h1>
                        <table>
                            <thead>
                                <tr>
                                    <td>
                                        <img src='https://firebasestorage.googleapis.com/v0/b/hunter-pcs-firebase.appspot.com/o/images%2FgamingSetupWIDE1.jpeg?alt=media&token=aa72a5f1-7adb-42cd-98d2-a0e8795822da' 
                                        className="mainImage" alt="loading..."/>
                                    </td>
                                    <td>
                                        <h2 className="alignRight">
                                            Get your dream setup
                                        </h2>
                                        <p className="alignLeft">
                                            We sell pcs ranging from the highest performing to the most budget effective. Whatever your needs, satisfy them here
                                        </p>
                                    </td>
                                </tr>
                            </thead>
                        </table>
                    </div>
    
                    {/*PREBUILT PRODUCTS SECTION*/}
                    <div className="purpleGrey">
                        <h1>
                            For high quality pcs, you're in the right place
                        </h1>
    
                        <table style={{tableLayout: 'fixed'}}>
                            <thead>
                                <tr>
                                    <td colSpan='2'>
    
                                        {/*solid pc button*/}
                                        <SlidingButton 
                                            id="solidPcsButton"
                                            imgSrc=""
                                            linkLocation="productPage"
                                            ssIndex='product'
                                            ssValue='solidPc'
                                            textContent={this.state.prices.solid ? (
                                                <React.Fragment>
                                                    Solid <br/><br/>{"£ "+this.state.prices.solid}
                                                </React.Fragment>
                                            ) : 'loading...'} />
                                    </td>
                                    <td style={{width: '0'}}></td>
                                    <td colSpan="2">
    
                                        {/*strong pc button*/}
                                        <SlidingButton
                                            id="strongPcsButton"
                                            imgSrc=""
                                            linkLocation="productPage"
                                            ssIndex="product"
                                            ssValue='strongPc'
                                            textContent={this.state.prices.strong ? (
                                                <React.Fragment>
                                                    Strong <br/><br/>{"£ "+this.state.prices.strong}
                                                </React.Fragment>
                                            ) : 'loading...'} />
                                    </td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td colSpan="3">
    
                                        {/*powerful pc button*/}
                                        <SlidingButton 
                                            id="powerfulPcsButton"
                                            imgSrc=""
                                            linkLocation="productPage"
                                            ssIndex='product'
                                            ssValue='powerfulPc'
                                            textContent={this.state.prices.powerful ? (
                                                <React.Fragment>
                                                    Powerful <br/><br/>{"£ "+this.state.prices.powerful}
                                                </React.Fragment>
                                            ) : 'loading...'} />
                                    </td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td colSpan="2">
    
                                        {/*supreme pc button*/}
                                        <SlidingButton 
                                            id="supremePcsButton"
                                            imgSrc=""
                                            linkLocation="productPage"
                                            ssIndex='product'
                                            ssValue='supremePc'
                                            textContent={this.state.prices.supreme? (
                                                <React.Fragment>
                                                    Supreme <br/><br/>{"£ "+this.state.prices.supreme}
                                                </React.Fragment>
                                            ) : 'loading...'} />
                                    </td>
                                    <td></td>
                                    <td colSpan="2">
    
                                        {/*dominant pc button*/}
                                        <SlidingButton 
                                            id="dominantPcsButton"
                                            imgSrc=""
                                            linkLocation="productPage"
                                            ssIndex='product'
                                            ssValue='dominantPc'
                                            textContent={this.state.prices.dominant ? (
                                                <React.Fragment>
                                                    Dominant <br/><br/>{"£ "+this.state.prices.dominant}
                                                </React.Fragment>
                                            ) : 'loading...'} />
                                    </td>
                                </tr>
                            </thead>
                        </table>
                    </div>
    
                    {/*CUSTOM PCS SECTION*/}
                    <div>
                        <GenericMarkupSection
                        headingText='Design your own pc'
                        subheadingText='Build your dreams'
                        paragraphText='Using our custom pc creator, you can design the pc of your dreams online, right now.'
                        linkContent='Click here to get started ⟶'
                        linkDestination='/customPcs'
                        imgSrc='https://firebasestorage.googleapis.com/v0/b/hunter-pcs-firebase.appspot.com/o/images%2FmotherboardTall.jpeg?alt=media&token=b7433866-5203-4cbb-9808-ca1d47ee1a48'
                        leftBool={false} 
                        customImageCellStyles={{width: '60%'}}/>
                    </div>
                </React.Fragment>
            );
        }

        //mobile gaming pcs page
        else {
            return (
                <React.Fragment>

                    {/*header section*/}
                    <div>
                        <h1>
                            Hand crafted gaming pcs, ready to go
                        </h1>
                        <table>
                            <thead>
                                <tr>
                                    <td>
                                        <img src='https://firebasestorage.googleapis.com/v0/b/hunter-pcs-firebase.appspot.com/o/images%2FgamingSetupWIDE1.jpeg?alt=media&token=aa72a5f1-7adb-42cd-98d2-a0e8795822da' 
                                        className="mainImage" alt="loading..."/>
                                    </td>
                                    <td style={{width: '40%'}}>
                                        <h2 className="alignLeft">
                                            Get your dream setup
                                        </h2>
                                    </td>
                                </tr>
                            </thead>
                        </table>
                        <p>
                            We sell pcs ranging from the highest performing to the most budget effective. Whatever your needs, satisfy them here
                        </p>
                    </div>

                    <div className="dividerLine"></div>

                    {/*PREBUILT PRODUCTS SECTION*/}
                    <div className="purpleGrey">
                        <h1>
                            Browse our pcs
                        </h1>
                        <h2 className="alignRight">
                            For high quality gaming pcs, you're in the right place
                        </h2>

                        {/*solid pc button*/}
                        <SlidingButton 
                            id="solidPcsButton"
                            imgSrc=""
                            linkLocation="/productPage"
                            ssIndex='product'
                            ssValue='solidPc'
                            textContent={this.state.prices.solid ? (
                                <React.Fragment>
                                    Solid <br/><br/>{"£ "+this.state.prices.solid}
                                </React.Fragment>
                            ) : 'loading...'} />

                        {/*strong pc button*/}
                        <SlidingButton
                            id="strongPcsButton"
                            imgSrc=""
                            linkLocation="/productPage"
                            ssIndex="product"
                            ssValue='strongPc'
                            textContent={this.state.prices.strong ? (
                                <React.Fragment>
                                    Strong <br/><br/>{"£ "+this.state.prices.strong}
                                </React.Fragment>
                            ) : 'loading...'} />

                        {/*powerful pc button*/}
                        <SlidingButton 
                            id="powerfulPcsButton"
                            imgSrc=""
                            linkLocation="/productPage"
                            ssIndex='product'
                            ssValue='powerfulPc'
                            textContent={this.state.prices.powerful ? (
                                <React.Fragment>
                                    Powerful <br/><br/>{"£ "+this.state.prices.powerful}
                                </React.Fragment>
                            ) : 'loading...'} />

                        {/*supreme pc button*/}
                        <SlidingButton 
                            id="supremePcsButton"
                            imgSrc=""
                            linkLocation="/productPage"
                            ssIndex='product'
                            ssValue='supremePc'
                            textContent={this.state.prices.supreme? (
                                <React.Fragment>
                                    Supreme <br/><br/>{"£ "+this.state.prices.supreme}
                                </React.Fragment>
                            ) : 'loading...'} />

                            {/*dominant pc button*/}
                            <SlidingButton 
                                id="dominantPcsButton"
                                imgSrc=""
                                linkLocation="/productPage"
                                ssIndex='product'
                                ssValue='dominantPc'
                                textContent={this.state.prices.dominant ? (
                                    <React.Fragment>
                                        Dominant <br/><br/>{"£ "+this.state.prices.dominant}
                                    </React.Fragment>
                                ) : 'loading...'} />
                    </div>

                    <div className="dividerLine"></div>

                    {/*CUSTOM PCS SECTION*/}
                    <div>
                        <GenericMarkupSection
                            headingText='Design your own pc'
                            subheadingText='Build your dreams'
                            paragraphText='Using our custom pc creator, you can design the pc of your dreams online, right now.'
                            linkContent='Click here to get started ⟶'
                            linkDestination='/customPcs'
                            imgSrc='https://firebasestorage.googleapis.com/v0/b/hunter-pcs-firebase.appspot.com/o/images%2FmotherboardTall.jpeg?alt=media&token=b7433866-5203-4cbb-9808-ca1d47ee1a48'
                            leftBool={false} 
                            customImageCellStyles={{width: '60%'}}
                            DontShowDividerLineBool={true}/>
                    </div>
                </React.Fragment>
            );
        };
    };
};

export default PcsMain;