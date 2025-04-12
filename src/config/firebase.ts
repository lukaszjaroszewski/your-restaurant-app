
import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence, inMemoryPersistence } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgM34sao-8lAjmMSePzCcNGVeNCq9b48A",
  authDomain: "restaurantapp-979a5.firebaseapp.com",
  projectId: "restaurantapp-979a5",
  storageBucket: "restaurantapp-979a5.firebasestorage.app",
  messagingSenderId: "310480728314",
  appId: "1:310480728314:web:f54048cc11f68ba534d943",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Set persistence based on platform
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
  typeof navigator !== 'undefined' ? navigator.userAgent : ''
);

// Set appropriate persistence method
if (typeof window !== 'undefined') {
  setPersistence(auth, isMobile ? inMemoryPersistence : browserLocalPersistence)
    .catch((error) => {
      console.error("Auth persistence error:", error);
    });
}

export { auth };
