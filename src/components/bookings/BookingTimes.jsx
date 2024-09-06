import { useEffect, useState, useContext } from 'react';
import { add, format } from 'date-fns';
// prettier-ignore
import { collection, query, where, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '../../configs/firebase';

// prettier-ignore
import { OPENING_TIME, CLOSING_TIME, INTERVAL, ZONE_TABLES } from '../../constants';
import { BookingContext } from '../../contexts/BookingContext';
import { getTimes, getTakenTimes } from '../../utils';

import TimeTile from './TimeTile';
import Spinner from '../utils/Spinner';

const BookingTimes = () => {
  const {
    booking,
    sliderIndex,
    activeTimeId,
    onClickTime,
    timesStatus,
    setTimesStatus,
    timesError,
    setTimesError,
    setSubmitError,
  } = useContext(BookingContext);

  const [bookingsOnThisDayAndZone, setBookingsOnThisDayAndZone] = useState([]);

  useEffect(() => {
    if (!booking.justDate || !booking.zone || sliderIndex === 3) return;

    const fetchBookings = async () => {
      const q = query(
        collection(db, 'bookings'),
        where('zone', '==', booking.zone),
        where('justDate', '==', Timestamp.fromDate(booking.justDate))
      );

      try {
        setTimesStatus('loading');
        const querySnapshot = await getDocs(q);

        const retrievedData = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        }));

        setBookingsOnThisDayAndZone(retrievedData);
        setSubmitError(null);
      } catch (err) {
        console.error(err);
        setTimesError(
          'No se pudo obtener la disponibilidad de las mesas, por favor reporta este fallo.'
        );
      } finally {
        setTimesStatus('idle');
      }
    };
    fetchBookings();
  }, [booking]);

  const times = getTimes(booking, INTERVAL, add, OPENING_TIME, CLOSING_TIME);
  // console.log(times);

  const takenTimes = getTakenTimes(
    booking,
    bookingsOnThisDayAndZone,
    add,
    INTERVAL
  );

  // Ocurrences mean how many times the current looping time matches the taken times
  const getOcurrences = (takenTimes, currentTime) => {
    return takenTimes?.filter(hour => hour === Date.parse(currentTime));
  };

  const timesEl = times?.map((time, i, array) => {
    const ocurrences = getOcurrences(takenTimes, time);
    // ocurrences?.forEach(stamp => console.log(new Date(stamp).toString()));

    // Getting ocurrences for half an hour and one hour later, if some table isn't available at those times, I don't want the user to be able to book a table at this current time (collapsing times).
    // => this will determine wheter the current <TimeTile/> will be disabled or not depending on the ocurrences of the time that is 1 loop after.
    const ocurrencesOnNextTime = getOcurrences(takenTimes, array[i + 1]);

    // => this will determine wheter the current <TimeTile/> will be disabled or not depending on the ocurrences of the time that is 2 loops after.
    const ocurrencesAfterNextTime = getOcurrences(takenTimes, array[i + 2]);

    const condition =
      Timestamp.fromDate(time) < Timestamp.now() ||
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
        onClickTime={onClickTime}
      />
    );
  });

  return (
    <div
      className='times-container'
      style={{ transform: `translateX(${-100 * sliderIndex}%)` }}
    >
      {timesError ? (
        <div className='times-error-container'>
          <p>{timesError}</p>
        </div>
      ) : timesStatus === 'loading' ? (
        <Spinner />
      ) : (
        <div className='times-grid'>{timesEl}</div>
      )}
    </div>
  );
};

export default BookingTimes;
