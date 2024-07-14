import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { ref, uploadBytes } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { storage, db } from '../configs/firebase';

const useDashboardCategoryUpload = categoriesLength => {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [imageUpload, setImageUpload] = useState(null);
  const [addCategoryForm, setAddCategoryForm] = useState({
    categoryName: '',
    categoryDescription: '',
  });

  const onChangeHandler = e => {
    const name = e.target.name;
    const value = e.target.value;
    if (value.split(' ').join('').length > 120) return;

    setAddCategoryForm(prev => ({ ...prev, [name]: value }));
  };

  const clearInputValues = () => {
    setAddCategoryForm({
      categoryName: '',
      categoryDescription: '',
    });

    setImageUpload(null);
  };

  const submitCategory = async e => {
    e.preventDefault();

    setError(null);

    if (!imageUpload || !addCategoryForm.categoryName) {
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
        name: addCategoryForm.categoryName,
        description: addCategoryForm.categoryDescription,
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

  return {
    addCategoryForm,
    status,
    error,
    setStatus,
    setError,
    onChangeHandler,
    submitCategory,
    setImageUpload,
    clearInputValues,
  };
};

export default useDashboardCategoryUpload;
