import React, {Component} from 'react';
import {getFirestore, doc, setDoc} from 'firebase/firestore';

class PaymentSucsessful extends Component {

    async componentDidMount() {

        //save to the databse the proudct that was purchased as well as needed information
        const addressVar = sessionStorage.getItem('address');
        const purchasedProducts = sessionStorage.getItem('purchasedProducts');
        const emailVar = sessionStorage.getItem('email');

        //save the data to firestore
        const db = getFirestore();
        await setDoc(doc(db, 'purchaces', emailVar), {
            email: emailVar,
            address: addressVar,
            products: purchasedProducts,
        });
        
        //after rendering this page, the user is not allowed to render the page again
        setTimeout(() => {
            sessionStorage.setItem('currentPage', 'home');
        }, 1000);
    };

    render() {
        return (
            <React.Fragment>
                <h1 className="alignRight">
                    Payment Sucsessful
                </h1>

                {/*payment sucsessful div*/}
                <div>
                    <table>
                        <tr>
                            <td>
                                <h2 className="alignLeft">
                                    Congratulations!
                                </h2>
                                <p className='alignRight'>
                                    Your payment was sucsessful! We'll get to work building your dream pc to get you in the game as soon as possible!
                                </p>
                            </td>
                            <td style={{width: '40%'}}>
                                <img src='https://firebasestorage.googleapis.com/v0/b/hunter-pcs-firebase.appspot.com/o/images%2FgamingSetupWIDE2.jpeg?alt=media&token=f45440e7-bb17-4e56-9213-6bb178ed49dfhttps://firebasestorage.googleapis.com/v0/b/hunter-pcs-firebase.appspot.com/o/images%2FgamingSetupWIDE2.jpeg?alt=media&token=f45440e7-bb17-4e56-9213-6bb178ed49df'
                                alt="loading..." className="mainImage centered" />
                            </td>
                        </tr>
                    </table>
                </div>
            </React.Fragment>
        );
    };
};

export default PaymentSucsessful;