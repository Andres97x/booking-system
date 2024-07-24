import Modal from './Modal';
import Spinner from './Spinner';
import ModalStatusCompleted from './ModalStatusCompleted';
import useDashboardDeleteCategory from '../hooks/useDashboardDeleteCategory';
import DashboardDeleteCategoryScreen from './DashboardDeleteCategoryScreen';

const DashboardDeleteCategoryModal = ({
  selectedCategory,
  setSelectedCategory,
}) => {
  const { status, setStatus, error, setError, deleteCategory } =
    useDashboardDeleteCategory();

  const closeModal = e => {
    const modal = e.target.closest('dialog');
    if (!modal) return;
    modal.close();
  };

  const displayedElement = status => {
    if (status === 'idle') {
      return (
        <DashboardDeleteCategoryScreen
          error={error}
          selectedCategory={selectedCategory}
          closeModal={closeModal}
          deleteCategory={deleteCategory}
        />
      );
    }

    if (status === 'loading') {
      return <Spinner spinnerContainerClassName='modal-spinner' />;
    }

    if (status === 'completed') {
      return (
        <ModalStatusCompleted
          type='category'
          action='delete'
          passedName={selectedCategory.name}
        />
      );
    }
  };

  return (
    <Modal
      id='modal-delete-category'
      onClose={() => {
        setStatus('idle');
        setError(null);
        setSelectedCategory(null);
      }}
    >
      {displayedElement(status)}
    </Modal>
  );
};

export default DashboardDeleteCategoryModal;
