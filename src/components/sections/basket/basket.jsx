import React, {Component} from 'react';
import { convertOutOfCamelCase, changePage } from '../../../index.js';

class Basket extends Component {

    render() {
        return (
            <React.Fragment>
                <h1 className="alignRight">
                    Your basket
                </h1>

                {/*list of products the user has in their basket*/}
                <div>
                    <table>
                        <thead>
                            <tr>
                                <td>
                                    <h2 className="alignLeft">
                                        All the stuff you've added, right here:
                                    </h2>
                                    {this.getBasket()}
                                </td>
                                <td>
                                    <img src='https://firebasestorage.googleapis.com/v0/b/hunter-pcs-firebase.appspot.com/o/images%2Fimage%20of%20pc%202.jpeg?alt=media&token=130b9cda-a29c-4e11-a752-d1e68ef07788' 
                                    className="mainImage centered" alt="loading..." />
                                </td>
                            </tr>
                        </thead>
                    </table>
                </div>

                {/*link to checkout page*/}
                <div>
                    <h1 className="alignLeft">
                        Buy now
                    </h1>
                    <table>
                        <thead>
                            <tr>
                                <td>
                                    <img src='https://firebasestorage.googleapis.com/v0/b/hunter-pcs-firebase.appspot.com/o/images%2FgamingSetupWIDE2.jpeg?alt=media&token=f45440e7-bb17-4e56-9213-6bb178ed49df'
                                    className="mainImage centered" alt="loading..." />
                                </td>
                                <td>
                                    <h2 className="alignRight">
                                        Visit the checkout
                                    </h2>
                                    <p className="alignLeft">
                                        Done browsing? Ready to buy? Then visit the checkout, the final step between you and a quality gaming pc. All payments are 100% secure
                                        as per our privacy policy
                                    </p>
                                    <button type="button" onClick={function() {changePage('checkout')}}>
                                        <h3>
                                            Checkout here and get your perfect pc ⟶
                                        </h3>
                                    </button>
                                </td>
                            </tr>
                        </thead>
                    </table>
                </div>
            </React.Fragment>
        );
    };

    getBasket() {
        let basketHTML = [];

        //because an array cannot be stored in local storage, there are many storage locations (0-100) which may be used to store products, combine them
        let basketArray = [];
        for (let i = 0; i < 100; i++) {
            if (localStorage.getItem('hunterPcsProduct'+i)) {
                basketArray.push(convertOutOfCamelCase(localStorage.getItem('hunterPcsProduct'+i)));
            };
        };
        
        //now convert the array to html and return it
        basketArray.forEach((value) => {
            basketHTML.push(<p>-{value}</p>);
        });

        //if the user has not added anything to their basket
        if (basketHTML.length == 0) {
            basketHTML.push(<React.Fragment>
                <button type="button" onClick={function() {changePage('gamingPcs')}}>
                    <h3>
                        Looks like you haven't added anything to your basket. Click here to do something about that
                    </h3>
                </button>
            </React.Fragment>)
        };

        return basketHTML;
    }
};

export default Basket;