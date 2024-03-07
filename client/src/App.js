// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ClientPage from './components/clients/ClientPage';
import ProductsPage from './components/products/ProductsPage';
import CategoryPage from './components/categories/CategoryPage';
import OrderDetailsPage from './components/orderDetails/OrderDetailsPage';
import OrderPage from './components/orders/OrderPage';
import ProviderPage from './components/providers/ProviderPage';
import UserPage from './components/users/UserPage';
import SalesPage from './components/sales/SalesPage';
import Home from './components/Home';
import Login from './components/Login'; // Agrega la importación de Login

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/clients" element={<ClientPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/categories" element={<CategoryPage />} />
        <Route path="/orderDetails" element={<OrderDetailsPage />} />
        <Route path="/orders" element={<OrderPage />} />
        <Route path="/providers" element={<ProviderPage />} />
        <Route path="/users" element={<UserPage />} />
        <Route path="/sales" element={<SalesPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} /> {/* Agrega esta línea para la ruta principal */}
      </Routes>
    </Router>
  );
}

export default App;
