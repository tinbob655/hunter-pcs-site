import React, {Component} from 'react';
import { Route, Routes} from 'react-router-dom';

//import all pages
import Home from './pages/home/home.jsx';
import About from './pages/about/about.jsx';
import Account from './pages/account/account.jsx';
import Basket from './pages/basket/basket.jsx';
import PcsMain from './pages/pcs/pcsMain.jsx';
import CustomPcs from './pages/pcs/custom/customPcs.jsx';
import ReferAFriend from './pages/referAFriend/referAFriend.jsx';
import Support from './pages/support/support.jsx';
import ProductPage from './pages/pcs/prebuilt/productPage.jsx';
import PaymentSucsessful from './pages/basket/paymentSucsessful.jsx';
import PrivacyPolicy from './pages/support/privacyPolicy.jsx';
import CustomPcPurchaseSucsessful from './pages/pcs/custom/customPcPurchaseSucsessful.jsx';

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