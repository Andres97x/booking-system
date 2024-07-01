import { useState, useEffect, useRef } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { BsFillCaretLeftFill, BsFillCaretRightFill } from 'react-icons/bs';

import { BOOKING_FORM_INIT, BOOKING_INIT } from '../constants';
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
  const [bookingForm, setBookingForm] = useState(BOOKING_FORM_INIT);

  // console.log(bookings);

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

  const onClickBack = e => {
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
  };

  const onClickComplete = () => {
    if (!booking.dateTime) {
      alert('Please select an hour');
      return;
    }

    if (
      !Object.values(booking).every(option => option) ||
      !Object.values(bookingForm).every(option => option)
    ) {
      alert('Completa las opciones faltantes');
      return;
    }

    if (Date.parse(booking.dateTime) < Date.now()) {
      alert(
        'Estás seleccionando una hora que ya pasó, intenta seleccionar una nueva'
      );
      return;
    }

    setBookings(prev => [...prev, booking]);
    alert('Reserva completada');
    setBooking(BOOKING_INIT);
    setActiveTimeId(null);
    setActiveZoneId(null);
    setSliderIndex(0);
    setBookingForm(BOOKING_FORM_INIT);
  };

  const onFormChange = e => {
    const name = e.target.name;
    const value = e.target.value;

    setBookingForm(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    // preventing tab navigation on booking slider btns (calendar, zones and times)
    if (!bookingsContainerRef) return;

    const bookingBtns = bookingsContainerRef.current.querySelectorAll(
      'button:not(.tab-enabled)'
    );
    bookingBtns.forEach(btn => btn.setAttribute('tabindex', '-1'));

    // enabling tab navigation only on inputs in slider and only when sliderIndex === 3 (form slider index)
    const sliderFormInputs = bookingsContainerRef.current.querySelectorAll(
      '.form-container input, select'
    );

    if (sliderIndex !== 3) {
      sliderFormInputs.forEach(input => input.setAttribute('tabindex', '-1'));
    } else {
      sliderFormInputs.forEach((input, i) => {
        input.setAttribute('tabindex', '0');
        if (i === 0) {
          setTimeout(() => {
            input.focus();
          }, 300);
        }
      });
    }

    // preventing active styles from being applied on calendar day tiles when booking.justDate is null.
    if (!booking.justDate) {
      const selectedDateTile = document.querySelector(
        '.react-calendar__tile--range'
      );

      selectedDateTile?.classList.remove('react-calendar__tile--range');
    }

    // showing the complete booking button when in last slide
    // const completeBtn = document.querySelector('.complete-booking');
    // if (sliderIndex === 3) {
    // } else {
    // }
  }, [booking]);

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
        <BookingForm
          sliderIndex={sliderIndex}
          bookingForm={bookingForm}
          onFormChange={onFormChange}
        />
      </div>
      <div className='bookings-ctrl_btns'>
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
          className={`bookings-btn complete-booking tab-enabled`}
          disabled={sliderIndex !== 3}
          onClick={onClickComplete}
        >
          Completar reserva
        </button>
      </div>
    </div>
  );
};

export default Bookings;
