import Modal from './Modal';
import useDashboardMenuForm from '../hooks/useDashboardMenuForm';
import useDashboardMenuUpdate from '../hooks/useDashboardMenuUpdate';
import DashboardUpdateItemScreen from './DashboardUpdateItemScreen';
import Spinner from './Spinner';
import StatusCompletedScreen from './StatusCompletedScreen';

const DashboardUpdateItemModal = ({ selectedItem, setSelectedItem }) => {
  const {
    formData,
    onChangeHandler,
    imageUpload,
    setImageUpload,
    clearInputValues,
  } = useDashboardMenuForm('item', 'update');

  const { status, setStatus, error, setError, updateFile } =
    useDashboardMenuUpdate('item');

  const displayedElement = status => {
    if (status === 'idle') {
      return (
        <DashboardUpdateItemScreen
          selectedItem={selectedItem}
          error={error}
          formData={formData}
          onChangeHandler={onChangeHandler}
          updateFile={updateFile}
          imageUpload={imageUpload}
          setImageUpload={setImageUpload}
        />
      );
    } else if (status === 'loading') {
      return <Spinner />;
    } else if (status === 'completed') {
      return (
        <StatusCompletedScreen
          type='item'
          action='update'
          passedName={selectedItem?.name}
          clearInputValues={clearInputValues}
          setStatus={setStatus}
        />
      );
    }
  };

  return (
    <Modal
      id='modal-item-options'
      onClose={() => {
        clearInputValues();
        setStatus('idle');
        setError(null);
        setSelectedItem(null);
      }}
    >
      {displayedElement(status)}
    </Modal>
  );
};

export default DashboardUpdateItemModal;
