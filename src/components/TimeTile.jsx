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
    <button
      key={`time-${i}`}
      className={`time ${activeTimeId === i ? 'time-selected' : ''}`}
      disabled={condition}
      onClick={() => {
        if (condition) return;
        setActiveTimeId(i);
        setBooking(prev => ({ ...prev, dateTime: time }));
      }}
    >
      <p>{format(time, 'hh:mm aaa')}</p>
    </button>
  );
};

export default TimeTile;
