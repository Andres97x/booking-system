import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCQ3Av-NrzkZmNjUYbfb9T0YxjTw9wwbtU',
  authDomain: 'booking-app-4fbe0.firebaseapp.com',
  projectId: 'booking-app-4fbe0',
  storageBucket: 'booking-app-4fbe0.appspot.com',
  messagingSenderId: '1045373632458',
  appId: '1:1045373632458:web:b41fd9a65ab28b48b15933',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
