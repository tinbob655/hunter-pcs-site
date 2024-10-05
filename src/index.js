import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import AllRoutes from './routes.jsx';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/authContext.jsx';
import Header from './components/multiPageComponents/header.jsx';
import ScrollToTop from './components/multiPageComponents/scrollToTop.jsx';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Analytics/>
    <SpeedInsights/>
    <BrowserRouter>
    <ScrollToTop />
    <AuthProvider>

      <Header />
      <div style={{marginTop: '125px'}}>
      <AllRoutes />
      </div>
      
    </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
