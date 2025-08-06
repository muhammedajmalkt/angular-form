'use client';

import axiosInstance from '@/api/axiosInstance';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const LoginPage = () => {
    const router = useRouter()
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        }
        );
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('user/login', formData);
            console.log(response.data);

             localStorage.setItem('user', JSON.stringify(response.data.user));
             router.push('/home'); 

        } catch (error) {
            console.error(error.response?.data || error.message);
            alert(error.message)
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <form
                onSubmit={handleLogin}
                className="p-8 rounded-lg shadow-md w-full max-w-sm"
            >
                <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-500 mb-1">
                        Username
                    </label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        required
                        placeholder="Enter your username"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-500 mb-1">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        required
                        placeholder="Enter your password"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition duration-200"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
