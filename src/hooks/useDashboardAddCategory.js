import { useState } from 'react';
import { ref, uploadBytes } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { storage, db } from '../configs/firebase';
import { v4 as uuidv4 } from 'uuid';

const useDashboardAddCategory = (
  categoriesLength,
  imageUpload,
  categoryForm,
  clearInputValues
) => {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  const submitCategory = async e => {
    e.preventDefault();

    setError(null);

    if (!imageUpload || !categoryForm.categoryName) {
      setError('Completa los campos obligatorios faltantes *');
      return;
    }

    const uniqueId = uuidv4();

    try {
      setStatus('loading');
      // Uploading image to firebase/storage
      const imgRef = ref(
        storage,
        `categories/${imageUpload.name.split('.')[0] + uniqueId}`
      );

      await uploadBytes(imgRef, imageUpload);

      // Uploading data to firebase/cloudfire database
      const categoriesCollectionRef = collection(db, 'categories');

      await addDoc(categoriesCollectionRef, {
        name: categoryForm.categoryName,
        description: categoryForm.categoryDescription,
        imageRef: `categories/${imageUpload.name.split('.')[0] + uniqueId}`,
        order: categoriesLength + 1,
      });

      clearInputValues();
      setStatus('completed');
    } catch (err) {
      console.error(err);
      setError(
        'Hubo un error al subir la categoría, la acción no fue completada'
      );
      setStatus('idle');
    }
  };

  return { status, setStatus, error, setError, submitCategory };
};

export default useDashboardAddCategory;
