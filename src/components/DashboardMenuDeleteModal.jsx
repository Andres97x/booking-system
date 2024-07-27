import Modal from './Modal';
import Spinner from './Spinner';
import StatusCompletedScreen from './StatusCompletedScreen';
import useDashboardMenuDelete from '../hooks/useDashboardMenuDelete';
import DashboardMenuDeleteScreen from './DashboardMenuDeleteScreen';

const DashboardMenuDeleteModal = ({ type, selected, setSelected }) => {
  const { status, setStatus, error, setError, deleteSelected } =
    useDashboardMenuDelete(type);

  const closeModal = e => {
    const modal = e.target.closest('dialog');
    if (!modal) return;
    modal.close();
  };

  const displayedElement = status => {
    if (status === 'idle') {
      return (
        <DashboardMenuDeleteScreen
          type={type}
          error={error}
          selected={selected}
          closeModal={closeModal}
          deleteSelected={deleteSelected}
        />
      );
    }

    if (status === 'loading') {
      return <Spinner spinnerContainerClassName='modal-spinner' />;
    }

    if (status === 'completed') {
      return (
        <StatusCompletedScreen
          type='category'
          action='delete'
          passedName={selected.name}
        />
      );
    }
  };

  return (
    <Modal
      id={`modal-delete-${type}`}
      onClose={() => {
        setStatus('idle');
        setError(null);
        setSelected(null);
      }}
    >
      {displayedElement(status)}
    </Modal>
  );
};

export default DashboardMenuDeleteModal;
