import React, {Component} from 'react';

//import all pages
import Home from './sections/home/home.jsx';
import About from './sections/about/about.jsx';
import Account from './sections/account/account.jsx';
import Basket from './sections/basket/basket.jsx';
import PcsMain from './sections/pcs/pcsMain.jsx';
import CustomPcs from './sections/pcs/custom/customPcs.jsx';
import ReferAFriend from './sections/referAFriend/referAFriend.jsx';
import SignUpLogIn from './sections/signUpLogIn/signUpLogIn.jsx';
import Support from './sections/support/support.jsx';
import ProductPage from './sections/pcs/prebuilt/productPage.jsx';
import PaymentSucsessful from './sections/basket/paymentSucsessful.jsx';

import { isMobile } from '../index.js';

class Content extends Component {

    render() {
        return (
            <React.Fragment>
                {/*temporarily disabled site access for mobile*/}
                {isMobile() === true ? (
                    <div style={{width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0, backgroundColor: 'black', zIndex: 99}}>
                        <p style={{marginTop: '40vh', fontSize: '45px'}}>
                            Look mate, I haven't finished the mobile site yet, k? Just rotate landscape and hit refresh arrite (and it ain't gonna look nice)
                        </p>
                    </div>
                ) : this.getContent()}
            </React.Fragment>
        );
    };

    getContent() {
        let currentPage = sessionStorage.getItem('currentPage');

        //if there is no current page set, set it to the default page
        if (currentPage == null) {
            sessionStorage.setItem('currentPage', 'home');
            currentPage = 'home';
        };

        const allPages = {
            home: <Home/>,
            about: <About/>,
            account: <Account/>,
            basket: <Basket/>,
            pcsMain: <PcsMain/>,
            customPcs: <CustomPcs/>,
            referAFriend: <ReferAFriend/>,
            signUpLogIn: <SignUpLogIn/>,
            support: <Support/>,
            productPage: <ProductPage/>,
            paymentSucsessful: <PaymentSucsessful/>
        };

        //now return the page to be displayed
        return allPages[currentPage];
    };
};

export default Content;