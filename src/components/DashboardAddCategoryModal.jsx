import useDashboardUploadForm from '../hooks/useDashboardUploadForm';
import useDashboardAddCategory from '../hooks/useDashboardAddCategory';
import Modal from './Modal';
import DashboardAddCategoryScreen from './DashboardAddCategoryScreen';
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
    useDashboardAddCategory();

  const displayedElement = () => {
    if (status === 'idle') {
      return (
        <DashboardAddCategoryScreen
          categoryForm={categoryForm}
          error={error}
          onChangeHandler={onChangeHandler}
          submitCategory={submitCategory}
          setImageUpload={setImageUpload}
          categoriesLength={categoriesLength}
          imageUpload={imageUpload}
          clearInputValues={clearInputValues}
        />
      );
    } else if (status === 'loading') {
      return <Spinner spinnerContainerClassName='modal-spinner' />;
    } else if (status === 'completed') {
      return (
        <ModalStatusCompleted
          type='add'
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
