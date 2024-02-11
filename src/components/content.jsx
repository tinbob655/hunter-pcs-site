import React, {Component} from 'react';
import { Route, Routes} from 'react-router-dom';

//import all pages
import Home from './pages/home/home.jsx';
import About from './pages/about/about.jsx';
import Basket from './pages/basket/basket.jsx';
import LogIn from './pages/logIn/logIn.jsx';
import PcsMain from './pages/pcs/pcsMain.jsx';
import CustomPcs from './pages/pcs/custom/customPcs.jsx';
import TellAFriend from './pages/tellAFriend/tellAFriend.jsx';
import Support from './pages/support/support.jsx';
import ProductPage from './pages/pcs/prebuilt/productPage.jsx';
import PaymentSucsessful from './pages/basket/paymentSucsessful.jsx';
import PrivacyPolicy from './pages/support/privacyPolicy.jsx';
import TermsOfService from './pages/support/termsOfService.jsx';
import CustomPcPurchaseSucsessful from './pages/pcs/custom/customPcPurchaseSucsessful.jsx';

class Content extends Component {

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
            basket: <Basket/>,
            logIn: <LogIn/>,
            pcsMain: <PcsMain/>,
            customPcs: <CustomPcs/>,
            tellAFriend: <TellAFriend/>,
            support: <Support/>,
            productPage: <ProductPage/>,
            paymentSucsessful: <PaymentSucsessful/>,
            privacyPolicy: <PrivacyPolicy/>,
            termsOfService: <TermsOfService/>,
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