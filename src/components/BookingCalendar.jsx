import Calendar from 'react-calendar';

const BookingCalendar = ({ onClickDay }) => {
  return (
    <div className='calendar-container'>
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
