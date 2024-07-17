import DashboardUpdateCategoryForm from './DashboardUpdateCategoryForm';
import { useState } from 'react';

import useDashboardUploadForm from '../hooks/useDashboardUploadForm';
import useDashboardUpdateCategory from '../hooks/useDashboardUpdateCategory';
import Modal from './Modal';
import Spinner from './Spinner';
import ModalStatusCompleted from './ModalStatusCompleted';

const DashboardUpdateCategoryModal = ({
  selectedCategory,
  setSelectedCategory,
  categoriesLength,
}) => {
  const {
    categoryForm,
    onChangeHandler,
    imageUpload,
    setImageUpload,
    clearInputValues,
  } = useDashboardUploadForm('update');

  const { status, setStatus, error, setError, updateFile } =
    useDashboardUpdateCategory(categoryForm, imageUpload, selectedCategory);

  const displayedElement = () => {
    if (status === 'idle') {
      return (
        <DashboardUpdateCategoryForm
          selectedCategory={selectedCategory}
          error={error}
          categoryForm={categoryForm}
          onChangeHandler={onChangeHandler}
          categoriesLength={categoriesLength}
          updateFile={updateFile}
          setImageUpload={setImageUpload}
        />
      );
    }

    if (status === 'loading') {
      return <Spinner />;
    }

    if (status === 'completed') {
      return (
        <ModalStatusCompleted
          type='update'
          categoryName={selectedCategory.name}
        />
      );
    }
  };

  return (
    <Modal
      onClose={() => {
        clearInputValues();
        setStatus('idle');
        setError(null);
        setSelectedCategory(null);
      }}
      id='modal-category-options'
    >
      {displayedElement()}
    </Modal>
  );
};

export default DashboardUpdateCategoryModal;
