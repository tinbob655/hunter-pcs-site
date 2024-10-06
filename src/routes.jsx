import React, {Component} from 'react';
import {Route, Routes} from 'react-router-dom';

//import all pages
import Home from './components/pages/home/home.jsx';
import Account from './components/pages/account/account.jsx';
import PcsMain from './components/pages/pcs/pcsMain.jsx';
import ProductPage from './components/pages/pcs/productPage/productPage.jsx';
import About from './components/pages/about/about.jsx';
import Support from './components/pages/support/support.jsx';
import PrivacyPolicy from './components/pages/support/privacyPolicy.jsx';
import TermsOfService from './components/pages/support/termsOfService.jsx';
import Basket from './components/pages/basket/basket.jsx';

class AllRoutes extends Component {

    render() {
        return (
            <Routes>
                {this.getRoutes()}
            </Routes>
        );
    };

    getRoutes() {

        //map of all pages
        const pages = {
            home: <Home />,
            account: <Account />,
            pcsMain: <PcsMain />,
            productPage: <ProductPage />,
            about: <About />,
            support: <Support />,
            privacyPolicy: <PrivacyPolicy />,
            termsOfService: <TermsOfService />,
            basket: <Basket />,
        };
        let routeHTML = [];

        //make the index route
        routeHTML.push(
            <Route path='/' element={<Home/>}/>
        );

        //make all the other routes
        for (let page in pages) {

            routeHTML.push(
                <Route exact path={'/'+page} element={pages[page]} />
            );
        };

        return routeHTML;
    };
};

export default AllRoutes;