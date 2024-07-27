import useDashboardMenuForm from '../hooks/useDashboardMenuForm';
import useDashboardMenuAdd from '../hooks/useDashboardMenuAdd';
import Modal from './Modal';
import DashboardAddItemScreen from './DashboardAddItemScreen';
import Spinner from './Spinner';
import StatusCompletedScreen from './StatusCompletedScreen';

const DashboardAddItemModal = ({ categoryName, categoryId }) => {
  const {
    formData,
    onChangeHandler,
    imageUpload,
    setImageUpload,
    clearInputValues,
  } = useDashboardMenuForm('item', 'add');

  const { status, setStatus, error, setError, submitCategory } =
    useDashboardMenuAdd('item');

  const displayedElement = status => {
    if (status === 'idle') {
      return (
        <DashboardAddItemScreen
          categoryName={categoryName}
          error={error}
          formData={formData}
          onChangeHandler={onChangeHandler}
          imageUpload={imageUpload}
          setImageUpload={setImageUpload}
          submitCategory={submitCategory}
          clearInputValues={clearInputValues}
          categoryId={categoryId}
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
    >
      {displayedElement(status)}
    </Modal>
  );
};

export default DashboardAddItemModal;
