import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import AllRoutes from './routes.jsx';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/authContext.jsx';
import Header from './components/multiPageComponents/header.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthProvider>

      <Header />
      <div style={{marginTop: '125px'}}>
      <AllRoutes />
      </div>
      
    </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
