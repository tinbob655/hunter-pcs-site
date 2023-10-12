import React, {Component} from 'react';

//import all pages
import Home from './sections/home/home.jsx';
import About from './sections/about/about.jsx';
import Account from './sections/account/account.jsx';
import Basket from './sections/basket/basket.jsx';
import Checkout from './sections/basket/checkout/checkout.jsx';
import PcsMain from './sections/pcs/pcsMain.jsx';
import CustomPcs from './sections/pcs/custom/customPcs.jsx';
import PreBuiltPcs from './sections/pcs/prebuilt/prebuiltPcs.jsx';
import ReferAFriend from './sections/referAFriend/referAFriend.jsx';
import SignUpLogIn from './sections/signUpLogIn/signUpLogIn.jsx';
import Support from './sections/support/support.jsx';

class Content extends Component {

    render() {
        return (
            <React.Fragment>
                {this.getContent()}
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
            checkout: <Checkout/>,
            pcsMain: <PcsMain/>,
            customPcs: <CustomPcs/>,
            preBuiltPcs: <PreBuiltPcs/>,
            referAFriend: <ReferAFriend/>,
            signUpLogIn: <SignUpLogIn/>,
            support: <Support/>,
        };

        //now return the page to be displayed
        return allPages[currentPage];
    };
};

export default Content;