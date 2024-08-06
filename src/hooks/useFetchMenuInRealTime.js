import { useEffect } from 'react';
import { db } from '../configs/firebase';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
} from 'firebase/firestore';

const useFetchMenuInRealTime = ({
  type,
  selectedCategoryId,
  fetchOrderCriteria,
  stateSetterFn,
  setLoading,
  setError,
}) => {
  useEffect(() => {
    const collectionRef = collection(
      db,
      type === 'category' ? 'categories' : 'items'
    );
    let q;

    if (type === 'category') {
      q = query(collectionRef, orderBy(fetchOrderCriteria));
    } else {
      q = query(
        collectionRef,
        where('categoryId', '==', selectedCategoryId),
        orderBy(fetchOrderCriteria, 'desc')
      );
    }

    const unsubscribe = onSnapshot(
      q,
      querySnapshot => {
        const retrievedData = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        }));

        stateSetterFn(retrievedData);
        setLoading(false);
      },
      error => {
        console.error(error);
        setError(
          'Hubo un problema al obtener los datos, por favor reporta este problema.'
        );
        setLoading(false);
      }
    );

    return () => unsubscribe;
  }, []);
};

export default useFetchMenuInRealTime;
