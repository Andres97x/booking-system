import { format } from 'date-fns';
import { es } from 'date-fns/locale';
// import { useContext } from 'react';
// import { BookingContext } from '../contexts/BookingContext';

const DashboardBookings = () => {
  // const { bookings } = useContext(BookingContext);
  const bookingsLS = JSON.parse(localStorage.getItem('bookings'));

  const bookingCardsEl = bookingsLS?.map((booking, i) => {
    return (
      <div className='booking-card' key={`booking-card-${i}`}>
        <h5>
          {booking.firstName} {booking.lastName}
        </h5>
        <p>
          {format(booking.justDate, "eeee d 'de' MMMM',' y", {
            locale: es,
          })}
        </p>
        <p>zona {booking.zone}</p>
        <p>{format(booking.dateTime, 'hh:mm aaa')}</p>
        <a href={`http://wa.me/+57${booking.phone}`} target='_blank'>
          {booking.phone}
        </a>
        <a href={`mailto:${booking.email}`} target='_blank'>
          {booking.email}
        </a>
        <p>{booking.size} personas</p>
      </div>
    );
  });

  return (
    <div className='dashboard-bookings'>
      <div>{bookingCardsEl}</div>
    </div>
  );
};

export default DashboardBookings;
