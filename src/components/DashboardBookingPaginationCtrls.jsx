import { BsFillCaretLeftFill, BsFillCaretRightFill } from 'react-icons/bs';

const DashboardBookingPaginationCtrls = ({
  filteredBookings,
  bookingsResultsPerPage,
  pageIndex,
  setPageIndex,
  loading,
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
      className={`pagination_btns-container dashboard-bookings-pagination ${
        filteredBookings.length <= bookingsResultsPerPage || loading
          ? 'ctrls-hidden'
          : ''
      }`}
    >
      <button onClick={goToPreviousPage} disabled={pageIndex === 1}>
        <BsFillCaretLeftFill />
      </button>

      <div>
        <span>{pageIndex}</span>/
        <span>
          {Math.ceil(filteredBookings.length / bookingsResultsPerPage)}
        </span>
      </div>

      <button
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
