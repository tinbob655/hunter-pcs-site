import React, {Component} from 'react';
import { getDoc, doc, getFirestore } from 'firebase/firestore';
import { firebaseInit } from '../../../../firebase.js';
import {getStorage, ref, getDownloadURL} from 'firebase/storage';

firebaseInit();

class ProductPage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            product: sessionStorage.getItem('product'),
            frontendProductName: undefined,
            price: undefined,
            subheaderDescription: undefined,
            fullDescription: undefined,
            productImageURL: undefined,
        };
    };

    async componentDidMount() {
        //get the product data from firestore
        const database = getFirestore();
        let docRef = doc(database, 'products', sessionStorage.getItem('product'));
        let docSnap = await getDoc(docRef);
        
        //add the fetched data to state
        this.setState({
            frontendProductName: docSnap.data().frontendName,
            price: "£"+docSnap.data().price,
        });

        //now get the product image from firebase storage
        // const storage = getStorage();
        // getDownloadURL(ref(storage, 'images/productImages/'+sessionStorage.getItem('product')))
        //     .then((url) => {
        //         this.setState({
        //             productImageURL: url,
        //         });
        //     });
        //UNCOMMENT THE ABOVE CODE WHEN PRODUCT IMAGES ARE READY (it has not been tested)
    };

    render() {
        return (
            <React.Fragment>
                {/*PAGE TO ALLOW A USER TO PURCHACE A PRODUCT*/}
                <h1 className="alignRight">
                    Hunter {" "+this.state.frontendProductName}
                </h1>
                <table>
                    <tr>
                        <td>
                            <h2 className="alignRight">
                                {this.state.subheaderDescription}
                            </h2>
                            <p className="alignLeft">
                                {this.state.fullDescription}
                            </p>
                        </td>

                        <td>
                            <img src={this.state.productImageURL} alt="loading"/>
                        </td>
                    </tr>
                </table>
            </React.Fragment>
        );
    };
};

export default ProductPage;