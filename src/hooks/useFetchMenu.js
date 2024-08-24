import { useEffect } from 'react';
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage, db } from '../configs/firebase';

const useFetchMenu = ({
  type,
  selectedCategoryId,
  stateSetterFn,
  setStatus,
  setError,
}) => {
  useEffect(() => {
    // Fetch categories data from database
    const fetchCategoriesData = async () => {
      const collectionRef = collection(db, type);

      let q;

      if (type === 'categories') {
        q = query(collectionRef, orderBy('order'));
      } else {
        q = query(
          collectionRef,
          where('categoryId', '==', selectedCategoryId),
          orderBy('createdAt', 'desc')
        );
      }

      try {
        setStatus('loading');
        const querySnapshot = await getDocs(q);

        const retrievedData = await Promise.all(
          querySnapshot.docs.map(async doc => {
            // Get the image reference
            const pathReference = ref(storage, doc.data().imageRef);
            try {
              const url = await getDownloadURL(pathReference);
              return {
                ...doc.data(),
                id: doc.id,
                image: url,
              };
            } catch (err) {
              console.error(err);
              // Return a fallback object if there's an error
              return {
                ...doc.data(),
                id: doc.id,
                image: null,
              };
            }
          })
        );
        stateSetterFn(retrievedData);
      } catch (err) {
        console.error(err);
        setError('No se pudieron obtener los datos de la categoría');
      } finally {
        setStatus('idle');
      }
    };

    fetchCategoriesData();
  }, []);
};

export default useFetchMenu;
