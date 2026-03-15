import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AdminLayout } from './components/layout/AdminLayout';
import { DashboardPage } from './pages/DashboardPage';
import { ProductsPage } from './pages/ProductsPage';
import { OrdersPage } from './pages/OrdersPage';
import { UsersPage } from './pages/UsersPage';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AdminLayout />}>
                    <Route index element={<DashboardPage />} />
                    <Route path="products" element={<ProductsPage />} />
                    <Route path="orders" element={<OrdersPage />} />
                    <Route path="users" element={<UsersPage />} />
                    <Route path="settings" element={<div className="flex items-center justify-center h-full text-gray-400"><h2 className="text-2xl">Settings (Coming Soon)</h2></div>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
