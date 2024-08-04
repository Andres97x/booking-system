import DashboardUpdateCategoryScreen from './DashboardUpdateCategoryScreen';
import useDashboardMenuForm from '../hooks/useDashboardMenuForm';
import useDashboardMenuUpdate from '../hooks/useDashboardMenuUpdate';
import Modal from './Modal';
import Spinner from './Spinner';
import StatusCompletedScreen from './StatusCompletedScreen';

const DashboardUpdateCategoryModal = ({
  selectedCategory,
  setSelectedCategory,
  categoriesLength,
}) => {
  const {
    formData,
    onChangeHandler,
    imageUpload,
    setImageUpload,
    clearInputValues,
    setFormData,
  } = useDashboardMenuForm('category', 'update');

  const { status, setStatus, error, setError, updateFile } =
    useDashboardMenuUpdate('category');

  const displayedElement = () => {
    if (status === 'idle') {
      return (
        <DashboardUpdateCategoryScreen
          selectedCategory={selectedCategory}
          error={error}
          formData={formData}
          onChangeHandler={onChangeHandler}
          categoriesLength={categoriesLength}
          updateFile={updateFile}
          setImageUpload={setImageUpload}
          imageUpload={imageUpload}
          setFormData={setFormData}
        />
      );
    }

    if (status === 'loading') {
      return <Spinner />;
    }

    if (status === 'completed') {
      return (
        <StatusCompletedScreen
          type='category'
          action='update'
          passedName={selectedCategory?.name}
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
