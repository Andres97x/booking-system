const DashboardBookingFilterBtn = ({
  date,
  filterClassName,
  setBookingDateFilter,
}) => {
  return (
    <button
      className={filterClassName(date)}
      onClick={() => {
        setBookingDateFilter(date);
      }}
    >
      {date}
    </button>
  );
};

export default DashboardBookingFilterBtn;
