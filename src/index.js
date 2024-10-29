import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import AllRoutes from './routes.jsx';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/authContext.jsx';
import Header from './components/multiPageComponents/header.jsx';
import Footer from './components/multiPageComponents/footer.jsx';
import ScrollToTop from './components/multiPageComponents/scrollToTop.jsx';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { MobileProvider } from './context/mobileContext.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <Analytics/>
    <SpeedInsights/>

    <BrowserRouter>
    
    <ScrollToTop />

    <AuthProvider>
      <MobileProvider>

        <Header />
        <div style={{marginTop: window.innerWidth >= window.innerHeight ? '125px' : '70px'}} id="pageContentWrapper">
        <AllRoutes />
        </div>
        <Footer />

      </MobileProvider>
    </AuthProvider>

    </BrowserRouter>
  </React.StrictMode>
);
