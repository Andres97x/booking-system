import Calendar from 'react-calendar';

const BookingCalendar = ({ onClickDay, sliderIndex }) => {
  return (
    <div
      className='calendar-container'
      style={{ transform: `translateX(${-100 * sliderIndex}%)` }}
    >
      <div>
        <Calendar
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
