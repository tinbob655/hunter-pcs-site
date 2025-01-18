import React, {Component} from 'react';
import AuthContext from '../../../context/authContext';
import FirestoreBasket from '../../../classes/basket.js';
import PageHeader from '../../multiPageComponents/pageHeader.jsx';
import GenericMarkupSection from '../../multiPageComponents/genericMarkupSection.jsx';
import Discord from '../../../classes/discord.js';
import DividerLine from '../../multiPageComponents/dividerLine.jsx';
import firebaseInstance from '../../../classes/firebase.js';
import {setDoc, doc} from 'firebase/firestore';

class PurchaseCompleted extends Component {

    static contextType = AuthContext;

    constructor(props) {
        super(props);

        this.state = {
            authUID: this.context?.uid || null,
            discord: new Discord(),
            eligibleForDiscountCode: false,
            friendCode: null,
        };
    };

    async componentDidMount() {

        //set the auth uid
        this.setState({authUID: this.context.uid});

        //if this page was loaded, then the user must have made a purchase, empty their basket and delete the stripe session saved in session storage
        //only do these actions if the purchase was new
        if (sessionStorage.getItem('newPurchase')?.length > 0) {
            
            //save a value to state indicating that the purchase was valid
            this.setState({eligibleForDiscountCode: true});

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
                <div>
                    <GenericMarkupSection heading="Well done!"
                    paragraph={`Your purchase was successful! We'll get to work building your perfect PC to get you in the game as soon as possible! We'll email you at ${this.context.email} with your purchase progress.\n\nIf you have any questions, please do not hesitate to contact us at hunterpcsuk@gmail.com`}
                    left={true}
                    imagePath="images/gamingSetupWIDE2.jpeg" />
                </div>

                <DividerLine purple={false} />

                {/*tell-a-friend section*/}
                <div>
                    <GenericMarkupSection heading="Tell a friend"
                    paragraph="Now that you've completed your purchase, you can get your friend 10% off their purchase. Just click the button below, then send your friend the code. Once they make a purchase using the code, they'll get their discount and you'll get your partial refund!"
                    left={false}
                    imagePath="images/2 skulls.png"
                    buttonText="Get your code ⟶"
                    buttonAction={() => {this.getFriendCode()}} />
                </div>

                {/*user's code popup*/}
                <div className={this.state.showCodePopup ? 'popupWrapper shown' : 'popupWrapper'}>
                    <h1>
                        Get your code:
                    </h1>
                    <h2 style={{marginBottom: 0, paddingBottom: 0, whiteSpace: 'pre-wrap'}}>
                        Your code is: {'\n'}
                        {this.state.friendCode}
                    </h2>
                    <button type="button" onClick={() => {
                        navigator.clipboard.writeText(this.state.friendCode);
                    }} >
                        <h3 style={{marginTop: '10px', paddingTop: 0}}>
                            Click here to copy it ⟶
                        </h3>
                    </button>
                    <p>
                        Send it to your friend and they'll get 10% off!
                    </p>
                </div>
            </React.Fragment>
        );
    };

    async getFriendCode() {

        //will fire when the user presses the 'get code' button
        //only run if a purchase was actually made
        if (this.state.eligibleForDiscountCode || true) {

            //first, generate the code, it should be in the form XXXX-XXXX-XXXX-XXXX-XXXX with random numbers or letters
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuv0123456789';
            let code = '';
    
            for (let chunk = 0; chunk < 5; chunk++) {
    
                //repeat for each chunk of 'XXXX'
                for (let char = 0; char < 4; char++) {
    
                    //repeat for each individual character in the chunk
                    //get random characters from characters and add it to the code
                    const index = Math.floor(Math.random() * characters.length);
                    code += characters[index];
                };
    
                //add a hyphen every 4 characters (but not at the end)
                if (chunk != 4) {
                    code += '-';
                };
            };
    
            //code has been generated, save it to firestore
            if (!this.state.authUID) {
                throw new Error('User not logged in');
            }
            const firestore = firebaseInstance.getFirebaseFirestore;
            await setDoc(doc(firestore, 'discountCodes', this.state.authUID), {
                code: code,
                discountMultiplier: 0.9,
            });

            //code saved to firestore, show the user the code
            this.setState({
                friendCode: code,
                showCodePopup: true,
            });

            //make sure the user can only generate one code
            this.setState({eligibleForDiscountCode: false});
        }
        else {
            throw new Error('Not eligible for discount');
        }
    };
};

export default PurchaseCompleted;