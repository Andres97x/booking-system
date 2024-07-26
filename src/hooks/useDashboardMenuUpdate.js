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

const useDashboardMenuUpdate = type => {
  if (!type) return;

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
          // looping over the selectedMenuType document
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

  const updateFile = async (form, imageUpload, selectedMenuType, modalId) => {
    setError(null);

    if (Object.values(form).every(value => !value) && !imageUpload) {
      setError('No hay cambios para guardar');
      return;
    }

    const updateErrorMessage =
      'Hubo un problema, no se ha podido actualizar la categoría';

    const docRef = doc(
      db,
      type === 'category' ? 'categories' : 'items',
      selectedMenuType.id
    );

    try {
      setStatus('loading');

      // => user modified data
      if (Object.values(form).some(value => value)) {
        const newData = {};

        const modifiedInputEntries = Object.entries(form).filter(
          entry => entry[1]
        );

        modifiedInputEntries.forEach(([key, value]) => {
          if (type === 'category' && key === 'order') return;
          newData[key] = value;
        });

        // console.log(newData);

        await updateDoc(docRef, { ...newData });
      }

      // => user modified order
      if (form.order && type === 'category') {
        updateOrder('categories', selectedMenuType.id, parseInt(form.order));
      }

      // => user modified image
      if (imageUpload) {
        const uniqueId = uuidv4();

        // delete the current category image image in firebase/storage
        const selectedCategoryImgRef = ref(storage, selectedMenuType.imageRef);

        await deleteObject(selectedCategoryImgRef);

        const newImagePath = `${type === 'category' ? 'categories' : 'items'}/${
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

      setStatus('completed');

      setTimeout(() => {
        const modal = document.getElementById(modalId);

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

export default useDashboardMenuUpdate;
