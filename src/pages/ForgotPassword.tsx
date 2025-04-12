
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Button from '@/components/common/Button';
import { resetPassword } from '@/services/auth.service';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }
    
    setLoading(true);
    
    try {
      await resetPassword(email);
      toast.success('Password reset email sent. Check your inbox.');
      navigate('/login');
    } catch (error: any) {
      toast.error(error.message || 'Failed to send reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-restaurant-cream">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-restaurant-secondary mb-2">Reset Password</h1>
        <p className="text-gray-600">Enter your email to receive a password reset link</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md mx-auto">
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
        
        <Button 
          type="submit" 
          fullWidth 
          disabled={loading}
          className="mt-6"
        >
          {loading ? 'Sending...' : 'Reset Password'}
        </Button>
        
        <div className="text-center mt-4">
          <button 
            type="button"
            onClick={() => navigate('/login')}
            className="text-restaurant-primary font-medium text-sm"
          >
            Back to Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
