import React, {Component} from 'react';
import { getDoc, doc, getFirestore } from 'firebase/firestore';
import { firebaseInit } from '../../../../firebase.js';
import { renderIfLoaded, changePage } from '../../../../index.js';
import '../pcsStyles.scss';

firebaseInit();

class ProductPage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            product: sessionStorage.getItem('product'),
            frontendName: undefined,
            price: undefined,
            subheaderDescription: undefined,
            fullDescription: undefined,
            fullSystemSpec: undefined,
            productImageURL: 'https://firebasestorage.googleapis.com/v0/b/hunter-pcs-firebase.appspot.com/o/images%2Fimage%20of%20pc.jpeg?alt=media&token=057583b8-036a-4ffd-9657-58e010d7e8e8',
             //for now this is just a stock image until product images are available
        };
    };

    async componentDidMount() {
        //get the product data from firestore
        const database = getFirestore();
        let docRef = doc(database, 'products', sessionStorage.getItem('product'));
        let docSnap = await getDoc(docRef);

        const dataToFetch = ['frontendName', 'price', 'subheaderDescription', 'fullDescription', 'fullSystemSpec'];

        //fetch all data and add it to state
        dataToFetch.forEach((item) => {
            this.setState ({
                [item]: docSnap.data()[item],
            });
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
                    {renderIfLoaded('Hunter '+this.state.frontendName)}
                </h1>
                <table>
                    <tr>
                        <td>
                            <h2 className="alignRight">
                                {renderIfLoaded(this.state.subheaderDescription)}
                            </h2>
                            <p className="alignLeft">
                                {renderIfLoaded(this.state.fullDescription)}
                            </p>
                            <button type="button" onClick={function() {
                                //ADD THE PRODUCT TO THE BASKET
                                changePage('basket');
                            }}></button>
                        </td>

                        <td>
                            <img src={this.state.productImageURL} style={{width: '85%'}}  className="mainImage centered" alt="loading"/>
                            <h2>
                                {renderIfLoaded("£ "+this.state.price)}
                            </h2>
                        </td>
                    </tr>
                </table>
                
                <div className="purpleGrey"></div>
                
                <button type="button" onClick={function() {const specDiv = document.getElementById('fullSpecDiv');
                                                            specDiv.classList.toggle('shown')}}>
                    <h3>
                        Show full spec ⟶
                    </h3>
                </button>
                <div id="fullSpecDiv">
                    <div style={{width: '75%', margin: 'auto'}}>
                        {this.displaySystemSpecAsString()}
                    </div>
                </div>
            </React.Fragment>
        );
    };

    displaySystemSpecAsString() {
        //only run if a value has been found
        if (this.state.fullSystemSpec) {
            let specHTML = [<h2>
                {"This "+this.state.frontendName+" could be yours"}
            </h2>];
            let spec = this.state.fullSystemSpec;

            let onLeft = true;
            for (let key in spec) {
                let pcComponent = key.charAt(0).toUpperCase() + key.slice(1);
                specHTML.push(
                    <p className={onLeft == true ? "alignLeft" : "alignRight"}>
                        {
                        '-'
                        +String(pcComponent)
                        +': '
                        +String(spec[key])
                        }
                    </p>
                );
                onLeft = !onLeft;
            };

            return specHTML;
        }

        //if the database fails
        else return "We're having trouble getting your pc components at the moment. Please try again by refreshing this page"
    }
};

export default ProductPage;