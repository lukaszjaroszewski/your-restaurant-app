
import React from 'react';
import AuthForm from '@/components/auth/AuthForm';

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-restaurant-cream">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-restaurant-secondary mb-2">Welcome Back</h1>
        <p className="text-gray-600">Sign in to your account to continue</p>
      </div>
      
      <AuthForm mode="login" />
    </div>
  );
};

export default Login;
