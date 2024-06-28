import Calendar from 'react-calendar';

const BookingCalendar = ({ onClickDay, sliderIndex, onClickMonth }) => {
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
