import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import 'react-toastify/dist/ReactToastify.css';
import './index.scss'
import { AuthProvider } from './context/auth.jsx';
import { SearchProvider } from './context/search.jsx';
import { CartProvider } from './context/cart.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <SearchProvider>
      <CartProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter> 
      </CartProvider> 
    </SearchProvider>
  </AuthProvider>,
)
