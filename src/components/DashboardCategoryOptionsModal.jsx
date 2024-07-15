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
import { MdDelete, MdEdit, MdDone } from 'react-icons/md';
import { v4 as uuidv4 } from 'uuid';

import { storage, db } from '../configs/firebase';
import useDashboardUploadForm from '../hooks/useDashboardUploadForm';
import Modal from './Modal';
import { useState } from 'react';

const DashboardCategoryOptionsModal = ({
  selectedCategory,
  setSelectedCategory,
}) => {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  const {
    categoryForm,
    onChangeHandler,
    imageUpload,
    setImageUpload,
    clearInputValues,
  } = useDashboardUploadForm('update');

  const updateOrder = async (collectionName, docId, newOrder, errorMessage) => {
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
          batch.update(docRef, { order: Number(newOrder) });
          console.log(`changed ${docSnap.data().name} to order: ${newOrder}`);
          // currentOrder++; /* FIXME */
        } else {
          // Update the other documents to keep the correct order
          if (currentOrder === Number(newOrder)) currentOrder++;
          batch.update(docRef, { order: currentOrder });
          currentOrder++;
        }
      });

      // Execute batch transaction
      await batch.commit();
    } catch (error) {
      console.error(error);
      setError(errorMessage);
    }
  };

  const updateFile = async () => {
    if (
      !categoryForm.categoryName &&
      !categoryForm.categoryDescription &&
      !categoryForm.order &&
      !imageUpload
    ) {
      setError('No hay cambios para guardar');
      return;
    }

    const updateErrorMessage =
      'Hubo un problema, no se ha podido actualizar la categoría';

    const docRef = doc(db, 'categories', selectedCategory.id);

    // => user modified image
    if (imageUpload) {
      const uniqueId = uuidv4();

      try {
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
      } catch (err) {
        console.error(err);
        setError(updateErrorMessage);
      }
    }

    // => user modified category name
    if (categoryForm.categoryName) {
      // update category name field
      /* FIXME */
      // by updating the name of the category, I also have to take all the items with the previous name and update their category field to the new category name, most likely using a batch transaction

      try {
        await updateDoc(docRef, {
          name: categoryForm.categoryName,
        });
      } catch (err) {
        console.log(err);
        setError(updateErrorMessage);
      }
    }

    // => user modified description
    if (categoryForm.categoryDescription) {
      // update category description field
      const docRef = doc(db, 'categories', selectedCategory.id);

      try {
        await updateDoc(docRef, {
          description: categoryForm.categoryDescription,
        });
      } catch (err) {
        console.log(err);
        setError(updateErrorMessage);
      }
    }

    // => user modified order
    if (categoryForm.order) {
      updateOrder(
        'categories',
        selectedCategory.id,
        Number(categoryForm.order),
        updateErrorMessage
      );
    }
  };

  return (
    <Modal
      className='modal-options'
      onClose={() => {
        setSelectedCategory(null);
      }}
      id='modal-options'
    >
      <div>
        <h3>Editar opciones de categoría</h3>
        <h5>{selectedCategory?.name}</h5>

        {error ? <p className='add-category-error-message'>{error}</p> : null}
        <div className='dashboard-category-options-container'>
          <div className='dashboard-category-option-group'>
            <div>
              <p>Nombre</p>
              <button>
                <MdEdit />
              </button>
            </div>

            <div>
              <div>
                <input
                  id='dash-add-category-name'
                  type='text'
                  name='categoryName'
                  placeholder={selectedCategory?.name}
                  value={categoryForm.categoryName}
                  onChange={onChangeHandler}
                  required
                  autoFocus
                />
              </div>
            </div>
          </div>

          <div className='dashboard-category-option-group'>
            <div>
              <p>Orden de visualización</p>
              <button>
                <MdEdit />
              </button>
            </div>

            <div>
              <div>
                <input
                  type='number'
                  placeholder={`Orden actual: ${selectedCategory?.order}`}
                  onChange={onChangeHandler}
                  name='order'
                />
              </div>
            </div>
          </div>

          <div className='dashboard-category-option-group'>
            <div>
              <p>Descripción (máx 120 caracteres)</p>
              <button>
                <MdEdit />
              </button>
            </div>

            <div>
              <div>
                <textarea
                  id='dash-add-category-description'
                  name='categoryDescription'
                  rows='5'
                  cols='33'
                  placeholder={selectedCategory?.description}
                  value={categoryForm.categoryDescription}
                  onChange={onChangeHandler}
                ></textarea>
              </div>
            </div>
          </div>

          <div className='dashboard-category-option-group'>
            <div>
              <p>Editar imagen</p>
              <button>
                <MdEdit />
              </button>
            </div>

            <div>
              <div>
                <input
                  id='dash-add-category-img'
                  type='file'
                  accept='image/*'
                  onChange={e => setImageUpload(e.target.files[0])}
                />
              </div>
            </div>
          </div>
        </div>

        <div className='dashboard-category-options-btns-container'>
          <button className='dashboard-btn' onClick={updateFile}>
            <MdDone />
            Confirmar cambios
          </button>
          <button className='dashboard-btn'>
            <MdDelete />
            Eliminar categoría
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DashboardCategoryOptionsModal;
