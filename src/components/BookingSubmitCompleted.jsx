import { useContext, useRef, useState } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { FaCheckCircle } from 'react-icons/fa';
import { LuClipboardCopy } from 'react-icons/lu';
import { BookingContext } from '../contexts/BookingContext';

const BookingSubmitCompleted = () => {
  const { booking, submittedBookingId, resetBooking } =
    useContext(BookingContext);
  const modalRef = useRef(null);
  const [modalMessage, setModalMessage] = useState('');
  const timeoutIdRef = useRef(null);

  const handleCopy = () => {
    // Clear the previous timeout, if any
    if (timeoutIdRef.current !== null) {
      clearTimeout(timeoutIdRef.current);
    }

    if (!modalRef.current) return;
    modalRef.current.close();

    navigator.clipboard
      .writeText(submittedBookingId)
      .then(() => {
        setModalMessage('Se ha copiado el ID al portapapeles');
        modalRef.current.show();
      })
      .catch(err => {
        console.error(err);
        setModalMessage('No se ha podido copiar el ID al portapapeles');
        modalRef.current.show();
      })
      .finally(() => {
        // Set a new timeout and store the ID in a ref
        timeoutIdRef.current = setTimeout(() => {
          modalRef.current.close();
          setModalMessage('');
        }, 1200);
      });
  };

  return (
    <div className='booking-submit-completed'>
      <div
        style={{
          display: 'flex',
          gap: '1.8rem',
          alignItems: 'center',
          justifyContent: 'start',
          marginBottom: '2rem',
        }}
      >
        <h4>La reserva se ha completado satisfactoriamente.</h4>
        <div className='booking-submit-completed_svg-container'>
          <FaCheckCircle />
        </div>
      </div>

      {booking.justDate && booking.zone && booking.dateTime && (
        <ul>
          <li>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '2rem',
              }}
            >
              <p>ID: {submittedBookingId}</p>{' '}
              <button className='copy-booking-id' onClick={handleCopy}>
                <LuClipboardCopy />
              </button>
            </div>
          </li>
          <li>
            <p>
              Fecha:{' '}
              {format(booking.justDate, "eeee d 'de' MMMM' de' y", {
                locale: es,
              })}
            </p>
          </li>
          <li>
            <p>Zona: {booking.zone}</p>
          </li>
          <li>
            <p>Hora: {format(booking.dateTime, 'hh:mm aaa')}</p>
          </li>
        </ul>
      )}

      <div>
        <p style={{ marginBottom: '0.5rem' }}>
          Ten en cuenta que la reserva será cancelada si nadie se ha presentado
          pasados 10 minutos de la hora indicada.
        </p>
        <p>
          También puedes cancelar la reserva contactándonos y proporcionando el
          ID.
        </p>
      </div>

      <button className='leave-to-bookings-btn' onClick={resetBooking}>
        Salir
      </button>

      <dialog className='clipboard-dialog' ref={modalRef}>
        {modalMessage}
      </dialog>
    </div>
  );
};

export default BookingSubmitCompleted;
