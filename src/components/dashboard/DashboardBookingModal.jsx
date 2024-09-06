import { useState, useRef } from 'react';
import { MdCancel, MdOutlineDelete } from 'react-icons/md';
import { doc, deleteDoc } from 'firebase/firestore';

import { db } from '../../configs/firebase';
import DashboardBookingScreen from './DashboardBookingScreen';
import Modal from '../utils/Modal';
import Spinner from '../utils/Spinner';

const DashboardBookingModal = ({ selectedBooking, viewportWidth }) => {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const modalRef = useRef(null);

  const deleteBooking = async id => {
    setError(null);

    try {
      setStatus('loading');
      await deleteDoc(doc(db, 'bookings', id));
      setStatus('completed');

      setTimeout(() => {
        modalRef.current.close();
      }, 1200);
    } catch (err) {
      setError(err);
      setStatus(idle);
    }
  };

  const displayedElement = status => {
    if (status === 'idle') {
      return (
        <DashboardBookingScreen
          selectedBooking={selectedBooking}
          error={error}
          setStatus={setStatus}
          viewportWidth={viewportWidth}
        />
      );
    } else if (status === 'confirmation') {
      return (
        <div className='confirmation-container'>
          <p>Seguro quieres eliminar esta reserva?</p>
          <div className='modal-delete-bookings-btns'>
            <button
              className='delete-btn'
              onClick={() => {
                deleteBooking(selectedBooking.id);
              }}
            >
              <MdOutlineDelete />
              Eliminar
            </button>
            <button
              className='cancel-btn'
              onClick={() => {
                setStatus('idle');
              }}
            >
              <MdCancel />
              Cancelar
            </button>
          </div>
        </div>
      );
    } else if (status === 'loading') {
      return <Spinner />;
    } else {
      return (
        <div className='delete-booking-success-message'>
          <p>La reserva ha sido eliminida</p>
        </div>
      );
    }
  };

  return (
    <Modal
      ref={modalRef}
      id='booking-modal'
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

export default DashboardBookingModal;
