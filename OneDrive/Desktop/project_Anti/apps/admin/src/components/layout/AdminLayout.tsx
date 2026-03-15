import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Bell, Search, User } from 'lucide-react';

export function AdminLayout() {
    return (
        <div className="flex min-h-screen bg-gray-950 text-white">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <header className="h-16 flex items-center justify-between px-8 bg-gray-900 border-b border-gray-800">
                    <div className="flex items-center bg-gray-800 rounded-md px-3 py-2 w-96">
                        <Search className="text-gray-400 w-5 h-5 mr-2" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="bg-transparent border-none outline-none text-white w-full placeholder-gray-500"
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="text-gray-400 hover:text-white relative p-2 rounded-full hover:bg-gray-800">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>
                        <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center cursor-pointer">
                            <User className="w-5 h-5" />
                        </div>
                    </div>
                </header>
                <main className="flex-1 p-8 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
