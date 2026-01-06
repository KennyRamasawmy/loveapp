import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

export const useAppData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const docRef = doc(db, 'app', 'data');
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setData(docSnap.data());
      } else {
        setError('No data found');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const saveData = async (newData) => {
    try {
      const docRef = doc(db, 'app', 'data');
      await setDoc(docRef, newData);
      setData(newData);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, saveData, refetch: fetchData };
};