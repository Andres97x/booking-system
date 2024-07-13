import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { ref, uploadBytes } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';

import { storage, db } from '../configs/firebase';
import Modal from './Modal';
import Spinner from './Spinner';

const DashboardAddCategoryModal = ({ categoriesLength }) => {
  const [imageUpload, setImageUpload] = useState(null);
  const [addCategoryForm, setAddCategoryForm] = useState({
    categoryName: '',
    categoryDescription: '',
  });
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

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
      setError('Completa los campos faltantes');
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
      setError(
        'Hubo un error al subir la categoría, la acción no fue completada'
      );
      setStatus('idle');
    }
  };

  const displayedElement = () => {
    if (status === 'idle') {
      return (
        <form>
          <h3>Añadir categoría al menú</h3>

          {error ? <p className='add-category-error-message'>{error}</p> : null}
          <div>
            <label htmlFor='dash-add-category-name'>
              Nombre de la categoría *
            </label>
            <input
              id='dash-add-category-name'
              type='text'
              name='categoryName'
              value={addCategoryForm.categoryName}
              onChange={onChangeHandler}
              required
              autoFocus
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
              placeholder='Añade una breve descripción de la categoría (máximo 120 caracteres)'
              value={addCategoryForm.categoryDescription}
              onChange={onChangeHandler}
            ></textarea>
          </div>

          <div>
            <label htmlFor='dash-add-category-img'>
              Imagen de la categoría *
            </label>
            <input
              id='dash-add-category-img'
              type='file'
              accept='image/*'
              onChange={e => setImageUpload(e.target.files[0])}
            />
          </div>

          <button onClick={submitCategory}>Añadir categoría</button>
        </form>
      );
    } else if (status === 'loading') {
      return <Spinner spinnerContainerClassName='modal-spinner' />;
    } else if (status === 'completed') {
      return (
        <div className='category-completed-container'>
          <h3>
            La categoría {addCategoryForm.categoryName} se añadió correctamente
          </h3>

          <div className='category-completed-action-btns'>
            <button
              onClick={() => {
                clearInputValues();
                setStatus('idle');
              }}
            >
              Añadir otra categoría
            </button>
            <button
              onClick={e => {
                e.target.closest('dialog').close();
                setStatus('idle');
                clearInputValues();
              }}
            >
              Cerrar
            </button>
          </div>
        </div>
      );
    }
  };

  return (
    <Modal
      id='modal-add-category'
      onClose={() => {
        setError(null);
        setStatus('idle');
      }}
    >
      {displayedElement()}
    </Modal>
  );
};

export default DashboardAddCategoryModal;
