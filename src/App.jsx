import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './components/home/Home';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Clients from './pages/Clients';
import Dashboard from './pages/Dashboard';
import Impact from './pages/Impact';
import Perfumery from './pages/Perfumery';
import CategoryProducts from './pages/CategoryProducts';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import Consultant from './pages/Consultant';
import LoginProfessional from './pages/LoginProfessional';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminConsultants from './pages/admin/AdminConsultants';
import AdminOrders from './pages/admin/AdminOrders';
import AdminClients from './pages/admin/AdminClients';
import AdminSettings from './pages/admin/AdminSettings';
import ConsultantLayout from './components/consultant/ConsultantLayout';
import ConsultantDashboard from './pages/consultant/ConsultantDashboard';
import ConsultantCustomers from './pages/consultant/ConsultantCustomers';
import ConsultantCatalog from './pages/consultant/ConsultantCatalog';
import ConsultantOrders from './pages/consultant/ConsultantOrders';
import ConsultantNewOrder from './pages/consultant/ConsultantNewOrder';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import ClientRecommendations from './pages/ClientRecommendations';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="perfumeria" element={<Perfumery />} />
              <Route path="category/:slug" element={<CategoryProducts />} />
              <Route path="product/:id" element={<ProductDetail />} />
              <Route path="cart" element={<Cart />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="recommendations" element={<ClientRecommendations />} />
              {/* Future routes: /academy */}
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/consultora" element={<Consultant />} />
            <Route path="/professional-login" element={<LoginProfessional />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="consultants" element={<AdminConsultants />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="clients" element={<AdminClients />} />
              <Route path="settings" element={<AdminSettings />} />
              {/* Add more admin routes here as needed */}
            </Route>

            {/* Consultant Routes */}
            <Route path="/consultant" element={<ConsultantLayout />}>
              <Route path="dashboard" element={<ConsultantDashboard />} />
              <Route path="customers" element={<ConsultantCustomers />} />
              <Route path="catalog" element={<ConsultantCatalog />} />
              <Route path="orders" element={<ConsultantOrders />} />
              <Route path="new-order" element={<ConsultantNewOrder />} />
              {/* Add more consultant routes here as needed */}
            </Route>
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
