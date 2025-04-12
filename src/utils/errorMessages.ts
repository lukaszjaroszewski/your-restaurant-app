
/**
 * Utility function to convert Firebase auth error codes to user-friendly messages
 */
export const getAuthErrorMessage = (errorCode: string): string => {
  switch (errorCode) {
    // Sign In Errors
    case 'auth/invalid-credential':
    case 'auth/user-not-found':
    case 'auth/wrong-password':
      return 'Invalid email or password. Please try again.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/user-disabled':
      return 'This account has been disabled. Please contact support.';
    case 'auth/too-many-requests':
      return 'Too many failed login attempts. Please try again later.';
      
    // Sign Up Errors
    case 'auth/email-already-in-use':
      return 'An account with this email already exists.';
    case 'auth/weak-password':
      return 'Password is too weak. Please use at least 6 characters.';
      
    // Password Reset Errors
    case 'auth/missing-email':
      return 'Please enter your email address.';
      
    // General Errors
    case 'auth/network-request-failed':
      return 'Network error. Please check your connection and try again.';
    case 'auth/internal-error':
      return 'An internal error occurred. Please try again later.';
    case 'auth/operation-not-allowed':
      return 'This operation is not allowed.';
      
    default:
      return 'An error occurred. Please try again.';
  }
};

/**
 * Extract error code from Firebase error message
 */
export const extractErrorCode = (errorMessage: string): string => {
  // Pattern for Firebase errors like: "Firebase: Error (auth/email-already-in-use)."
  const match = errorMessage.match(/\(([^)]+)\)/);
  if (match && match[1]) {
    return match[1];
  }
  return 'unknown-error';
};
