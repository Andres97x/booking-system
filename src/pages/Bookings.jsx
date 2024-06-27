import { useState } from 'react';
import { add, format } from 'date-fns';

import {
  BOOKING_INIT,
  OPENING_TIME,
  CLOSING_TIME,
  INTERVAL,
  ZONE_TABLES,
} from '../constants';
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

  // console.log(booking);

  const onClickDay = value => {
    setBooking(prev => ({ ...prev, justDate: value }));
  };

  const onClickZone = id => {
    setBooking(prev => ({ ...prev, zone: id }));
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
        condition={condition}
        format={format}
        setActiveTimeId={setActiveTimeId}
        setBooking={setBooking}
      />
    );
  });

  // const renderCondition = booking.justDate && booking.zone;

  return (
    <div className='bookings-container'>
      <div className='bookings-slider'>
        <BookingCalendar onClickDay={onClickDay} />
        <BookingZones onClickZone={onClickZone} />
        <BookingTimes timesEl={timesEl} />
      </div>
    </div>
  );
};

export default Bookings;
