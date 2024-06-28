import { useState, useEffect, useRef } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { BsFillCaretLeftFill, BsFillCaretRightFill } from 'react-icons/bs';

import { BOOKING_INIT } from '../constants';
import BookingCalendar from '../components/BookingCalendar';
import BookingZones from '../components/BookingZones';
import BookingTimes from '../components/BookingTimes';
import BookingForm from '../components/BookingForm';
import '../styles/Bookings.css';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [booking, setBooking] = useState(BOOKING_INIT);
  const [activeTimeId, setActiveTimeId] = useState(null);
  const [activeZoneId, setActiveZoneId] = useState(null);
  const [sliderIndex, setSliderIndex] = useState(0);
  const bookingsContainerRef = useRef(null);

  // console.log(sliderIndex);

  useEffect(() => {
    // preventing tab navigation on booking slider btns (calendar, zones and times)
    if (!bookingsContainerRef) return;

    const bookingBtns = bookingsContainerRef.current.querySelectorAll(
      'button:not(.tab-enabled)'
    );
    bookingBtns.forEach(btn => btn.setAttribute('tabindex', '-1'));

    // enabling tab navigation only on inputs in slider and only when sliderIndex === 3 (form slider index)
    const sliderFormInputs = bookingsContainerRef.current.querySelectorAll(
      '.form-container input'
    );

    if (sliderIndex !== 3) {
      sliderFormInputs.forEach(input => input.setAttribute('tabindex', '-1'));
    } else {
      sliderFormInputs.forEach(input => input.setAttribute('tabindex', '0'));
    }

    // preventing active styles from being applied on calendar day tiles when booking.justDate is null.
    if (!booking.justDate) {
      const selectedDateTile = document.querySelector(
        '.react-calendar__tile--range'
      );

      selectedDateTile?.classList.remove('react-calendar__tile--range');
    }
  }, [booking]);

  // useEffect(() => {
  // document.addEventListener('keydown', e => {
  // if (e.key === 'Tab' && sliderIndex !== 3) return;

  //     const slider
  //   });
  // }, [sliderIndex]);

  const onClickMonth = () => {
    setBooking(prev => ({ ...prev, justDate: null }));
  };

  const onClickDay = value => {
    setBooking(prev => ({ ...prev, justDate: value }));
    setSliderIndex(1);
  };

  const onClickZone = zone => {
    setBooking(prev => ({ ...prev, zone: zone }));
    setSliderIndex(2);
  };

  const onClickTime = (condition, i, time) => {
    if (condition) return;
    setActiveTimeId(i);
    setBooking(prev => ({ ...prev, dateTime: time }));
    setSliderIndex(3);
  };

  // booking.justDate &&
  //   console.log(format(booking.justDate, "'Today is a' eeee", { locale: es }));

  return (
    <div className='bookings-container' ref={bookingsContainerRef}>
      <div className='bookings-info'>
        {booking.justDate && (
          <p>
            {`${format(booking.justDate, "eeee d 'de' MMMM',' y", {
              locale: es,
            })}`}
          </p>
        )}
        {booking.zone && <p>en la zona {booking.zone} </p>}
        {booking.dateTime && (
          <p>- a las {format(booking.dateTime, 'hh:mm aaa')}</p>
        )}
      </div>
      <div className='bookings-slider'>
        <BookingCalendar
          onClickDay={onClickDay}
          sliderIndex={sliderIndex}
          onClickMonth={onClickMonth}
        />
        <BookingZones
          onClickZone={onClickZone}
          sliderIndex={sliderIndex}
          activeZoneId={activeZoneId}
          setActiveZoneId={setActiveZoneId}
        />
        <BookingTimes
          booking={booking}
          bookings={bookings}
          sliderIndex={sliderIndex}
          activeTimeId={activeTimeId}
          onClickTime={onClickTime}
        />
        <BookingForm sliderIndex={sliderIndex} />
      </div>
      <button
        className='bookings-back_btn tab-enabled'
        disabled={sliderIndex <= 0}
        onClick={e => {
          setSliderIndex(prev => {
            if (prev <= 0) return;

            if (prev === 1) {
              setBooking(prev => ({ ...prev, justDate: null, zone: null }));

              const selectedDateTile = e.target
                .closest('.bookings-container')
                .querySelector('.react-calendar__tile--range');

              selectedDateTile?.classList.remove('react-calendar__tile--range');

              setActiveZoneId(null);
            }

            if (prev === 2) {
              setBooking(prev => ({ ...prev, zone: null, dateTime: null }));
              setActiveZoneId(null);
              setActiveTimeId(null);
            }

            if (prev === 3) {
              setBooking(prev => ({ ...prev, dateTime: null }));
              setActiveTimeId(null);
            }

            return prev - 1;
          });
        }}
      >
        <BsFillCaretLeftFill />
      </button>
      {/* <button
        className='times-nav_btn'
        onClick={() => {
          if (!booking.dateTime) {
            alert('Please select an hour');
            return;
          }

          if (Date.parse(booking.dateTime) < Date.now()) {
            alert(
              'You are trying to book on a past time, please select a new hour'
            );
          }

          setBookings(prev => [...prev, booking]);
          alert('Booking completed');
          setBooking(BOOKING_INIT);
        }}
      >
        <BsFillCaretRightFill />
      </button> */}
    </div>
  );
};

export default Bookings;
