
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/sonner';
import Button from '@/components/common/Button';

interface AuthFormProps {
  mode: 'login' | 'signup';
}

const AuthForm: React.FC<AuthFormProps> = ({ mode }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!email || !password) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    if (mode === 'signup') {
      if (password !== confirmPassword) {
        toast.error('Passwords do not match');
        return;
      }
      
      if (!name) {
        toast.error('Please enter your name');
        return;
      }
    }
    
    setLoading(true);
    
    // Simulate auth for demonstration
    try {
      // In a real app, this would connect to Firebase Auth
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate login success
      localStorage.setItem('user', JSON.stringify({ 
        email, 
        name: mode === 'signup' ? name : 'Demo User',
        id: 'user123'
      }));
      
      toast.success(mode === 'login' ? 'Logged in successfully!' : 'Account created successfully!');
      navigate('/');
    } catch (error) {
      console.error('Auth error:', error);
      toast.error('Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md mx-auto">
      {mode === 'signup' && (
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field"
            placeholder="Enter your full name"
          />
        </div>
      )}
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
          placeholder="Enter your email"
          required
        />
      </div>
      
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
          placeholder={mode === 'signup' ? 'Create a password' : 'Enter your password'}
          required
        />
      </div>
      
      {mode === 'signup' && (
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input-field"
            placeholder="Confirm your password"
            required
          />
        </div>
      )}
      
      {mode === 'login' && (
        <div className="text-right">
          <button 
            type="button" 
            className="text-sm text-restaurant-primary font-medium"
            onClick={() => toast.info('Password reset functionality would go here')}
          >
            Forgot password?
          </button>
        </div>
      )}
      
      <Button 
        type="submit" 
        fullWidth 
        disabled={loading}
        className="mt-6"
      >
        {loading ? 'Please wait...' : mode === 'login' ? 'Log In' : 'Sign Up'}
      </Button>
      
      <div className="text-center mt-4">
        {mode === 'login' ? (
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <button 
              type="button"
              onClick={() => navigate('/signup')}
              className="text-restaurant-primary font-medium"
            >
              Sign Up
            </button>
          </p>
        ) : (
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <button 
              type="button"
              onClick={() => navigate('/login')}
              className="text-restaurant-primary font-medium"
            >
              Log In
            </button>
          </p>
        )}
      </div>
    </form>
  );
};

export default AuthForm;
