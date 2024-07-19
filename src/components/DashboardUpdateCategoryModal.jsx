import DashboardUpdateCategoryScreen from './DashboardUpdateCategoryScreen';
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

  // console.log(Object.values(categoryForm).some(value => value));

  const { status, setStatus, error, setError, updateFile } =
    useDashboardUpdateCategory();

  const displayedElement = () => {
    if (status === 'idle') {
      return (
        <DashboardUpdateCategoryScreen
          selectedCategory={selectedCategory}
          error={error}
          categoryForm={categoryForm}
          onChangeHandler={onChangeHandler}
          categoriesLength={categoriesLength}
          updateFile={updateFile}
          setImageUpload={setImageUpload}
          imageUpload={imageUpload}
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
