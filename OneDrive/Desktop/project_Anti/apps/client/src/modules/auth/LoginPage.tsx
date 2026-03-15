import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '@/lib/api';
import { Button } from '@/components/ui/Button';

export const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await api.post('/auth/login', { email, password });
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user)); // Simple user storage
            navigate('/');
            // Ideally trigger a refresh of auth state in context
            window.location.reload();
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-32 pb-12 flex flex-col items-center justify-center bg-stone-50 px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-sm shadow-sm border border-stone-200">
                <h1 className="font-serif text-3xl text-center mb-8 text-stone-900">Sign In</h1>

                {error && (
                    <div className="bg-red-50 text-red-600 p-3 mb-4 text-sm rounded-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full p-3 border border-stone-200 rounded-sm focus:border-stone-900 outline-none transition-colors"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full p-3 border border-stone-200 rounded-sm focus:border-stone-900 outline-none transition-colors"
                        />
                    </div>

                    <Button type="submit" className="w-full h-12" disabled={loading}>
                        {loading ? 'Signing In...' : 'Sign In'}
                    </Button>
                </form>

                <p className="mt-6 text-center text-sm text-stone-500">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-stone-900 font-medium hover:underline">
                        Create one
                    </Link>
                </p>
            </div>
        </div>
    );
};
