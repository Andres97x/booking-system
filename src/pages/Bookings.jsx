import { useContext } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { BsFillCaretLeftFill } from 'react-icons/bs';

import { BookingContext } from '../contexts/BookingContext';

import BookingCalendar from '../components/bookings/BookingCalendar';
import BookingZones from '../components/bookings/BookingZones';
import BookingTimes from '../components/bookings/BookingTimes';
import BookingForm from '../components/bookings/BookingForm';

const Bookings = () => {
  const {
    booking,
    bookingsContainerRef,
    sliderIndex,
    onClickBack,
    onClickComplete,
    submitStatus,
    timesStatus,
  } = useContext(BookingContext);

  return (
    <div className='bookings-container' ref={bookingsContainerRef}>
      <div className='bookings-info'>
        {booking.justDate && submitStatus !== 'completed' && (
          <p>
            {`${format(booking.justDate, "eeee d 'de' MMMM',' y", {
              locale: es,
            })}`}
          </p>
        )}
        {booking.zone && submitStatus !== 'completed' && (
          <p>en la zona {booking.zone} </p>
        )}
        {booking.dateTime && submitStatus !== 'completed' && (
          <p>- a las {format(booking.dateTime, 'hh:mm aaa')}</p>
        )}
      </div>
      <div className='bookings-slider'>
        <BookingCalendar />
        <BookingZones />
        <BookingTimes />
        <BookingForm />
      </div>
      <div className='pagination_btns-container booking-pagination'>
        {timesStatus === 'loading' ||
        submitStatus === 'loading' ||
        submitStatus === 'completed' ? null : (
          <>
            <button
              className={`tab-enabled ${!booking.justDate ? 'hidden' : ''}`}
              disabled={sliderIndex <= 0}
              onClick={onClickBack}
            >
              <BsFillCaretLeftFill />
            </button>
            <button
              className={`complete-booking tab-enabled ${
                sliderIndex === 3 ? '' : 'hidden'
              }`}
              disabled={sliderIndex !== 3}
              onClick={onClickComplete}
            >
              Completar
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Bookings;
