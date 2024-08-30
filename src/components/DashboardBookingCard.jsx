import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useRef } from 'react';
import { FaCheck } from 'react-icons/fa6';

import { capitalizeDate } from '../utils';

const DashboardBookingCard = ({
  booking,
  setSelectedBooking,
  handleCartSelect,
  selectedBookings,
}) => {
  const selectedCardRef = useRef(null);

  const isSelected = () => {
    return selectedBookings.find(
      currentBooking => currentBooking.id === booking.id
    )
      ? 'selected'
      : '';
  };

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
      <div
        ref={selectedCardRef}
        className={`booking-card-select ${isSelected()}`}
        onClick={e => {
          e.stopPropagation();
          handleCartSelect(booking);
        }}
      >
        <FaCheck />
      </div>
    </button>
  );
};

export default DashboardBookingCard;

// ${Boolean(
//   selectedBookings.find(
//     currentBooking => currentBooking.id === booking.id
//   )
//     ? 'selected'
//     : ''
// )}
