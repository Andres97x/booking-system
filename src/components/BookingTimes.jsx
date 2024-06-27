import { IoArrowBack, IoArrowForward } from 'react-icons/io5';

const BookingTimes = ({ timesEl }) => {
  return (
    <div className='times-container'>
      {/* <div className='times-nav_btns'>
        <button
          className='times-nav_btn'
          onClick={() => {
            setBooking(BOOKING_INIT);
            setActiveTimeId(null);
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
      </div> */}
      <div className='times-flex'>{timesEl}</div>
    </div>
  );
};

export default BookingTimes;
