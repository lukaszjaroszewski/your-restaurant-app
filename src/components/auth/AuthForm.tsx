
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Button from '@/components/common/Button';
import { signIn, signUp } from '@/services/auth.service';
import { useAuth } from '@/contexts/AuthContext';
import { extractErrorCode, getAuthErrorMessage } from '@/utils/errorMessages';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface AuthFormProps {
  mode: 'login' | 'signup';
}

const AuthForm: React.FC<AuthFormProps> = ({ mode }) => {
  const navigate = useNavigate();
  const { setCurrentUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Form validation
    if (!email || !password) {
      setError('Please fill in all required fields');
      return;
    }
    
    if (mode === 'signup') {
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      
      if (!name) {
        setError('Please enter your name');
        return;
      }
    }
    
    setLoading(true);
    
    try {
      if (mode === 'login') {
        const user = await signIn(email, password);
        setCurrentUser(user);
        toast.success('Logged in successfully!');
      } else {
        const user = await signUp(email, password, name);
        setCurrentUser(user);
        toast.success('Account created successfully!');
      }
      navigate('/');
    } catch (error: any) {
      console.error('Auth error:', error);
      const errorCode = extractErrorCode(error.message);
      const userFriendlyMessage = getAuthErrorMessage(errorCode);
      setError(userFriendlyMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md mx-auto">
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
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
            onClick={() => navigate('/forgot-password')}
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
