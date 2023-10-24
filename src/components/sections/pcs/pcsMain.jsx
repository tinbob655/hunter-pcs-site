import React, {Component} from 'react';
import SlidingButton from '../../slidingButton.jsx';
import {doc, getDoc, getFirestore} from 'firebase/firestore';
import { firebaseInit } from '../../../firebase.js';
import { changePage } from '../../../index.js';

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
        const pcTypes = ['solidPc', 'strongPc', 'powerfulPc', 'dominantPc'];

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
            dominant: fetchedPrices[3],
        }});
    };

    render() {
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
                                        Design your dream setup
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
                    <table>
                        <thead>
                            <tr>
                                
                                {/*BUDGET PC BUTTON*/}
                                <td>
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

                                {/*LOW MID RANGE PC BUTTON*/}
                                <td>
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
                        </thead>
                    </table>
                    <table>
                        <thead>
                            <tr>

                                {/*UPPER MID RANGE PC BUTTON*/}
                                <td>
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

                                {/*ALL OUT PC BUTTON*/}
                                <td>
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
                    <h1>
                        Design your own pc
                    </h1>
                    <table>
                        <thead>
                            <tr>
                                <td>
                                    <h2 className="alignLeft">
                                        Build your dreams
                                    </h2>
                                    <p className="alignRight">
                                        Using our custom pc creator, you can design the pc of your dreams right here on our website.
                                    </p>
                                    <button type="button" onClick={function() {changePage('customPcs')}}>
                                        <h3>
                                            Click here to get started
                                        </h3>
                                    </button>
                                </td>
                                <td>
                                    <img src='https://firebasestorage.googleapis.com/v0/b/hunter-pcs-firebase.appspot.com/o/images%2FmotherboardTall.jpeg?alt=media&token=b7433866-5203-4cbb-9808-ca1d47ee1a48'
                                    className="mainImage centered" style={{width: '85%', height: '450px', objectFit: 'cover'}} alt="loading..." />
                                </td>
                            </tr>
                        </thead>
                    </table>
                </div>
            </React.Fragment>
        );
    };
};

export default PcsMain;