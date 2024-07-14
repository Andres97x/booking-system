import useDashboardCategoryUpload from '../hooks/useDashboardCategoryUpload';
import Modal from './Modal';
import DashboardCategoryForm from './DashboardCategoryForm';
import DashboardAddCategoryCompleted from './DashboardAddCategoryCompleted';
import Spinner from './Spinner';

const DashboardAddCategoryModal = ({ categoriesLength }) => {
  const {
    addCategoryForm,
    status,
    error,
    setStatus,
    setError,
    onChangeHandler,
    submitCategory,
    setImageUpload,
    clearInputValues,
  } = useDashboardCategoryUpload(categoriesLength);

  const displayedElement = () => {
    if (status === 'idle') {
      return (
        <DashboardCategoryForm
          addCategoryForm={addCategoryForm}
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
        <DashboardAddCategoryCompleted
          addCategoryForm={addCategoryForm}
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
