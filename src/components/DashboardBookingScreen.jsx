import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { capitalizeDate } from '../utils';

const DashboardBookingScreen = ({
  selectedBooking,
  error,
  setStatus,
  viewportWidth,
}) => {
  return (
    <>
      <h5>Información de la reserva</h5>
      {error && (
        <p className='error-message' style={{ marginBottom: '1rem' }}>
          {error}
        </p>
      )}
      <div className='booking-modal-info-container'>
        <div>
          <span>ID:</span>
          <p>{selectedBooking?.id}</p>
        </div>
        <div>
          <span>Nombre:</span>
          <p>
            {selectedBooking?.firstName} {selectedBooking?.lastName}
          </p>
        </div>
        <div>
          <span>Día:</span>
          {selectedBooking && (
            <p>
              {capitalizeDate(
                format(
                  selectedBooking.justDate.toDate(),
                  viewportWidth <= 385
                    ? "EE'.' d 'de' MMMM',' y"
                    : "EEEE d 'de' MMMM',' y",
                  {
                    locale: es,
                  }
                )
              )}
            </p>
          )}
        </div>
        <div>
          <span>Hora:</span>
          {selectedBooking && (
            <p>{format(selectedBooking.dateTime.toDate(), 'hh:mm aaa')}</p>
          )}
        </div>
        <div>
          <span>Zona:</span>
          <p>{selectedBooking?.zone}</p>
        </div>
        <div>
          <span>Teléfono:</span>
          <a href={`http://wa.me/+57${selectedBooking?.phone}`} target='_blank'>
            {selectedBooking?.phone}
          </a>
        </div>
        <div>
          <span>Email:</span>
          <a href={`mailto:${selectedBooking?.email}`} target='_blank'>
            {selectedBooking?.email}
          </a>
        </div>
        <div>
          <span>Número de personas:</span>
          <p>{selectedBooking?.size}</p>
        </div>
      </div>
      <button
        className='delete-booking-btn'
        onClick={() => {
          setStatus('confirmation');
        }}
      >
        Eliminar reserva
      </button>
    </>
  );
};

export default DashboardBookingScreen;
