import React, {Component} from 'react';
import AuthContext from '../../../context/authContext';
import FirestoreBasket from '../../../classes/basket.js';
import PageHeader from '../../multiPageComponents/pageHeader.jsx';
import GenericMarkupSection from '../../multiPageComponents/genericMarkupSection.jsx';
import Discord from '../../../classes/discord.js';

class PurchaseCompleted extends Component {

    static contextType = AuthContext;

    constructor(props) {
        super(props);

        this.state = {
            authUID: this.context?.uid || null,
            discord: new Discord(),
        };
    };

    async componentDidMount() {

        //set the auth uid
        this.setState({authUID: this.context.uid});

        //if this page was loaded, then the user must have made a purchase, empty their basket and delete the stripe session saved in session storage
        //only do these actions if the purchase was new
        if (sessionStorage.getItem('newPurchase')?.length > 0) {

            //make sure these actions cannot fire twice
            sessionStorage.removeItem('newPurchase');
            sessionStorage.removeItem('stripeSession');

            //get the user's basket
            const userBasket = new FirestoreBasket(this.context.uid);
            await userBasket.init();
            const basketData = JSON.stringify(userBasket.getBasketItems);

            //generate an order id
            const orderID = Math.floor(Math.random() * 1000000);

            //get the delivery address
            const deliveryAddress = sessionStorage.getItem('deliveryAddress');
    
            //send a message to discord to indicate that a purchase has been made
            this.state.discord.sendMessage(
                `New purchase made by user with uid: ${this.context.uid} and email address: ${this.context.email}
                The product(s) purchased: ${basketData}
                The order id: ${orderID}
                The delivery address: ${deliveryAddress}`
            );

            //also empty the user's basket
            userBasket.resetBasket();
        };
    };

    render() {
        return (
            <React.Fragment>
                <PageHeader heading="Payment Successful!" subheading="Your dream PC is on its way" />

                {/*congratulations section*/}
                <GenericMarkupSection heading="Congratulations!"
                paragraph={`Your purchase was successful! We'll get to work building your perfect PC to get you in the game as soon as possible! \n\nWe'll email you at ${this.context.email} with your purchase progress.`}
                left={true}
                imagePath="images/gamingSetupWIDE2.jpeg" />
            </React.Fragment>
        );
    };
};

export default PurchaseCompleted;