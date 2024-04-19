import Calendar from 'react-calendar';

const BookingCalendar = ({ onClickDay }) => {
  return (
    <div className='calendar-container'>
      <Calendar
        onClickDay={onClickDay}
        minDate={new Date()}
        prev2Label={null}
        next2Label={null}
        minDetail='decade'
      />
      <p>Select a date</p>
    </div>
  );
};

export default BookingCalendar;
