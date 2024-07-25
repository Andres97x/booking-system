import Modal from './Modal';
import useDashboardMenuForm from '../hooks/useDashboardMenuForm';
import useDashboardUpdateCategory from '../hooks/useDashboardUpdateCategory';

const DashboardUpdateItemModal = () => {
  const {
    formData,
    onChangeHandler,
    imageUpload,
    setImageUpload,
    clearInputValues,
  } = useDashboardMenuForm('item', 'update');

  const { status, setStatus, error, setError, updateFile } =
    useDashboardUpdateCategory();

  return <Modal id='modal-item-options'></Modal>;
};

export default DashboardUpdateItemModal;
