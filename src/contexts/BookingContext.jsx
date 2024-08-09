import { createContext, useState, useEffect, useRef } from 'react';
// prettier-ignore
import { collection, addDoc, serverTimestamp, Timestamp} from 'firebase/firestore';

import { db } from '../configs/firebase';
import { BOOKING_FORM_INIT, BOOKING_INIT } from '../constants';

const BookingContext = createContext(null);

const BookingContextWrapper = ({ children }) => {
  const [booking, setBooking] = useState(BOOKING_INIT);
  const [activeTimeId, setActiveTimeId] = useState(null);
  const [activeZoneId, setActiveZoneId] = useState(null);
  const [sliderIndex, setSliderIndex] = useState(0);
  const bookingsContainerRef = useRef(null);
  const [bookingForm, setBookingForm] = useState(BOOKING_FORM_INIT);
  const [submittedBookingId, setSubmittedBookingId] = useState(null);
  const [submitStatus, setSubmitStatus] = useState('idle');
  const [submitError, setSubmitError] = useState(null);
  const [timesStatus, setTimesStatus] = useState('idle');
  const [timesError, setTimesError] = useState(null);

  // console.log(bookings);
  const resetBooking = () => {
    setBooking(BOOKING_INIT);
    setActiveTimeId(null);
    setActiveZoneId(null);
    setSliderIndex(0);
    setBookingForm(BOOKING_FORM_INIT);
    setSubmitStatus('idle');
  };

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

      switch (prev) {
        case 1:
          setBooking(prev => ({ ...prev, justDate: null, zone: null }));

          const selectedDateTile = e.target
            .closest('.bookings-container')
            .querySelector('.react-calendar__tile--range');

          selectedDateTile?.classList.remove('react-calendar__tile--range');

          setActiveZoneId(null);
          break;

        case 2:
          setBooking(prev => ({ ...prev, zone: null, dateTime: null }));
          setActiveZoneId(null);
          setActiveTimeId(null);
          break;

        case 3:
          setBooking(prev => ({ ...prev, dateTime: null }));
          setActiveTimeId(null);
          break;
      }

      return prev - 1;
    });
  };

  const onClickComplete = async () => {
    if (!booking.dateTime) {
      setSubmitError('Por favor selecciona una hora');
      return;
    }

    if (
      !Object.values(booking).every(option => option) ||
      !Object.values(bookingForm).every(option => option)
    ) {
      setSubmitError('Por favor completa los campos faltantes.');
      return;
    }

    if (Timestamp.fromDate(booking.dateTime) < Timestamp.now()) {
      setSubmitError(
        'Estás seleccionando una hora que ya pasó, selecciona una hora válida.'
      );
      return;
    }

    setSubmitError(null);

    try {
      setSubmitStatus('loading');

      const docRef = await addDoc(collection(db, 'bookings'), {
        ...booking,
        ...bookingForm,
        createdAt: serverTimestamp(),
      });

      setSubmittedBookingId(docRef.id);

      setSubmitStatus('completed');

      // resetBooking();
    } catch (err) {
      console.log(err);
      setError(
        'Hubo un problema al realizar la reserva, por favor reporta este fallo.'
      );
    }
  };

  const onFormChange = e => {
    const { name, value } = e.target;

    setBookingForm(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    // preventing tab navigation on booking slider btns (calendar, zones and times)
    if (!bookingsContainerRef.current) return;

    const bookingBtns = bookingsContainerRef.current.querySelectorAll(
      'button:not(.tab-enabled)'
    );
    bookingBtns.forEach(btn => btn.setAttribute('tabindex', '-1'));

    // enabling tab navigation only on inputs when sliderIndex === 3 (form slider index)
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
  }, [booking]);

  return (
    <BookingContext.Provider
      value={{
        booking,
        setBooking,
        activeTimeId,
        setActiveTimeId,
        activeZoneId,
        setActiveZoneId,
        sliderIndex,
        setSliderIndex,
        bookingsContainerRef,
        bookingForm,
        setBookingForm,
        onClickMonth,
        onClickDay,
        onClickZone,
        onClickTime,
        onClickBack,
        onClickComplete,
        onFormChange,
        submitStatus,
        submitError,
        submittedBookingId,
        resetBooking,
        timesStatus,
        setTimesStatus,
        timesError,
        setTimesError,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export { BookingContextWrapper, BookingContext };
