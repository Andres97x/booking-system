import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { capitalizeDate } from '../utils';

const DashboardBookingCard = ({ booking, setSelectedBooking }) => {
  return (
    <button
      className='booking-card'
      data-modal='booking-modal'
      onClick={() => setSelectedBooking(booking)}
    >
      <h5>
        {booking.firstName} {booking.lastName}
      </h5>
      <p>
        {capitalizeDate(
          format(booking.justDate.toDate(), "EEE d 'de' MMMM',' y", {
            locale: es,
          })
        )}{' '}
        {format(booking.dateTime.toDate(), 'hh:mm aaa')}
      </p>
    </button>
  );
};

export default DashboardBookingCard;
