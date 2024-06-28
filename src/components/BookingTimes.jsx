const BookingTimes = ({ timesEl, sliderIndex }) => {
  return (
    <div
      className='times-container'
      style={{ transform: `translateX(${-100 * sliderIndex}%)` }}
    >
      <div className='times-flex'>{timesEl}</div>
    </div>
  );
};

export default BookingTimes;
