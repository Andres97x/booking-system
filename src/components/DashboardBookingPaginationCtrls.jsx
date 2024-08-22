import { BsFillCaretLeftFill, BsFillCaretRightFill } from 'react-icons/bs';

const DashboardBookingPaginationCtrls = ({
  filteredBookings,
  bookingsResultsPerPage,
  pageIndex,
  setPageIndex,
}) => {
  const goToNextPage = () => {
    setPageIndex(prev => {
      if (prev >= Math.ceil(filteredBookings.length / bookingsResultsPerPage))
        return;

      return prev + 1;
    });
  };

  const goToPreviousPage = () => {
    setPageIndex(prev => {
      if (prev <= 1) return;
      return prev - 1;
    });
  };

  return (
    <div
      className={`bookings-ctrl_btns dashboard-ctrl ${
        filteredBookings.length <= bookingsResultsPerPage ? 'ctrls-hidden' : ''
      }`}
    >
      <button
        className='bookings-btn bookings-back_btn'
        onClick={goToPreviousPage}
        disabled={pageIndex === 1}
      >
        <BsFillCaretLeftFill />
      </button>

      <div>
        <span>{pageIndex}</span>/
        <span>
          {Math.ceil(filteredBookings.length / bookingsResultsPerPage)}
        </span>
      </div>

      <button
        className='bookings-btn bookings-back_btn'
        onClick={goToNextPage}
        disabled={
          pageIndex ===
          Math.ceil(filteredBookings.length / bookingsResultsPerPage)
        }
      >
        <BsFillCaretRightFill />
      </button>
    </div>
  );
};

export default DashboardBookingPaginationCtrls;
