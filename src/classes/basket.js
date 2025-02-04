import firebaseInstance from "./firebase.js";
import {getDoc, doc, query, collection, getDocs, increment, updateDoc} from 'firebase/firestore';

//had to call this class FirestoreBasket not Basket because there is a different class called Basket
class FirestoreBasket {
    #basketItems;
    #uid;
    #prices;
    #ready;

    constructor(uid) {
        this.#uid = uid;
        this.#basketItems = [];
        this.#prices = {};

        //make the data initially unavailable, until init() is called
        this.#ready = false;
    };

    async init() {

        //fetch the user's basket from firestore
        const firestore = firebaseInstance.getFirebaseFirestore;
        const basketDocument = await getDoc(doc(firestore, `baskets/${this.#uid}`));
        const data = basketDocument.data();

        //only save if data exists
        if (data) {

            //only allow saving if data is a map (object)
            if (typeof(data) === 'object') {
                
                //save the data to the class
                this.#basketItems = data;
            }
            else {
                throw new Error('Basket data is not a map (object)');
            };
        }
        else {
            throw new Error('Could not fetch basket data');
        }

        //now fetch the price of each product
        const priceDocs = await getDocs(query(collection(firestore, 'products')));
        priceDocs.forEach((doc) => {
            this.#prices[doc.id] = doc.data().price;
        });

        //allow access to class data
        this.#ready = true;
    };

    //getter to return all items in the user's basket
    get getBasketItems() {
        if (this.#ready) {
            return this.#basketItems;
        }
        else {
            throw new Error('Basket is not ready yet, call init()');
        }
    };

    //getter to return the total cost of all items in the user's basket
    get getTotalBasketCost() {
        if (this.#ready) {
            let totalCost = 0;
    
            //repeat for each item in the user's basket
            Object.keys(this.#basketItems).forEach((item) => {
    
                //add the quantity of the item multiplied by its cost to totalCost
                totalCost += (this.#basketItems[item] * this.#prices[item]);
            });
            return totalCost;
        }
        else {
            throw new Error('Basket is not ready yet, call init()');
        }
    };

    get getPrices() {
        if (this.#ready) {
            return this.#prices;
        }
        else {
            throw new Error('Basket is not ready yet, call init()');
        };
    };

    //method to add an item to the user's basket
    /**
     * @param {string} itemName
     */
    addItemToBasket(itemName) {
        if (this.#ready) {

            //make sure the itemName is valid
            if (Object.keys(this.#prices).includes(itemName)) {
    
                //the item name is valid
                //make sure that the total cost of the items in the user's basket is not greater than the maximum stripe cost
                if (this.getTotalBasketCost() >= 99999.99) {

                    //the basket is past the max size, clear it
                    this.resetBasket();
                };

                //TEMPORARY: the almighty pc is currently out of stock, do not allow a user to add it to the basket
                if (itemName == 'almightyPc') {
                    throw new Error('This product is currently out of stock. Please check again later.');
                };
                
                //add the items to the user's basket
                const firestore = firebaseInstance.getFirebaseFirestore
                updateDoc(doc(firestore, 'baskets', this.#uid), {
                    [itemName]: increment(1),
                });
    
                //NEED TO ALSO UPDATE THE LOCAL COPY OF THE BASKET WHEN SETTERS ARE CALLED (CAN MAKE AN ERROR FOR WORD DOC OUT OF THIS)
            }
            else {
    
                //the item name is not valid
                throw new Error('Invalid basket item name');
            }
        }
        else {
            throw new Error('Basket is not ready yet, call init()');
        }
    };

    async resetBasket() {
        if (this.#ready) {

            //set all values in the user's basket to 0
            const firestore = firebaseInstance.getFirebaseFirestore;
            await updateDoc(doc(firestore, 'baskets', this.#uid), {
                solidPc: 0,
                strongPc: 0,
                powerfulPc: 0,
                supremePc: 0,
                dominantPc: 0,
                almightyPc: 0,
            });
        }
        else {
            throw new Error('Basket is not ready yet, call init()');
        }
    };
};

export default FirestoreBasket;