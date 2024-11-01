import firebaseInstance from "./firebase.js";
import {getDoc, doc} from 'firebase/firestore';

class Product {
    #productName;
    
    constructor(productName) {
        this.#productName = productName;
    };

    async getProductDetails() {

        //fetch the product data from firestore
        const firestore = firebaseInstance.getFirebaseFirestore;
        const details = (await getDoc(doc(firestore, `products/${this.#productName}Pc`))).data();
        return ({
            frontendName: details.frontendName,
            fullDescription: details.fullDescription,
            fullSystemSpec: details.fullSystemSpec,
            price: details.price,
            subheaderDescription: details.subheaderDescription,
        });
    };
};

export default Product;