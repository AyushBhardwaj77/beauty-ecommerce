import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { HomePage } from '@/modules/home/HomePage';
import { ShopPage } from '@/modules/shop/ShopPage';
import { ProductPage } from '@/modules/product/ProductPage';
import { AboutPage } from '@/modules/pages/AboutPage';
import { JournalPage } from '@/modules/pages/JournalPage';
import { ArticlePage } from '@/modules/pages/ArticlePage';
import { CheckoutPage } from '@/modules/checkout/CheckoutPage';
import { LoginPage } from '@/modules/auth/LoginPage';
import { RegisterPage } from '@/modules/auth/RegisterPage';

import { CartProvider } from '@/context/CartContext';
import { CartDrawer } from '@/modules/cart/CartDrawer';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="antialiased text-stone-900 font-sans selection:bg-[#F2C1C2] selection:text-stone-900">
          <Navbar />
          <CartDrawer />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop/*" element={<ShopPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/journal" element={<JournalPage />} />
            <Route path="/journal/:id" element={<ArticlePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            {/* Add other routes here */}
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
