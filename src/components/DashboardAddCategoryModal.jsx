import useDashboardUploadForm from '../hooks/useDashboardUploadForm';
import useDashboardAddCategory from '../hooks/useDashboardAddCategory';
import Modal from './Modal';
import DashboardAddCategoryForm from './DashboardAddCategoryForm';
import ModalStatusCompleted from './ModalStatusCompleted';
import Spinner from './Spinner';

const DashboardAddCategoryModal = ({ categoriesLength }) => {
  const {
    categoryForm,
    onChangeHandler,
    imageUpload,
    setImageUpload,
    clearInputValues,
  } = useDashboardUploadForm('add');

  const { status, setStatus, error, setError, submitCategory } =
    useDashboardAddCategory(
      categoriesLength,
      imageUpload,
      categoryForm,
      clearInputValues
    );

  const displayedElement = () => {
    if (status === 'idle') {
      return (
        <DashboardAddCategoryForm
          categoryForm={categoryForm}
          error={error}
          onChangeHandler={onChangeHandler}
          submitCategory={submitCategory}
          setImageUpload={setImageUpload}
        />
      );
    } else if (status === 'loading') {
      return <Spinner spinnerContainerClassName='modal-spinner' />;
    } else if (status === 'completed') {
      return (
        <ModalStatusCompleted
          type='add'
          categoryForm={categoryForm}
          clearInputValues={clearInputValues}
          setStatus={setStatus}
        />
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
