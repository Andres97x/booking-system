import { useState } from 'react';
import {
  doc,
  collection,
  getDocs,
  orderBy,
  query,
  deleteDoc,
  writeBatch,
} from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';

import { db, storage } from '../configs/firebase';

const useDashboardDeleteCategory = () => {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  const updateOrderAfterDeleteCategory = async (
    collectionName,
    docId,
    docOrder
  ) => {
    const collectionRef = collection(db, collectionName);
    const q = query(collectionRef, orderBy('order'));

    try {
      const snapshot = await getDocs(q);

      const batch = writeBatch(db);

      // Loop over documents and update the order as necessary
      snapshot.forEach(docSnap => {
        const docRef = doc(collectionRef, docSnap.id);
        if (docSnap.id !== docId) {
          // Update the other documents to keep the correct order
          // if currently looped document's order is greater than the selected docOrder, set the order field to docSnap.data().order - 1

          if (docSnap.data().order > docOrder) {
            batch.update(docRef, { order: docSnap.data().order - 1 });
          }
        }
      });

      // Execute batch transaction
      await batch.commit();
    } catch (err) {
      throw err;
    }
  };

  const deleteCategory = async (categoriesId, imageRef, order) => {
    setError(null);

    try {
      setStatus('loading');
      // delete the data from database
      await deleteDoc(doc(db, 'categories', categoriesId));

      // delete image from storage
      const categoryImageRef = ref(storage, imageRef);

      await deleteObject(categoryImageRef);

      // re-order the other categories
      updateOrderAfterDeleteCategory('categories', categoriesId, order);

      /* TODO delete all items linked to this category */

      setStatus('completed');

      setTimeout(() => {
        const modal = document.getElementById('modal-delete-category');
        if (!modal) return;

        modal.close();
      }, 1200);
    } catch (err) {
      setError('Ocurrió un error, no se ha podido eliminar la categoría');
      setStatus('idle');
    }
  };

  return { status, setStatus, error, setError, deleteCategory };
};

export default useDashboardDeleteCategory;
