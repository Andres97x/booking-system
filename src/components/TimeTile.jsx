const TimeTile = ({
  i,
  time,
  activeTimeId,
  condition,
  format,
  setActiveTimeId,
  setBooking,
}) => {
  return (
    <div key={`time-${i}`} className='time'>
      <button
        className={activeTimeId === i ? 'time-selected' : ''}
        disabled={condition}
        onClick={() => {
          if (condition) return;
          setActiveTimeId(i);
          setBooking(prev => ({ ...prev, dateTime: time }));
        }}
      >
        {format(time, 'hh:mm aaa')}
      </button>
    </div>
  );
};

export default TimeTile;
