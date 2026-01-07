import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from './config';
import { initialData } from './initData';

export const initializeFirestoreData = async () => {
  try {
    const docRef = doc(db, 'app', 'data');
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      await setDoc(docRef, initialData);
      console.log('✅ Firestore initialized with default data!');
      return true;
    } else {
      console.log('ℹ️ Firestore data already exists.');
      return false;
    }
  } catch (error) {
    console.error('❌ Error initializing Firestore:', error);
    throw error;
  }
};