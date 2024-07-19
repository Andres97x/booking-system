import { useState } from 'react';
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  writeBatch,
} from 'firebase/firestore';
import { ref, deleteObject, uploadBytes } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

import { storage, db } from '../configs/firebase';

const useDashboardUpdateCategory = () => {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  const updateOrder = async (collectionName, docId, newOrder) => {
    const collectionRef = collection(db, collectionName);
    const q = query(collectionRef, orderBy('order'));

    try {
      const snapshot = await getDocs(q);

      const batch = writeBatch(db);
      let currentOrder = 1;

      // Loop over documents and update the order as necessary
      snapshot.forEach(docSnap => {
        const docRef = doc(collectionRef, docSnap.id);
        if (docSnap.id === docId) {
          // looping over the selectedCategory document
          // update the document with the new order
          batch.update(docRef, { order: newOrder });

          // if the user for some reason get to select the same order
          if (newOrder === currentOrder) currentOrder++;
        } else {
          // Update the other documents to keep the correct order
          if (currentOrder === parseInt(newOrder)) currentOrder++;
          batch.update(docRef, { order: currentOrder });
          currentOrder++;
        }
      });

      // Execute batch transaction
      await batch.commit();
    } catch (err) {
      throw err;
    }
  };

  const updateFile = async (categoryForm, imageUpload, selectedCategory) => {
    setError(null);

    if (
      !categoryForm.name &&
      !categoryForm.description &&
      !categoryForm.order &&
      !imageUpload
    ) {
      setError('No hay cambios para guardar');
      return;
    }

    const updateErrorMessage =
      'Hubo un problema, no se ha podido actualizar la categoría';

    try {
      setStatus('loading');

      /* TODO refactor if statements, throw errors */

      // => user modified image
      const docRef = doc(db, 'categories', selectedCategory.id);

      if (imageUpload) {
        const uniqueId = uuidv4();

        // delete the current category image image in firebase/storage
        const selectedCategoryImgRef = ref(storage, selectedCategory.imageRef);

        await deleteObject(selectedCategoryImgRef);

        const newImagePath = `categories/${
          imageUpload.name.split('.')[0] + uniqueId
        }`;

        // upload new image
        const imgRef = ref(storage, newImagePath);

        await uploadBytes(imgRef, imageUpload);

        // update imageRef field for the selected category
        await updateDoc(docRef, {
          imageRef: newImagePath,
        });
      }

      /* IMPORTANT REFACTOR*/
      // => user modified data
      // if (Object.values(categoryForm).some(value => value)) {
      //   const modifiedInputEntries = Object.entries(categoryForm).filter(
      //     entry => entry[1]
      //   );
      // }

      // => user modified category name
      if (categoryForm.name) {
        await updateDoc(docRef, {
          name: categoryForm.name,
        });
      }

      // => user modified description
      if (categoryForm.description) {
        // update category description field
        await updateDoc(docRef, {
          description: categoryForm.categoryDescription,
        });
      }

      // => user modified order
      if (categoryForm.order) {
        updateOrder(
          'categories',
          selectedCategory.id,
          parseInt(categoryForm.order)
        );
      }

      setStatus('completed');

      setTimeout(() => {
        const modal = document.getElementById('modal-category-options');

        if (modal) {
          modal.close();
        }
      }, 1200);
    } catch (err) {
      console.error(err);
      setError(updateErrorMessage);
      setStatus('idle');
    }
  };

  return { status, setStatus, error, setError, updateFile };
};

export default useDashboardUpdateCategory;
