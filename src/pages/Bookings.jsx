import { useState, useRef } from 'react';
import { add, format } from 'date-fns';
import { IoArrowBack, IoArrowForward } from 'react-icons/io5';
import {
  BOOKING_INIT,
  OPENING_TIME,
  CLOSING_TIME,
  INTERVAL,
  ZONE_TABLES,
} from '../constants';

import BookingCalendar from '../components/BookingCalendar';
import BookingZones from '../components/BookingZones';
import '../styles/Bookings.css';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [booking, setBooking] = useState(BOOKING_INIT);
  const [activeTime, setActiveTime] = useState(null);
  const timesRef = useRef([]);

  // console.log(timesRef.current);

  const onClickDay = value => {
    setBooking(prev => ({ ...prev, justDate: value }));
  };

  const onClickZone = id => {
    setBooking(prev => ({ ...prev, zone: id }));
  };

  const getTimes = () => {
    if (!booking.justDate || !booking.zone) return;

    const { justDate } = booking;
    const beginning = add(justDate, { hours: OPENING_TIME });
    const end = add(justDate, { hours: CLOSING_TIME });
    const interval = INTERVAL; // in minutes

    const times = [];
    for (let i = beginning; i <= end; i = add(i, { minutes: interval })) {
      times.push(i);
    }

    return times;
  };

  const times = getTimes();

  const getTakenTimes = () => {
    if (!booking.justDate || !booking.zone || bookings.length === 0) return;

    const takenTimes = bookings
      .filter(
        completedBooking =>
          Date.parse(completedBooking.justDate) ===
            Date.parse(booking.justDate) &&
          completedBooking.zone === booking.zone
      )
      .map(takenDate => {
        /* Assuming bookings last 1 hour (2 intervals) */
        const chosenTime = takenDate.dateTime;

        // Restricting half an hour before reservation (1 interval)
        const beforeInterval = add(chosenTime, { minutes: -INTERVAL });

        // Restricting an hour after reservation (2 intervals)
        const firstInterval = add(chosenTime, { minutes: INTERVAL });
        const secondInterval = add(chosenTime, { minutes: INTERVAL * 2 });

        return [
          Date.parse(beforeInterval),
          Date.parse(chosenTime),
          Date.parse(firstInterval),
          Date.parse(secondInterval),
        ];
      });

    return takenTimes.flat();
  };
  const takenTimes = getTakenTimes();

  const getOcurrences = (takenTimes, currentTime) => {
    return takenTimes?.filter(hour => hour === Date.parse(currentTime));
  };

  const timesEl = times?.map((time, i, array) => {
    const ocurrences = getOcurrences(takenTimes, time);
    const ocurrencesOnNextTime = getOcurrences(takenTimes, array[i + 1]);
    const ocurrencesAfterNextTime = getOcurrences(takenTimes, array[i + 2]);

    const condition =
      Date.parse(time) < Date.now() ||
      ZONE_TABLES[booking.zone] <= ocurrences?.length ||
      ZONE_TABLES[booking.zone] <= ocurrencesOnNextTime?.length ||
      ZONE_TABLES[booking.zone] <= ocurrencesAfterNextTime?.length;
    // || takenTimes?.includes(Date.parse(time)); // Assuming just 1 table per zone

    return (
      <div key={`time-${i}`} className='time'>
        <button
          ref={el => (timesRef.current[i] = el)}
          className={
            activeTime === timesRef.current[i] && timesRef.current[i] !== null
              ? 'time-selected'
              : ''
          }
          disabled={condition}
          onClick={() => {
            if (condition) return;
            setActiveTime(timesRef.current[i]);
            setBooking(prev => ({ ...prev, dateTime: time }));
          }}
        >
          {format(time, 'hh:mm aaa')}
        </button>
      </div>
    );
  });

  return booking.justDate && booking.zone ? (
    <div className='times-container'>
      <div className='times-nav_btns'>
        <button
          className='times-nav_btn'
          onClick={() => {
            setBooking(BOOKING_INIT);
            setActiveTime(null);
          }}
        >
          <IoArrowBack /> Go back
        </button>
        <button
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
          Next <IoArrowForward />
        </button>
      </div>
      <div className='times-flex'>{timesEl}</div>
    </div>
  ) : (
    <div className='bookings-container'>
      <BookingCalendar onClickDay={onClickDay} />
      <BookingZones onClickZone={onClickZone} />
    </div>
  );
};

export default Bookings;
