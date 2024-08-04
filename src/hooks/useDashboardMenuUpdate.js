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
          // looping over the selected document
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

  const updateFile = async (form, imageUpload, selected, modalId) => {
    setError(null);

    if (
      Object.entries(form).every(([key, value]) => value === selected[key]) &&
      !imageUpload
    ) {
      setError('No hay cambios para guardar');
      return;
    }

    if (!form.name) {
      setError('El campo "nombre" no puede quedar vacío');
      return;
    }

    const formatSubcategory = string => {
      return string
        .trim()
        .split(' ')
        .filter(sentence => sentence)
        .join(' ');
    };

    const updateErrorMessage =
      'Hubo un problema, no se ha podido actualizar la categoría';

    const docRef = doc(
      db,
      type === 'category' ? 'categories' : 'items',
      selected.id
    );

    try {
      setStatus('loading');

      // => user modified data
      if (
        Object.entries(form).some(([key, value]) => value !== selected[key])
      ) {
        const newData = {};

        const modifiedInputEntries = Object.entries(form).filter(
          ([key, value]) => value !== selected[key]
        );

        modifiedInputEntries.forEach(([key, value]) => {
          if (type === 'category' && key === 'order') return;

          if (type === 'item' && key === 'subCategory') {
            newData[key] = value ? formatSubcategory(value) : null;
          } else {
            newData[key] = value || null;
          }
        });

        // console.log(newData);

        await updateDoc(docRef, { ...newData });
      }

      // => user modified order
      if (form.order && type === 'category') {
        updateOrder('categories', selected.id, parseInt(form.order));
      }

      // => user modified image
      if (imageUpload) {
        const uniqueId = uuidv4();

        // delete the current category image image in firebase/storage
        const selectedCategoryImgRef = ref(storage, selected.imageRef);

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
