import { useState, useEffect, useRef } from 'react';
import { add, format } from 'date-fns';
import { es } from 'date-fns/locale';
import { BsFillCaretLeftFill, BsFillCaretRightFill } from 'react-icons/bs';

// prettier-ignore
import { BOOKING_INIT, OPENING_TIME, CLOSING_TIME, INTERVAL, ZONE_TABLES } from '../constants';
import { getTimes, getTakenTimes } from '../utils';
import BookingCalendar from '../components/BookingCalendar';
import BookingZones from '../components/BookingZones';
import BookingTimes from '../components/BookingTimes';
import TimeTile from '../components/TimeTile';
import '../styles/Bookings.css';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [booking, setBooking] = useState(BOOKING_INIT);
  const [activeTimeId, setActiveTimeId] = useState(null);
  const [activeZoneId, setActiveZoneId] = useState(null);
  const [sliderIndex, setSliderIndex] = useState(0);
  const bookingsContainerRef = useRef(null);

  // console.log(booking);

  useEffect(() => {
    if (!bookingsContainerRef) return;

    const bookingBtns = bookingsContainerRef.current.querySelectorAll(
      'button:not(.tab-enabled)'
    );
    bookingBtns.forEach(btn => btn.setAttribute('tabindex', '-1'));
  }, [booking]);

  const onClickDay = value => {
    setBooking(prev => ({ ...prev, justDate: value }));
    setSliderIndex(1);
  };

  const onClickZone = zone => {
    setBooking(prev => ({ ...prev, zone: zone }));
    setSliderIndex(2);
  };

  const times = getTimes(booking, INTERVAL, add, OPENING_TIME, CLOSING_TIME);
  // console.log(times);

  const takenTimes = getTakenTimes(booking, bookings);

  const getOcurrences = (takenTimes, currentTime) => {
    return takenTimes?.filter(hour => hour === Date.parse(currentTime));
  };

  const timesEl = times?.map((time, i, array) => {
    const ocurrences = getOcurrences(takenTimes, time);
    // Getting ocurrences for half an hour and one hour later, if some table isn't available at those times, I don't want the user to be able to book a table at this current time (collapsing times).
    const ocurrencesOnNextTime = getOcurrences(takenTimes, array[i + 1]);
    const ocurrencesAfterNextTime = getOcurrences(takenTimes, array[i + 2]);

    const condition =
      Date.parse(time) < Date.now() ||
      ZONE_TABLES[booking.zone] <= ocurrences?.length ||
      ZONE_TABLES[booking.zone] <= ocurrencesOnNextTime?.length ||
      ZONE_TABLES[booking.zone] <= ocurrencesAfterNextTime?.length;
    // || takenTimes?.includes(Date.parse(time)); // Assuming just 1 table per zone

    return (
      <TimeTile
        key={`time-tile-${i}`}
        i={i}
        time={time}
        activeTimeId={activeTimeId}
        setActiveTimeId={setActiveTimeId}
        condition={condition}
        format={format}
        setBooking={setBooking}
      />
    );
  });

  // booking.justDate &&
  //   console.log(format(booking.justDate, "'Today is a' eeee", { locale: es }));

  console.log(booking.zone);

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
        <BookingCalendar onClickDay={onClickDay} sliderIndex={sliderIndex} />
        <BookingZones
          onClickZone={onClickZone}
          sliderIndex={sliderIndex}
          activeZoneId={activeZoneId}
          setActiveZoneId={setActiveZoneId}
        />
        <BookingTimes timesEl={timesEl} sliderIndex={sliderIndex} />
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
