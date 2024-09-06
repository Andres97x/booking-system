import useDashboardMenuForm from '../../hooks/useDashboardMenuForm';
import useDashboardMenuAdd from '../../hooks/useDashboardMenuAdd';
import DashboardAddCategoryScreen from './DashboardAddCategoryScreen';
import StatusCompletedScreen from './StatusCompletedScreen';
import Modal from '../utils/Modal';
import Spinner from '../utils/Spinner';

const DashboardAddCategoryModal = ({ categoriesLength }) => {
  const {
    formData,
    onChangeHandler,
    imageUpload,
    setImageUpload,
    clearInputValues,
  } = useDashboardMenuForm('category', 'add');

  const { status, setStatus, error, setError, submitData } =
    useDashboardMenuAdd('category');

  const displayedElement = () => {
    if (status === 'idle') {
      return (
        <DashboardAddCategoryScreen
          formData={formData}
          error={error}
          onChangeHandler={onChangeHandler}
          submitData={submitData}
          setImageUpload={setImageUpload}
          categoriesLength={categoriesLength}
          imageUpload={imageUpload}
        />
      );
    } else if (status === 'loading') {
      return <Spinner spinnerContainerClassName='modal-spinner' />;
    } else if (status === 'completed') {
      return (
        <StatusCompletedScreen
          type='category'
          action='add'
          passedName={formData.name}
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
      status={status}
    >
      {displayedElement()}
    </Modal>
  );
};

export default DashboardAddCategoryModal;
