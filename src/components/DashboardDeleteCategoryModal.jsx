import { useState } from 'react';
import {
  doc,
  collection,
  getDocs,
  orderBy,
  query,
  deleteDoc,
  writeBatch,
} from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { MdCancel, MdOutlineDelete } from 'react-icons/md';

import { db, storage } from '../configs/firebase';
import Modal from './Modal';
import Spinner from './Spinner';
import ModalStatusCompleted from './ModalStatusCompleted';

/* TODO re-factor logic into hook */

const DashboardDeleteCategoryModal = ({ selectedCategory }) => {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  const closeModal = e => {
    const modal = e.target.closest('dialog');
    if (!modal) return;
    modal.close();
  };

  // console.log(selectedCategory);

  const updateOrderAfterDeleteCategory = async (
    collectionName,
    docId,
    docOrder
  ) => {
    const collectionRef = collection(db, collectionName);
    const q = query(collectionRef, orderBy('order'));

    try {
      const snapshot = await getDocs(q);

      const batch = writeBatch(db);

      // Loop over documents and update the order as necessary
      snapshot.forEach(docSnap => {
        const docRef = doc(collectionRef, docSnap.id);
        if (docSnap.id !== docId) {
          // Update the other documents to keep the correct order
          // if currently looped document's order is greater than the selected docOrder, set the order field to docSnap.data().order - 1

          if (docSnap.data().order > docOrder) {
            batch.update(docRef, { order: docSnap.data().order - 1 });
          }
        }
      });

      // Execute batch transaction
      await batch.commit();
    } catch (err) {
      throw err;
    }
  };

  const deleteCategory = async (categoriesId, imageRef, order) => {
    setStatus('loading');

    try {
      // delete the data from database
      await deleteDoc(doc(db, 'categories', categoriesId));

      // delete image from storage
      const categoryImageRef = ref(storage, imageRef);

      await deleteObject(categoryImageRef);

      // re-order the other categories
      updateOrderAfterDeleteCategory('categories', categoriesId, order);

      setStatus('completed');

      setTimeout(() => {
        const modal = document.getElementById('modal-delete-category');
        if (!modal) return;

        modal.close();
      }, 1200);
    } catch (err) {
      setError('Ocurrió un error, no se ha podido eliminar la categoría');
      setStatus('idle');
    }
  };

  const displayedElement = status => {
    if (status === 'idle') {
      return (
        <div>
          <div>
            <h3>Eliminar categoría del menú</h3>
            {error ? (
              <p className='add-category-error-message'>{error}</p>
            ) : null}
          </div>

          <div>
            <p>
              Seguro deseas borrar la categoría{' '}
              <span>{selectedCategory?.name}?</span>
            </p>
            <p style={{ marginTop: '0.8rem' }}>
              Al borrar la catergoría también se borrarán los items que están
              enlazados a esta. *
            </p>
          </div>

          <div className='dashboard-action-btns-container'>
            <button className='dashboard-btn' onClick={closeModal}>
              <MdCancel />
              Cancelar
            </button>
            <button
              className='dashboard-btn warning'
              onClick={() => {
                deleteCategory(
                  selectedCategory.id,
                  selectedCategory.imageRef,
                  selectedCategory.order
                );
              }}
            >
              <MdOutlineDelete />
              Eliminar categoría
            </button>
          </div>
        </div>
      );
    }

    if (status === 'loading') {
      return <Spinner spinnerContainerClassName='modal-spinner' />;
    }

    if (status === 'completed') {
      return (
        <ModalStatusCompleted
          type='delete'
          categoryName={selectedCategory.name}
        />
      );
    }
  };

  return (
    <Modal
      id='modal-delete-category'
      onClose={() => {
        setStatus('idle');
      }}
    >
      {displayedElement(status)}
    </Modal>
  );
};

export default DashboardDeleteCategoryModal;
