import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { ref, uploadBytes } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';

import { storage, db } from '../configs/firebase';
import Modal from './Modal';

const DashboardAddCategoryModal = () => {
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

  const submitCategory = async e => {
    e.preventDefault();

    if (!imageUpload || !addCategoryForm.categoryName) return;

    const uniqueId = uuidv4();

    try {
      // Uploading image to firebase/storage
      const imgRef = ref(
        storage,
        `categories/${imageUpload.name.split('.')[0] + uniqueId}`
      );
      const snapshot = await uploadBytes(imgRef, imageUpload);
      console.log('Uploaded a blob or file!');

      // Uploading data to firebase/cloudfire database
      const categoriesCollectionRef = collection(db, 'categories');

      const docRef = await addDoc(categoriesCollectionRef, {
        name: addCategoryForm.categoryName,
        description: addCategoryForm.categoryDescription,
        imageRef: `categories/${imageUpload.name.split('.')[0] + uniqueId}`,
      });
      console.log('Document written with ID: ', docRef.id);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal id='modal-add-category'>
      <h3>Añadir categoría al menú</h3>

      <form>
        <div>
          <label htmlFor='dash-add-category-name'>Nombre de la categoría</label>
          <input
            id='dash-add-category-name'
            type='text'
            name='categoryName'
            value={addCategoryForm.categoryName}
            onChange={onChangeHandler}
            required
          />
        </div>

        <div>
          <label htmlFor='dash-add-category-description'>
            Descripción de la catergoría
          </label>
          <textarea
            id='dash-add-category-description'
            name='categoryDescription'
            rows='5'
            cols='33'
            placeholder='Añade una breve descripción de la categoría (máximo 100 caracteres)'
            value={addCategoryForm.categoryDescription}
            onChange={onChangeHandler}
          ></textarea>
        </div>

        <div>
          <label htmlFor='dash-add-category-img'>Imagen de la categoría</label>
          <input
            id='dash-add-category-img'
            type='file'
            accept='image/*'
            onChange={e => setImageUpload(e.target.files[0])}
          />
        </div>

        <button onClick={submitCategory}>Añadir categoría</button>
      </form>
    </Modal>
  );
};

export default DashboardAddCategoryModal;
