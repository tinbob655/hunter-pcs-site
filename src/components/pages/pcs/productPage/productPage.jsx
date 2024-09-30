import React, {Component} from 'react';
import DividerLine from '../../../multiPageComponents/dividerLine.jsx';
import SmartImage from '../../../multiPageComponents/smartImage.jsx';
import FancyButton from '../../../multiPageComponents/fancyButton.jsx';
import Product from '../../../../classes/product.js';

class ProductPage extends Component {

    constructor(props) {
        super(props);

        //if there was no product, throw an error
        if (!sessionStorage.getItem('product')) {
            throw new Error('No product found in session storage.');
        };

        this.state = {
            productName: sessionStorage.getItem('product'),
            productData: null
        };
    };

    componentDidMount() {

        //instantiate a product to get product data from firestore
        const thisProduct = new Product(this.state.productName);
        thisProduct.getProductDetails().then((details) => {
            
            //save product data to state
            this.setState({productData: details});
        });
    };

    render() {
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

                                    {/*purchase button*/}
                                    <div style={{maxWidth: '75%', marginTop: '50px', marginLeft: 'auto', marginRight: 'auto'}}>
                                        <FancyButton title="Buy now" action={() => {this.purchaseButtonPressed()}} />
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
                </div>
            </React.Fragment>
        );
    };

    purchaseButtonPressed() {
        
        //will fire when the user clicks the 'buy now' button
    };
};

export default ProductPage;