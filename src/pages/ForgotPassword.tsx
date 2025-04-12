
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { resetPassword } from '@/services/auth.service';
import Button from '@/components/common/Button';
import { toast } from 'sonner';
import { extractErrorCode, getAuthErrorMessage } from '@/utils/errorMessages';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!email) {
      setError('Please enter your email address');
      return;
    }

    setLoading(true);

    try {
      await resetPassword(email);
      // Only set success after confirming the operation worked
      setSuccess(true);
      toast.success('Password reset email sent!');
    } catch (error: any) {
      console.error('Reset password error:', error);
      const errorCode = extractErrorCode(error.message);
      const userFriendlyMessage = getAuthErrorMessage(errorCode);
      setError(userFriendlyMessage);
      setSuccess(false); // Ensure success is false when there's an error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-restaurant-cream">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-restaurant-secondary mb-2">Reset Password</h1>
        <p className="text-gray-600">We'll send you an email with a link to reset your password</p>
      </div>

      {success ? (
        <div className="w-full max-w-md mx-auto">
          <Alert className="mb-6 bg-green-50 border-green-500">
            <AlertDescription className="text-green-700">
              Password reset email sent. Please check your inbox and follow the instructions.
            </AlertDescription>
          </Alert>
          
          <Button 
            fullWidth 
            onClick={() => navigate('/login')}
          >
            Back to Login
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md mx-auto">
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
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
          
          <Button 
            type="submit" 
            fullWidth 
            disabled={loading}
            className="mt-6"
          >
            {loading ? 'Please wait...' : 'Reset Password'}
          </Button>
          
          <div className="text-center mt-4">
            <button 
              type="button"
              onClick={() => navigate('/login')}
              className="text-sm text-restaurant-primary font-medium"
            >
              Back to Login
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;
