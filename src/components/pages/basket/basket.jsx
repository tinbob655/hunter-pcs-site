import React, {Component} from 'react';
import FirestoreBasket from '../../../classes/basket.js';
import AuthContext from '../../../context/authContext.jsx';
import PageHeader from '../../multiPageComponents/pageHeader.jsx';
import SmartImage from '../../multiPageComponents/smartImage.jsx';
import FancyButton from '../../multiPageComponents/fancyButton.jsx';
import DividerLine from '../../multiPageComponents/dividerLine.jsx';
import { Link } from 'react-router-dom';
import LoginPopup from '../../multiPageComponents/popups/loginPopup.jsx';
import AddressPopup from '../../multiPageComponents/popups/addressPopup.jsx';
import StripeCheckout from './checkout.jsx';
import SecureLS from 'secure-ls';
import MobileProvider from '../../../context/mobileContext.jsx';

class Basket extends Component {

    static contextType = AuthContext;

    constructor(props) {
        super(props);

        //fetch discount (if available)
        const ls = new SecureLS();
        let discount = 1;   //default discount value is 1 (no effect)
        try {
            const fetchedDiscount = ls.get('discount');
            if (fetchedDiscount) {
                discount = fetchedDiscount.data;
            };
        }
        catch(error) {

            //prevent full error logging if the discount was not available
            console.error(error);
        };

        this.state = {
            authUID: null,
            basketData: null,
            basketObject: null,
            prices: null,
            loginPopupShown: false,
            addressPopupShown: false,
            stripeCheckoutShown: false,
            stripeCheckout: <></>,
            discountMultiplier: discount,
        };
    };

    async componentDidMount() {
        this.setState({authUID: this.context?.uid})

        //if there is an auth uid, fetch the user's basket from firestore
        if (this.context?.uid) {

            //initialise the firestore basket Object
            const userBasket = new FirestoreBasket(this.context.uid);
            await userBasket.init();
            this.setState({
                basketData: userBasket.getBasketItems,
                basketObject: userBasket,
                prices: userBasket.getPrices,
            });
        };
    };

