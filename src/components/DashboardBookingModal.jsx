import { useState, useRef } from 'react';
import Modal from './Modal';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../configs/firebase';

import Spinner from './Spinner';
import DashboardBookingScreen from './DashboardBookingScreen';

const DashboardBookingModal = ({ selectedBooking }) => {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(
    'Ocurrió un error y no se ha podido eliminar la reserva'
  );
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
          deleteBooking={deleteBooking}
        />
      );
    } else if (status === 'loading') {
      return <Spinner />;
    } else {
      return (
        <div
          style={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <p style={{ fontWeight: '600' }}>La reserva ha sido eliminida</p>
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
