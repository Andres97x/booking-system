import Modal from './Modal';
import useDashboardMenuForm from '../hooks/useDashboardMenuForm';
import useDashboardMenuUpdate from '../hooks/useDashboardMenuUpdate';
import DashboardUpdateItemScreen from './DashboardUpdateItemScreen';

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
      <DashboardUpdateItemScreen
        selectedItem={selectedItem}
        error={error}
        formData={formData}
        onChangeHandler={onChangeHandler}
        updateFile={updateFile}
        imageUpload={imageUpload}
        setImageUpload={setImageUpload}
      />
    </Modal>
  );
};

export default DashboardUpdateItemModal;
