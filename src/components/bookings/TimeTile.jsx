const TimeTile = ({
  i,
  time,
  activeTimeId,
  condition,
  format,
  onClickTime,
}) => {
  return (
    <button
      key={`time-${i}`}
      className={`time ${activeTimeId === i ? 'time-selected' : ''}`}
      disabled={condition}
      onClick={() => {
        onClickTime(condition, i, time);
      }}
    >
      <p>{format(time, 'hh:mm aaa')}</p>
    </button>
  );
};

export default TimeTile;
