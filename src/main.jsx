import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/main.css';
import './css/Header_Footer.css';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import App from './App.jsx';  

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Header />
    <App /> 
    <Footer />
  </React.StrictMode>
);
