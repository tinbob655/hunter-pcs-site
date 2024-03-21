import React, {Component} from 'react';
import SlidingButton from '../../multiPageComponents/slidingButton.jsx';
import {doc, getDoc, getFirestore} from 'firebase/firestore';
import { firebaseInit } from '../../../firebase.js';
import { isMobile } from '../../../index.js';
import GenericMarkupSection from '../../multiPageComponents/genericMarkupSection.jsx';
import Image from '../../multiPageComponents/image.jsx';

firebaseInit();

class PcsMain extends Component {

    constructor (props) {
        super(props);

        this.state = {
            prices: {
            },
            productImages: {
                temporary: 'images/image of pc.jpeg',
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
                    <div className="intoPurple">
                        <h1 className="alignRight">
                            Hand crafted gaming PCs, ready to go
                        </h1>
                        <table>
                            <thead>
                                <tr>
                                    <td>
                                        <Image imagePath="images/gamingSetupWIDE1.jpeg" imageClasses="mainImage" />
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
                            For high quality PCs, you're in the right place
                        </h1>
    
                        <table style={{tableLayout: 'fixed'}}>
                            <thead>
                                <tr>
                                    <td colSpan='2'>
    
                                        {/*solid pc button*/}
                                        <SlidingButton 
                                            id="solidPcsButton"
                                            linkLocation="productPage"
                                            ssIndex='product'
                                            ssValue='solidPc'
                                            textContent='Solid'
                                            textAfterArrow={<React.Fragment>
                                                <br/>
                                                {this.state.prices.solid ? '£ '+this.state.prices.solid : 'loading...'}
                                            </React.Fragment>} />
                                    </td>
                                    <td style={{width: '0'}}></td>
                                    <td colSpan="2">
    
                                        {/*strong pc button*/}
                                        <SlidingButton
                                            id="strongPcsButton"
                                            linkLocation="productPage"
                                            ssIndex="product"
                                            ssValue='strongPc'
                                            textContent='Strong'
                                            textAfterArrow={<React.Fragment>
                                                <br/>
                                                {this.state.prices.strong ? '£ '+this.state.prices.strong : 'loading...'}
                                            </React.Fragment>} />
                                    </td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td colSpan="3">
    
                                        {/*powerful pc button*/}
                                        <SlidingButton 
                                            id="powerfulPcsButton"
                                            linkLocation="productPage"
                                            ssIndex='product'
                                            ssValue='powerfulPc'
                                            textContent='Powerful'
                                            textAfterArrow={<React.Fragment>
                                                <br/>
                                                {this.state.prices.powerful ? '£ '+this.state.prices.powerful : 'loading...'}
                                            </React.Fragment>} />
                                    </td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td colSpan="2">
    
                                        {/*supreme pc button*/}
                                        <SlidingButton 
                                            id="supremePcsButton"
                                            linkLocation="productPage"
                                            ssIndex='product'
                                            ssValue='supremePc'
                                            textContent='Supreme'
                                            textAfterArrow={<React.Fragment>
                                                <br/>
                                                {this.state.prices.supreme ? '£ '+this.state.prices.supreme : 'loading...'}
                                            </React.Fragment>} />
                                    </td>
                                    <td></td>
                                    <td colSpan="2">
    
                                        {/*dominant pc button*/}
                                        <SlidingButton 
                                            id="dominantPcsButton"
                                            linkLocation="productPage"
                                            ssIndex='product'
                                            ssValue='dominantPc'
                                            textContent='Dominant'
                                            textAfterArrow={<React.Fragment>
                                                <br/>
                                                {this.state.prices.dominant ? '£ '+this.state.prices.dominant : 'loading...'}
                                            </React.Fragment>} />
                                    </td>
                                </tr>
                            </thead>
                        </table>
                        <p>
                            Please note: all our PCs come with Windows 11 pre-installed. This can be changed in the purchase menus
                        </p>
                    </div>
    
                    {/*CUSTOM PCS SECTION*/}
                    <div className="outofPurple">
                        <GenericMarkupSection
                        headingText='Design your own PC'
                        subheadingText='Build your dreams'
                        paragraphText='Using our custom PC creator, you can design the PC of your dreams online, right now.'
                        linkContent='Click here to get started ⟶'
                        linkDestination='/customPcs'
                        imgSrc='images/motherboardTall.jpeg'
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
                    <div className="intoPurple">
                        <h1>
                            Hand crafted gaming PCs, ready to go
                        </h1>
                        <table>
                            <thead>
                                <tr>
                                    <td>
                                        <Image imagePath="images/gamingSetupWIDE1.jpeg" imageClasses="mainImage"/>
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
                            We sell PCs ranging from the highest performing to the most budget effective. Whatever your needs, satisfy them here
                        </p>
                    </div>

                    <div className="dividerLine"></div>

                    {/*PREBUILT PRODUCTS SECTION*/}
                    <div className="purpleGrey">
                        <h1>
                            Browse our PCs
                        </h1>
                        <h2 className="alignRight">
                            For high quality gaming PCs, you're in the right place
                        </h2>

                        {/*solid pc button*/}
                        <SlidingButton 
                            id="solidPcsButton"
                            linkLocation="productPage"
                            ssIndex='product'
                            ssValue='solidPc'
                            imgSrc={this.state.productImages.temporary}
                            textContent='Solid'
                            textAfterArrow={<React.Fragment>
                                <br/><br/>
                                {this.state.prices.solid ? '£ '+this.state.prices.solid : 'loading...'}
                            </React.Fragment>} />

                        {/*strong pc button*/}
                        <SlidingButton
                            id="strongPcsButton"
                            linkLocation="productPage"
                            ssIndex="product"
                            ssValue='strongPc'
                            imgSrc={this.state.productImages.temporary}
                            textContent='Strong'
                            textAfterArrow={<React.Fragment>
                                <br/><br/>
                                {this.state.prices.strong ? '£ '+this.state.prices.strong : 'loading...'}
                            </React.Fragment>} />

                        {/*powerful pc button*/}
                        <SlidingButton 
                            id="powerfulPcsButton"
                            linkLocation="productPage"
                            ssIndex='product'
                            ssValue='powerfulPc'
                            imgSrc={this.state.productImages.temporary}
                            textContent='Powerful'
                            textAfterArrow={<React.Fragment>
                                <br/><br/>
                                {this.state.prices.powerful ? '£ '+this.state.prices.powerful : 'loading...'}
                            </React.Fragment>} />

                        {/*supreme pc button*/}
                        <SlidingButton 
                            id="supremePcsButton"
                            linkLocation="productPage"
                            ssIndex='product'
                            ssValue='supremePc'
                            imgSrc={this.state.productImages.temporary}
                            textContent='Supreme'
                            textAfterArrow={<React.Fragment>
                                <br/><br/>
                                {this.state.prices.supreme ? '£ '+this.state.prices.supreme : 'loading...'}
                            </React.Fragment>} />

                            {/*dominant pc button*/}
                            <SlidingButton 
                                id="dominantPcsButton"
                                linkLocation="productPage"
                                ssIndex='product'
                                ssValue='dominantPc'
                                imgSrc={this.state.productImages.temporary}
                                textContent='Dominant'
                                textAfterArrow={<React.Fragment>
                                    <br/><br/>
                                    {this.state.prices.dominant ? '£ '+this.state.prices.dominant : 'loading...'}
                                </React.Fragment>} />
                        <p>
                            Please note: all our PCs come with Windows 11 pre-installed. This can be changed in the purchase menus
                        </p>
                    </div>

                    <div className="dividerLine"></div>

                    {/*CUSTOM PCS SECTION*/}
                    <div className="outofPurple">
                        <GenericMarkupSection
                            headingText='Design your own PC'
                            subheadingText='Build your dreams'
                            paragraphText='Using our custom PC creator, you can design the PC of your dreams online, right now.'
                            linkContent='Tap here to get started ⟶'
                            linkDestination='/customPcs'
                            imgSrc='images/motherboardTall.jpeg'
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