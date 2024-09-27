import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import AllRoutes from './routes.jsx';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/authContext.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthProvider>

      <AllRoutes />
      
    </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
