
import React from 'react';
import AuthForm from '@/components/auth/AuthForm';

const Signup = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-restaurant-cream">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-restaurant-secondary mb-2">Create Account</h1>
        <p className="text-gray-600">Sign up to enjoy our delicious meals</p>
      </div>
      
      <AuthForm mode="signup" />
    </div>
  );
};

export default Signup;
