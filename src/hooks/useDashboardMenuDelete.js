import { useState } from 'react';
import {
  doc,
  collection,
  getDocs,
  orderBy,
  query,
  deleteDoc,
  writeBatch,
  where,
} from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';

import { db, storage } from '../configs/firebase';

const useDashboardMenuDelete = type => {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  const updateOrderAfterCategoryDeletion = async (
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

  const deleteItemsAfterCategoryDeletion = async categoryId => {
    const itemsCollectionRef = collection(db, 'items');
    const q = query(itemsCollectionRef, where('categoryId', '==', categoryId));

    try {
      const snapshot = await getDocs(q);

      // Delete items from just deleted category
      const batch = writeBatch(db);
      snapshot.forEach(docSnap => {
        const docRef = doc(itemsCollectionRef, docSnap.id);
        batch.delete(docRef);
      });

      // Execute batch transaction
      await batch.commit();
    } catch (err) {
      throw err;
    }
  };

  const deleteSelected = async ({ id, imageRef, order }) => {
    setError(null);

    try {
      setStatus('loading');
      // delete the data from database
      await deleteDoc(
        doc(db, type === 'category' ? 'categories' : 'items', id)
      );

      // re-order the other categories (only when deleting categories)
      if (type === 'category') {
        updateOrderAfterCategoryDeletion('categories', id, order);
        deleteItemsAfterCategoryDeletion(id);
      }

      // delete image from storage
      const selectedImgRef = ref(storage, imageRef);

      await deleteObject(selectedImgRef);

      setStatus('completed');

      setTimeout(() => {
        const modal = document.getElementById(`modal-delete-${type}`);
        if (!modal) return;

        modal.close();
      }, 1200);
    } catch (err) {
      setError(
        `Ocurrió un error, no se ha podido eliminar ${
          type === 'category' ? 'la categoría' : 'el item'
        }`
      );
      setStatus('idle');
    }
  };

  return { status, setStatus, error, setError, deleteSelected };
};

export default useDashboardMenuDelete;
