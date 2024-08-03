import { useState } from 'react';
import { deleteObject, ref, uploadBytes } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { storage, db } from '../configs/firebase';
import { v4 as uuidv4 } from 'uuid';

const useDashboardMenuAdd = type => {
  if (!type) return;

  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  const submitData = async ({
    categoriesLength,
    imageUpload,
    formData,
    categoryId,
  }) => {
    setError(null);

    if (!imageUpload || !formData.name) {
      setError('Completa los campos obligatorios faltantes *');
      return;
    }

    const handleError = (error, whatFailed) => {
      console.error(error);
      setError(
        `Hubo un error al subir la ${whatFailed}, la acción no fue completada`
      );
      setStatus('idle');
    };

    const uniqueId = uuidv4();
    const imagePath = `${type === 'category' ? 'categories' : 'items'}/${
      imageUpload.name.split('.')[0] + uniqueId
    }`;
    const imgRef = ref(storage, imagePath);
    let imageResponse = null;

    const formatSubcategory = string => {
      return string
        .trim()
        .split(' ')
        .filter(sentence => sentence)
        .join(' ')
        .toLowerCase();
    };

    try {
      setStatus('loading');

      // Uploading image to firebase/storage
      imageResponse = await uploadBytes(imgRef, imageUpload);

      // Uploading data to firebase/firestore database
      const collectionRef = collection(
        db,
        type === 'category' ? 'categories' : 'items'
      );
      await addDoc(collectionRef, {
        name: formData.name,
        description: formData.description,
        imageRef: imagePath,
        createdAt: serverTimestamp(),
        ...(type === 'category' && { order: categoriesLength + 1 }),
        ...(type === 'item' && {
          categoryId: categoryId,
          price: formData.price,
          subCategory: formatSubcategory(formData.subCategory),
        }),
      });

      setStatus('completed');
      // clearInputValues();
    } catch (err) {
      handleError(err, 'categoría');

      if (imageResponse) {
        try {
          // rollback uploadBytes operation - delete just added image from storage
          deleteObject(imgRef);
          console.log(`image rollback done, deleted image: ${imagePath}`);
        } catch (err) {
          setError(
            'Hubo un fallo inesperado, los datos no se han subido completamente'
          );
        }
      }
    }
  };

  return { status, setStatus, error, setError, submitData };
};

export default useDashboardMenuAdd;
