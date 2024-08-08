import { useContext } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { BsFillCaretLeftFill } from 'react-icons/bs';

import { BookingContext } from '../contexts/BookingContext';

import BookingCalendar from '../components/BookingCalendar';
import BookingZones from '../components/BookingZones';
import BookingTimes from '../components/BookingTimes';
import BookingForm from '../components/BookingForm';
import '../styles/Bookings.css';

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
      <div className='bookings-ctrl_btns'>
        {timesStatus === 'loading' ||
        submitStatus === 'loading' ||
        submitStatus === 'completed' ? null : (
          <>
            <button
              className={`bookings-btn bookings-back_btn tab-enabled ${
                !booking.justDate ? 'hidden' : ''
              }`}
              disabled={sliderIndex <= 0}
              onClick={onClickBack}
            >
              <BsFillCaretLeftFill />
            </button>
            <button
              className={`bookings-btn complete-booking tab-enabled ${
                sliderIndex === 3 ? '' : 'hidden'
              }`}
              disabled={sliderIndex !== 3}
              onClick={onClickComplete}
            >
              Completar reserva
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Bookings;
