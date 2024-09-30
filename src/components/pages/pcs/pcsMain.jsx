import React, {Component} from 'react';
import PageHeader from '../../multiPageComponents/pageHeader.jsx';
import GenericMarkupSection from '../../multiPageComponents/genericMarkupSection.jsx';
import DividerLine from '../../multiPageComponents/dividerLine.jsx';
import FancyButton from '../../multiPageComponents/fancyButton.jsx';
import AutoNav from '../../multiPageComponents/autoNav.jsx';
import firebaseInstance from '../../../classes/firebase.js';
import {getDocs, query, collection} from 'firebase/firestore';

class PcsMain extends Component {

    constructor(props) {
        super(props);
        
        //an auto nav is required for navigation to the product page as params are required to be passed in (and it is not being used in the usual sense of a component, rather a page)
        this.state = {
            autoNav: <></>,
            products: ['solid', 'strong', 'powerful', 'supreme', 'dominant'],
            fancyButtonsHTML: [<></>]*5,
        };

    };

    componentDidMount() {

        //fetch the price of each product from firestore
        let productSubheadings = {};

        const firestore = firebaseInstance.getFirebaseFirestore;
        const docQuery = query(collection(firestore, 'products'));
        getDocs(docQuery).then((docSnap) => {
            docSnap.forEach((doc) => {
                
                //repeating for each document found in the 'products' collection in firestore
                //get the name of the document
                const name = doc.id.replace('Pc', '');
                
                //save the prices of each product to the productSubheadings map
                productSubheadings[name] = doc.data().subheaderDescription;
            });

            //generate html for each fancy button
            let fancyButtonsHTML = [];
            this.state.products.forEach((product) => {
    
                //capitalise the first letter of the product name for the frontend
                const frontendProductName = product.substring(0, 1).toUpperCase() + product.substring(1);
    
                //add the HTML to the array
                fancyButtonsHTML.push(
                    <React.Fragment>
                        <FancyButton title={frontendProductName} action={() => {
                            sessionStorage.setItem('product', product);
                            this.setState({
                                autoNav: <AutoNav destination={'/productPage'} />
                            });
                        }} />
                        <p className="noVerticalSpacing" style={{marginBottom: '45px', marginTop: '15px', fontSize: '17px'}}>
                            {productSubheadings[product]}
                        </p>
                    </React.Fragment>
                );
    
                //save the html array to state
                this.setState({
                    fancyButtonsHTML: fancyButtonsHTML,
                });
            });
        });

    };

    render() {
        return (
            <React.Fragment>
                <PageHeader heading="Gaming PCs" subheading="Hand crafted and ready to go" />

                {/*get your dream setup section*/}
                <div>
                    <GenericMarkupSection
                        heading="Get your dream setup"
                        paragraph="Our gaming pcs are designed with a passion for quality, meaning whatever you choose, you can be sure that your PC will get you in the game. We have models ranging from the highest performing, to the most budget effective. Whatever your needs, satisfy them here."
                        left={true}
                        imagePath="images/gamingSetupWIDE1.jpeg" />
                </div>

                <DividerLine purple={false} />

                {/*buttons for each model section*/}
                <div className="intoPurple">
                    <h2>
                        For high quality Gaming PCs, you're in the right place!
                    </h2>
                    <table>
                        <thead>
                            <tr>
                                <td>
                                    {this.state.fancyButtonsHTML[0]}
                                </td>
                                <td>
                                    {this.state.fancyButtonsHTML[1]}
                                </td>
                                <td>
                                    {this.state.fancyButtonsHTML[2]}
                                </td>
                            </tr>
                        </thead>
                    </table>
                    <table style={{width: '66%', marginLeft: 'auto', marginRight: 'auto'}}>
                        <thead>
                            <tr>
                                <td>
                                    {this.state.fancyButtonsHTML[3]}
                                </td>
                                <td>
                                    {this.state.fancyButtonsHTML[4]}
                                </td>
                            </tr>
                        </thead>
                    </table>
                    <p style={{marginBottom: 0}}>
                        Please note: all our PCs come with Windows 11. This can be changed in the purchase menus.
                    </p>
                </div>

                <DividerLine purple={true} />

                {/*custom pcs section*/}
                <div className="outOfPurple">
                    <GenericMarkupSection
                        heading="Build your dreams"
                        paragraph="Using our custom PC creator, you can design the PC of your dreams online, right now. Choose from a massive range of available parts and we'll be in touch to verify whether your build works, giving you peace of mind and and easy purchase."
                        linkText="Click here to get started ⟶"
                        linkDestination="/customPcs"
                        left={false}
                        imagePath="images/motherboardTall.jpeg" />
                </div>

                {/*for programmatic navigation*/}
                {this.state.autoNav}
            </React.Fragment>
        );
    };
};

export default PcsMain;