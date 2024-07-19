import { useState } from 'react';
import { deleteObject, ref, uploadBytes } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { storage, db } from '../configs/firebase';
import { v4 as uuidv4 } from 'uuid';

const useDashboardAddCategory = () => {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  const submitCategory = async (
    categoriesLength,
    imageUpload,
    categoryForm,
    clearInputValues
  ) => {
    setError(null);

    if (!imageUpload || !categoryForm.name) {
      setError('Completa los campos obligatorios faltantes *');
      return;
    }

    const uniqueId = uuidv4();
    const imagePath = `categories/${imageUpload.name.split('.')[0] + uniqueId}`;

    const handleError = (error, whatFailed) => {
      console.error(error);
      setError(
        `Hubo un error al subir la ${whatFailed}, la acción no fue completada`
      );
      setStatus('idle');
    };

    try {
      setStatus('loading');

      // Uploading image to firebase/storage
      const imgRef = ref(storage, imagePath);
      await uploadBytes(imgRef, imageUpload);

      try {
        // Uploading data to firebase/firestore database
        const categoriesCollectionRef = collection(db, 'categories');
        await addDoc(categoriesCollectionRef, {
          name: categoryForm.name,
          description: categoryForm.description,
          imageRef: imagePath,
          order: categoriesLength + 1,
        });

        clearInputValues();
        setStatus('completed');
      } catch (err) {
        // rollback uploadBytes operation - delete just added image from storage
        deleteObject(imgRef);
        console.log(`image rollback done, deleted image: ${imagePath}`);

        handleError(err, 'categoría');
      }
    } catch (err) {
      handleError(err, 'imagen de la categoría');
    }
  };

  return { status, setStatus, error, setError, submitCategory };
};

export default useDashboardAddCategory;
