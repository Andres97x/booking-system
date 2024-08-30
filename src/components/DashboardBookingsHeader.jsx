import { IoIosSearch } from 'react-icons/io';
import { Timestamp } from 'firebase/firestore';
import { FaCheck } from 'react-icons/fa6';

import DashboardBookingFilterBtn from './DashboardBookingFilterBtn';

const DashboardBookingsHeader = ({
  error,
  inputData,
  handleChange,
  bookingDateFilter,
  setBookingDateFilter,
  selectedBookings,
  displayedBookings,
  handleSelectAllBookings,
  areAllBookingsSelected,
}) => {
  const renderFilters = () => {
    const filters = ['Hoy', 'Esta semana', 'Este mes', 'Todos', 'Pasados'];

    const filterClassName = date => {
      let className = 'card-date-filter';
      date === bookingDateFilter && (className += ' selected');
      date === 'Pasados' && (className += ' past-date');
      return className;
    };

    return filters.map((date, i) => (
      <DashboardBookingFilterBtn
        key={`booking-card-date-${i}`}
        date={date}
        filterClassName={filterClassName}
        setBookingDateFilter={setBookingDateFilter}
      />
    ));
  };

  const getLimitDate = () => {
    const date = new Date(Timestamp.now().toMillis());
    return date.toISOString().split('T')[0];
  };

  return (
    <div className='dashboard-bookings-header'>
      <div style={{ display: 'flex', gap: '3rem', alignItems: 'center' }}>
        <h3>Reservas</h3>
        {!error && (
          <div className='search-id-input-container'>
            <div className='search-id-input-container_svg-container'>
              <IoIosSearch />
            </div>
            <input
              type='search'
              id='booking-id-input'
              name='id'
              placeholder='Búsqueda por ID'
              value={inputData.id}
              onChange={handleChange}
              className={inputData.id ? 'active' : ''}
            />
          </div>
        )}

        {(bookingDateFilter === 'Todos' || bookingDateFilter === 'Pasados') &&
          !error && (
            <div className='date-input-container'>
              <input
                type='date'
                name='date'
                value={inputData.date}
                onChange={handleChange}
                min={bookingDateFilter === 'Todos' ? getLimitDate() : null}
                max={bookingDateFilter === 'Pasados' ? getLimitDate() : null}
              />
            </div>
          )}

        <div className='booking-cards-select-options'>
          <div
            className={`select-all-bookings-option ${
              areAllBookingsSelected() ? 'selected' : ''
            }`}
            onClick={() => {
              handleSelectAllBookings(displayedBookings);
            }}
          >
            <p className='instant-popup'>Seleccionar</p>
            <FaCheck />
          </div>
          {selectedBookings.length >= 1 && (
            <div>{selectedBookings.length} seleccionados</div>
          )}
        </div>
      </div>
      {!error && (
        <div className='date-filters-container'>{renderFilters()}</div>
      )}
    </div>
  );
};

export default DashboardBookingsHeader;
