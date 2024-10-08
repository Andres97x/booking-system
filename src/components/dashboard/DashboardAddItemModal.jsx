import useDashboardMenuForm from '../../hooks/useDashboardMenuForm';
import useDashboardMenuAdd from '../../hooks/useDashboardMenuAdd';
import DashboardAddItemScreen from './DashboardAddItemScreen';
import StatusCompletedScreen from './StatusCompletedScreen';
import Modal from '../utils/Modal';
import Spinner from '../utils/Spinner';

const DashboardAddItemModal = ({ categoryName, categoryId, subCategories }) => {
  const {
    formData,
    onChangeHandler,
    onChangeSubCategoryHandler,
    onOptionClick,
    imageUpload,
    setImageUpload,
    clearInputValues,
    filteredOptions,
  } = useDashboardMenuForm('item', 'add');

  const { status, setStatus, error, setError, submitData } =
    useDashboardMenuAdd('item');

  const displayedElement = status => {
    if (status === 'idle') {
      return (
        <DashboardAddItemScreen
          categoryName={categoryName}
          error={error}
          formData={formData}
          onChangeHandler={onChangeHandler}
          onChangeSubCategoryHandler={onChangeSubCategoryHandler}
          onOptionClick={onOptionClick}
          imageUpload={imageUpload}
          setImageUpload={setImageUpload}
          submitData={submitData}
          categoryId={categoryId}
          filteredOptions={filteredOptions}
          subCategories={subCategories}
        />
      );
    } else if (status === 'loading') {
      return <Spinner />;
    } else if (status === 'completed') {
      return (
        <StatusCompletedScreen
          type='item'
          action='add'
          clearInputValues={clearInputValues}
          setStatus={setStatus}
          passedName={formData.name}
        />
      );
    }
  };

  return (
    <Modal
      id='modal-add-item'
      onClose={() => {
        setError(null);
        setStatus('idle');
      }}
      status={status}
    >
      {displayedElement(status)}
    </Modal>
  );
};

export default DashboardAddItemModal;
