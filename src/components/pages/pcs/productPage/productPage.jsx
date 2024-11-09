import React, {Component} from 'react';
import DividerLine from '../../../multiPageComponents/dividerLine.jsx';
import SmartImage from '../../../multiPageComponents/smartImage.jsx';
import FancyButton from '../../../multiPageComponents/fancyButton.jsx';
import Product from '../../../../classes/product.js';
import firebaseInstance from '../../../../classes/firebase.js';
import {updateDoc, doc, increment} from 'firebase/firestore';
import AuthContext from '../../../../context/authContext.jsx';
import AutoNav from '../../../multiPageComponents/autoNav.jsx';
import MobileProvider from '../../../../context/mobileContext.jsx';
import LoginPopup from '../../../multiPageComponents/popups/loginPopup.jsx';

class ProductPage extends Component {

    static contextType = AuthContext;

    constructor(props) {
        super(props);

        //if there was no product, throw an error
        if (!sessionStorage.getItem('product')) {
            throw new Error('No product found in session storage.');
        };

        this.state = {
            productName: sessionStorage.getItem('product'),
            productData: null,
            authUID: null,
            autoNav: <></>,
            loginPopupShown: false,
        };
    };

    componentDidMount() {

        //instantiate a product to get product data from firestore
        const thisProduct = new Product(this.state.productName);
        thisProduct.getProductDetails().then((details) => {
            
            //save product data to state
            this.setState({
                productData: details,
                authUID: this.context?.uid, //also add the user's auth state
            });
        });
    };

    render() {
        return (
            <React.Fragment>

                {/*have to set isMobile this way as we are using two contexts here*/}
                <MobileProvider.Consumer>
                    {(isMobile) => {

                        //desktop product page
                        if (!isMobile) {
                            return (
                                <React.Fragment>

                                    {/*cannot use a pageHeader component because the title needs to change with state (and that doesn't work with react class components)*/}
                                    <h1  className="alignLeft noVerticalSpacing" style={{marginLeft: '12.5%'}}>
                                        {this.state.productData?.frontendName || 'loading...'}
                                    </h1>
                                    <p  className="alignLeft noVerticalSpacing" style={{marginLeft: '17%', color: '#c5abbe'}}>
                                        {this.state.productData?.subheaderDescription || 'loading...'}
                                    </p>
            
                                    <DividerLine purple={false} />
            
                                    {/*product description section*/}
                                    <div className="intoPurple">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <td>
                                                        <h2 className="alignLeft">
                                                            Our {this.state.productData?.frontendName || 'loading...'}:
                                                        </h2>
                                                        <p className="alignRight">
                                                            {this.state.productData?.fullDescription || 'loading...'}
                                                        </p>
            
                                                        {/*add to basket button*/}
                                                        <div style={{maxWidth: '75%', marginTop: '50px', marginLeft: 'auto', marginRight: 'auto'}}>
                                                            <FancyButton title="Add to basket" action={() => {this.addToBasketButtonPressed()}} />
                                                        </div>
                                                    </td>
                                                    <td style={{width: '40%'}}>
                                                        <SmartImage imagePath="images/image of pc.jpeg" imageClasses="mainImage" />
                                                        <h2 style={{marginTop: '10px', paddingTop: 0}}>
                                                            £{this.state.productData?.price || 'loading...'}
                                                        </h2>
                                                    </td>
                                                </tr>
                                            </thead>
                                        </table>

                                        <LoginPopup shown={this.state.loginPopupShown} />
                                    </div>
            
                                    {this.state.autoNav}
                                </React.Fragment>
                            );
                        }

                        //mobile product page
                        else {
                            return (
                                <React.Fragment>

                                    {/*cannot use a pageHeader component because the title needs to change with state*/}
                                    <h1 className="alignLeft noVerticalSpacing" style={{marginLeft: '12.5%'}}>
                                        {this.state.productData?.frontendName || 'loading...'}
                                    </h1>
                                    <p className="alignLeft noVerticalSpacing" style={{marginLeft: '17%', color: '#c5abbe'}}>
                                        {this.state.productData?.subheaderDescription || 'loading...'}
                                    </p>

                                    <DividerLine purple={false} />

                                    {/*product description section*/}
                                    <div className="intoPurple">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <td>
                                                        <h2 className="alignRight">
                                                            Our {this.state.productData?.frontendName || 'loading...'}
                                                        </h2>
                                                    </td>
                                                    <td style={{width: '60%'}}>
                                                        <SmartImage imagePath="images/image of pc.jpeg" imageClasses="mainImage" />
                                                        <h2 style={{marginTop: '10px', paddingTop: 0}}>
                                                            £{this.state.productData?.price || 'loading...'}
                                                        </h2>
                                                    </td>
                                                </tr>
                                            </thead>
                                        </table>
                                        <p>
                                            {this.state.productData?.fullDescription || 'loading...'}
                                        </p>
                                        <div style={{paddingBottom: '50px'}}>
                                            <FancyButton title="Get it" action={() => {this.addToBasketButtonPressed()}} />
                                        </div>

                                        <LoginPopup shown={this.state.loginPopupShown} />
                                    </div>

                                    {this.state.autoNav}
                                </React.Fragment>
                            );
                        };
                    }}
                </MobileProvider.Consumer>

            </React.Fragment>
        );
    };

    async addToBasketButtonPressed() {

        //only add to the basket if the user is logged in
        if (this.state.authUID) {

            //the user was logged in, add the item to their basket
            const firestore = firebaseInstance.getFirebaseFirestore;
            await updateDoc(doc(firestore, 'baskets', this.state.authUID), {
                [this.state.productName + 'Pc']: increment(1),
            });

            //add a delay before navigation to the user's basket so that they do not get confused
            setTimeout(() => {
                this.setState({autoNav: <AutoNav destination='/basket' />});
            }, 500);
        }
        else {
            
            //if the user was not logged in, show the login popup
            this.setState({loginPopupShown: true});
        };
    };
};

export default ProductPage;