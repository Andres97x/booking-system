import { useContext } from 'react';
import Calendar from 'react-calendar';

import { BookingContext } from '../../contexts/BookingContext';

const BookingCalendar = () => {
  const { onClickDay, sliderIndex, onClickMonth } = useContext(BookingContext);

  return (
    <div
      className='calendar-container'
      style={{ transform: `translateX(${-100 * sliderIndex}%)` }}
    >
      <div>
        <Calendar
          onClickMonth={onClickMonth}
          onClickDay={onClickDay}
          minDate={new Date()}
          prev2Label={null}
          next2Label={null}
          minDetail='decade'
        />
      </div>
    </div>
  );
};

export default BookingCalendar;