    render() {
        return (
            <React.Fragment>
                <MobileProvider.Consumer>
                    {(isMobile) => {
                        if (!isMobile) {
                            return (
                                <React.Fragment>

                                    {/*desktop basket page*/}
                                    <PageHeader heading="Your basket" subheading="Check out your items" />
                    
                                    {/*buy now button section*/}
                                    <div>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <td style={{width: '45%'}}>
                                                        <SmartImage imageClasses="mainImage" imagePath="images/gamingSetupWIDE2.jpeg" />
                                                    </td>
                                                    <td>
                                                        <h2 className="alignRight">
                                                            Buy now
                                                        </h2>
                    
                                                        <div style={{maxWidth: '850px', marginLeft: 'auto', marginRight: 'auto'}}>
                                                            {this.state.authUID ? (
                                                                <React.Fragment>
                         
                                                                    {/*if the user is logged in*/}
                                                                    {this.state.basketObject?.getTotalBasketCost > 0 ? (
                                                                        <React.Fragment>
                    
                                                                            {/*the user is logged in, and has items in their basket, show a 'buy now' button*/}
                                                                            <p className="alignLeft" style={{marginBottom: '30px'}}>
                                                                                Done browsing? Ready to buy? Then hit the purchase button below: the final step between you and a high performance gaming PC. All payments are 100% secure as per our privacy policy and are managed by Stripe.
                                                                            </p>
                                                                            <FancyButton title="Buy now" action={() => {this.setState({addressPopupShown: true})}} key={this.state.authUID} />
                                                                        </React.Fragment>
                                                                    ) : (
                                                                        <React.Fragment>
                    
                                                                            {/*the user is logged in, but does not have items in their basket, show a 'browse PCs' button*/}
                                                                            <p className="alignLeft" style={{marginBottom: '30px'}}>
                                                                                Your basket is empty, to fix that, click below
                                                                            </p>
                                                                            <FancyButton title="Browse PCs" destination="/pcsMain" key={this.state.basketObject} />
                                                                        </React.Fragment>
                                                                    )}
                                                                </React.Fragment>
                                                            ) : (
                                                                <React.Fragment>
                    
                                                                    {/*the use is not logged in, show a 'log in' button*/}
                                                                    <p className="alignLeft" style={{marginBottom: '30px'}}>
                                                                        You're not logged in, to add items to your basket and make purchases with us, we need you to log in. Fear not, logging in is easy, just click the button below
                                                                    </p>
                                                                    <FancyButton title="Log in" action={() => {this.setState({loginPopupShown: true})}} key={this.state.authUID} />
                                                                </React.Fragment>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            </thead>
                                        </table>
                                    </div>
                    
                                    <DividerLine purple={false} />
                    
                                    {/*user's basket content section*/}
                                    <div>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <td>
                                                        <h2 className="alignLeft">
                                                            Your stuff
                                                        </h2>
                                                        {this.state.authUID ? (
                                                            <React.Fragment>
                    
                                                                {/*the user is logged in, check if they have items in their basket*/}
                                                                {this.state.basketObject?.getTotalBasketCost > 0 ? (
                                                                    <React.Fragment>
                    
                                                                        {/*the user has items in their basket and is logged in, show the items*/}
                                                                        {this.renderBasketItemsMarkup()}
                    
                                                                        <DividerLine purple={false} />
                    
                                                                        {/*total basket cost*/}
                                                                        <p>
                                                                            Total cost: £{Math.ceil(this.state.basketObject.getTotalBasketCost * 100) / 100}
                                                                        </p>
                    
                                                                        {/*button to empty the basket*/}
                                                                        <button type="button" onClick={ async() => {
                                                                            await this.state.basketObject.resetBasket();
                                                                            window.location.reload();
                                                                        }} >
                                                                            <h3>
                                                                                Click here to empty your basket ⟶
                                                                            </h3>
                                                                        </button>
                                                                    </React.Fragment>
                                                                ) : (
                                                                    <React.Fragment>
                    
                                                                        {/*the user is logged in, but does not have any items in their basket, tell them their basket is empty*/}
                                                                        <Link to="/pcsMain">
                                                                            <h3>
                                                                                Looks like your basket is empty, click here to do something about that ⟶
                                                                            </h3>
                                                                        </Link>
                                                                    </React.Fragment>
                                                                )}
                                                            </React.Fragment>
                                                        ) : (
                                                            <React.Fragment>
                    
                                                                {/*the user is not logged in, display a message saying we can't get your basket until you log in*/}
                                                                <p className="alignRight">
                                                                    We can't fetch your basket without knowing who you are. Please log in to your Hunter PCs account or create one.
                                                                </p>
                                                                <button type="button" onClick={() => {this.setState({loginPopupShown: true})}}>
                                                                    <h3>
                                                                        Log in ⟶
                                                                    </h3>
                                                                </button>
                                                            </React.Fragment>
                                                        )}
                                                    </td>
                                                    <td style={{width: '45%'}}>
                                                        <SmartImage imageClasses="mainImage" imagePath="images/image of pc 2.jpeg" />
                                                    </td>
                                                </tr>
                                            </thead>
                                        </table>
                                    </div>
                    
                                    {/*login popup*/}
                                    <LoginPopup shown={this.state.loginPopupShown} />
                    
                                    {/*address popup*/}
                                    <AddressPopup shown={this.state.addressPopupShown} closeFunc={() => {
                                        this.setState({addressPopupShown: false});
                                        this.payWithStripe();
                                        }} />
                    
                                    {/*stripe payment popup*/}
                                    {this.state.stripeCheckout}
                                </React.Fragment>
                            );
                        }
                        else {
                            return (
                                <React.Fragment>

                                    {/*mobile basket page*/}
                                    <PageHeader heading="Your basket" subheading="Check out your items" />

                                    {/*buy now section*/}
                                    <div className="intoPurple">
                                        <table>
                                            <thead>
                                                <td style={{width: '60%'}}>
                                                    <SmartImage imageClasses="mainImage" imagePath="images/gamingSetupWIDE2.jpeg" />
                                                </td>
                                                <td>
                                                    <h2 className="alignLeft">
                                                        Buy now
                                                    </h2>
                                                </td>
                                            </thead>
                                        </table>
                                        {this.state.authUID ? (
                                            <React.Fragment>
        
                                                {/*if the user is logged in*/}
                                                {this.state.basketObject?.getTotalBasketCost > 0 ? (
                                                    <React.Fragment>

                                                        {/*the user is logged in, and has items in their basket, show a 'buy now' button*/}
                                                        <p style={{marginBottom: '30px'}}>
                                                            Done browsing? Ready to buy? Then hit the purchase button below: the final step between you and a high performance gaming PC. All payments are 100% secure as per our privacy policy and are managed by Stripe.
                                                        </p>
                                                        <FancyButton title="Buy now" action={() => {this.setState({addressPopupShown: true})}} key={this.state.authUID} />
                                                    </React.Fragment>
                                                ) : (
                                                    <React.Fragment>

                                                        {/*the user is logged in, but does not have items in their basket, show a 'browse PCs' button*/}
                                                        <p style={{marginBottom: '30px'}}>
                                                            Your basket is empty, to fix that, click below
                                                        </p>
                                                        <FancyButton title="Browse PCs" destination="/pcsMain" key={this.state.basketObject} />
                                                    </React.Fragment>
                                                )}
                                            </React.Fragment>
                                        ) : (
                                            <React.Fragment>

                                                {/*the use is not logged in, show a 'log in' button*/}
                                                <p style={{marginBottom: '30px'}}>
                                                    You're not logged in, to add items to your basket and make purchases with us, we need you to log in. Fear not, logging in is easy, just click the button below
                                                </p>
                                                <FancyButton title="Log in" action={() => {this.setState({loginPopupShown: true})}} key={this.state.authUID} />
                                            </React.Fragment>
                                        )}
                                    </div>

                                    <DividerLine purple={true} />

                                    {/*user's basket content section*/}
                                    <div className="outOfPurple">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <td>
                                                        <h2 className="alignRight">
                                                            Your stuff
                                                        </h2>
                                                    </td>
                                                    <td style={{width: '60%'}}>
                                                        <SmartImage imageClasses="mainImage" imagePath="images/image of pc 2.jpeg" />
                                                    </td>
                                                </tr>
                                            </thead>
                                        </table>
                                        {this.state.authUID ? (
                                            <React.Fragment>
    
                                                {/*the user is logged in, check if they have items in their basket*/}
                                                {this.state.basketObject?.getTotalBasketCost > 0 ? (
                                                    <React.Fragment>
    
                                                        {/*the user has items in their basket and is logged in, show the items*/}
                                                        {this.renderBasketItemsMarkup()}
    
                                                        <div style={{height: '5px', width: '75%', margin: 'auto', marginTop: '2.25vh', marginBottom: '2.25vh', backgroundColor: 'white'}} ></div>
    
                                                        {/*total basket cost*/}
                                                        <p>
                                                            Total cost: £{Math.ceil(this.state.basketObject.getTotalBasketCost * 100) / 100}
                                                        </p>
    
                                                        {/*button to empty the basket*/}
                                                        <button type="button" onClick={ async() => {
                                                            await this.state.basketObject.resetBasket();
                                                            window.location.reload();
                                                        }} >
                                                            <h3>
                                                                Click here to empty your basket ⟶
                                                            </h3>
                                                        </button>
                                                    </React.Fragment>
                                                ) : (
                                                    <React.Fragment>
    
                                                        {/*the user is logged in, but does not have any items in their basket, tell them their basket is empty*/}
                                                        <Link to="/pcsMain">
                                                            <h3>
                                                                Looks like your basket is empty, click here to do something about that ⟶
                                                            </h3>
                                                        </Link>
                                                    </React.Fragment>
                                                )}
                                            </React.Fragment>
                                        ) : (
                                            <React.Fragment>
    
                                                {/*the user is not logged in, display a message saying we can't get your basket until you log in*/}
                                                <p className="alignRight">
                                                    We can't fetch your basket without knowing who you are. Please log in to your Hunter PCs account or create one.
                                                </p>
                                                <button type="button" onClick={() => {this.setState({loginPopupShown: true})}}>
                                                    <h3>
                                                        Log in ⟶
                                                    </h3>
                                                </button>
                                            </React.Fragment>
                                        )}
                                    </div>

                                    {/*login popup*/}
                                    <LoginPopup shown={this.state.loginPopupShown} />
                    
                                    {/*address popup*/}
                                    <AddressPopup shown={this.state.addressPopupShown} closeFunc={() => {
                                        this.setState({addressPopupShown: false});
                                        this.payWithStripe();
                                        }} />
                    
                                    {/*stripe payment popup*/}
                                    {this.state.stripeCheckout}
                                </React.Fragment>
                            );
                        };
                    }}
                </MobileProvider.Consumer>
            </React.Fragment>
        );
    };

    async payWithStripe() {

        //format the name of what the user is purchasing
        let purchaseName = '';
        Object.keys(this.state.basketData).forEach((item) => {

            //format the item name
            const quantity = this.state.basketData[item];
            
            if (quantity > 0) {

                //the user has this item in their basket, so add it to the string
                const formattedName = item.charAt(0).toUpperCase() + item.slice(1, item.length -2) + ' PC (x ' + quantity + ')';
                
                //add the formattedName to the purchaseName string
                if (purchaseName.length === 0) {

                    //if this is the first item to add to the string
                    purchaseName += formattedName;
                }
                else {

                    //this is not the first item to add to the string, so add a comma at the beginning
                    purchaseName += ', '+formattedName;
                };
            };
        });

        //fetch price from basket, then apply discount
        let price = this.state.basketObject.getTotalBasketCost;
        price = price * this.state.discountMultiplier;

        //price must be in pence for stripe to be happy
        price = Math.ceil(price * 100);

        //if a discount was applied, add it to the name of what the user is purchasing
        if (this.state.discountMultiplier != 1) {
            
            //get discount as a percentage
            let percentageDiscount = 100 - (this.state.discountMultiplier * 100);
            purchaseName += ` (${percentageDiscount}% discount applied)`;
        };

        //make sure the price is above 30p as this is the stripe minimum
        if (price < 0.3) {
            throw new Error('Price is too small (needs to be above 30p)');
        };

        //make a stripe session
        const stripe = require('stripe')(process.env.REACT_APP_STRIPE_SK);
        const session = await stripe.checkout.sessions.create({
            line_items: [{
                price_data: {
                    currency: 'gbp',
                    product_data: {
                        name: purchaseName
                    },
                    unit_amount: price,
                },
                quantity: 1,
            }],
            mode: 'payment',
            ui_mode: 'embedded',
            redirect_on_completion: 'never',
        });

        sessionStorage.setItem('stripeSession', JSON.stringify(session));

        //create the checkout
        this.setState({
            stripeCheckout: <StripeCheckout shown={this.state.stripeCheckoutShown} />
        });

        //show the checkout
        setTimeout(() => {
            document.getElementById('checkoutWrapper').classList.add('shown');
        }, 100);
    };

    renderBasketItemsMarkup() {
        let basketItemsHTML = [];

        //only generate html if there is a fetched basket
        if (Object.keys(this.state.basketData).length > 0) {

            //repeat for each item in the user's basket
            Object.keys(this.state.basketData).forEach((item) => {
                
                //if the user has the item in their basket, add it to the markup
                if (this.state.basketData[item] > 0) {

                    //format the item name. For example, 'solidPc' will become 'Solid PC'
                    let formattedItemName = item.slice(0, item.indexOf('P')); //the fist part of the name eg 'solid'
                    formattedItemName = formattedItemName.charAt(0).toUpperCase() + formattedItemName.slice(1); //capital first letter eg 'Solid'
                    formattedItemName += ' PC'; //with pc at the end eg 'Solid PC

                    basketItemsHTML.push(
                        <React.Fragment>
                            <p>
                                -{formattedItemName} (x {this.state.basketData[item]})
                            </p>
                        </React.Fragment>
                    );
                };
            });
        };

        return basketItemsHTML;
    };
};

export default Basket;