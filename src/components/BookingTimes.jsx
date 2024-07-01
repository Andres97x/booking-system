import { add, format } from 'date-fns';

// prettier-ignore
import { OPENING_TIME, CLOSING_TIME, INTERVAL, ZONE_TABLES } from '../constants';
import { getTimes, getTakenTimes } from '../utils';
import TimeTile from './TimeTile';

const BookingTimes = ({
  booking,
  bookings,
  sliderIndex,
  activeTimeId,
  onClickTime,
}) => {
  const times = getTimes(booking, INTERVAL, add, OPENING_TIME, CLOSING_TIME);
  // console.log(times);

  const takenTimes = getTakenTimes(booking, bookings, add, INTERVAL);

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
        onClickTime={onClickTime}
      />
    );
  });

  return (
    <div
      className='times-container'
      style={{ transform: `translateX(${-100 * sliderIndex}%)` }}
    >
      <div className='times-grid'>{timesEl}</div>
    </div>
  );
};

export default BookingTimes;
