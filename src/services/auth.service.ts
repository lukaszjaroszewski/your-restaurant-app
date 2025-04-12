
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  updateProfile,
  User
} from 'firebase/auth';
import { auth } from '../config/firebase';

export interface AuthUser {
  email: string;
  name: string;
  id: string;
}

// Safe localStorage functions
const safeRemoveItem = (key: string) => {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(key);
    }
  } catch (error) {
    console.error('localStorage error:', error);
  }
};

export const signUp = async (email: string, password: string, name: string): Promise<AuthUser> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Update user profile with name
    await updateProfile(user, { displayName: name });
    
    return {
      email: user.email || '',
      name: user.displayName || name,
      id: user.uid
    };
  } catch (error: any) {
    throw new Error(error.message || 'Failed to sign up');
  }
};

export const signIn = async (email: string, password: string): Promise<AuthUser> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    return {
      email: user.email || '',
      name: user.displayName || 'User',
      id: user.uid
    };
  } catch (error: any) {
    throw new Error(error.message || 'Failed to sign in');
  }
};

export const signOut = async (): Promise<void> => {
  try {
    await firebaseSignOut(auth);
    safeRemoveItem('user');
  } catch (error: any) {
    throw new Error(error.message || 'Failed to sign out');
  }
};

export const resetPassword = async (email: string): Promise<void> => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error: any) {
    throw new Error(error.message || 'Failed to reset password');
  }
};

export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};
