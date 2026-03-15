import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api', // Point to backend
    headers: {
        'Content-Type': 'application/json',
    },
});

// Auth token interceptor
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Products
export const getProducts = () => api.get('/products');
export const getProductById = (id: string | number) => api.get(`/products/${id}`);
export const createProduct = (data: any) => api.post('/products', data);
export const updateProduct = (id: string | number, data: any) => api.put(`/products/${id}`, data);
export const deleteProduct = (id: string | number) => api.delete(`/products/${id}`);

// Orders
export const getOrders = () => api.get('/orders');
export const updateOrderStatus = (id: string, status: string) => api.put(`/orders/${id}/status`, { status });

// Users
export const getUsers = () => api.get('/users');
export const deleteUser = (id: string) => api.delete(`/users/${id}`);

export default api;
