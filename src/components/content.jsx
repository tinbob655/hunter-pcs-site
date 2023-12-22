import React, {Component} from 'react';
import { Route, Routes} from 'react-router-dom';

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
import PrivacyPolicy from './sections/support/privacyPolicy.jsx';
import CustomPcPurchaseSucsessful from './sections/pcs/custom/customPcPurchaseSucsessful.jsx';

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
            <Routes>
                {this.getRoutes()}
            </Routes>
        );
    };

    getRoutes() {
        const allPages = {
            about: <About/>,
            account: <Account/>,
            basket: <Basket/>,
            pcsMain: <PcsMain/>,
            customPcs: <CustomPcs/>,
            referAFriend: <ReferAFriend/>,
            support: <Support/>,
            productPage: <ProductPage/>,
            paymentSucsessful: <PaymentSucsessful/>,
            privacyPolicy: <PrivacyPolicy/>,
            customPcPurchaseSucsessful: <CustomPcPurchaseSucsessful/>,
        };
        let routeHTML = [];

        //make home the default route
        routeHTML.push(
            <Route path='/' element={<Home/>}/>
        );

        //push all the other routes
        Object.keys(allPages).forEach((page) => {

            routeHTML.push (
                <Route exact path={'/'+Object.keys(allPages)[Object.keys(allPages).indexOf(page)]} element={allPages[page]} />
            );
        });

        routeHTML.push(
            <Route exact path={'/pcsMain/ProductPage'} element={<ProductPage/>}></Route>
        );

        return routeHTML;
    };
};

export default Content;