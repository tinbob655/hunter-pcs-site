import React, {Component} from 'react';

//import all pages
import Home from './sections/home/home.jsx';
import About from './sections/about/about.jsx';
import Account from './sections/account/account.jsx';
import Basket from './sections/basket/basket.jsx';
import PcsMain from './sections/pcs/pcsMain.jsx';
import CustomPcs from './sections/pcs/custom/customPcs.jsx';
import ReferAFriend from './sections/referAFriend/referAFriend.jsx';
import Support from './sections/support/support.jsx';
import ProductPage from './sections/pcs/prebuilt/productPage.jsx';
import PaymentSucsessful from './sections/basket/paymentSucsessful.jsx';

class Content extends Component {

    componentDidMount() {
        setTimeout(() => {
            window.scrollTo(0, 0);
            document.body.style.visibility = 'visible';
            document.body.style.opacity = 1.0;
        }, 1000);
    };

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
            pcsMain: <PcsMain/>,
            customPcs: <CustomPcs/>,
            referAFriend: <ReferAFriend/>,
            support: <Support/>,
            productPage: <ProductPage/>,
            paymentSucsessful: <PaymentSucsessful/>
        };

        //now return the page to be displayed
        return allPages[currentPage];
    };
};

export default Content;