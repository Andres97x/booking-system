import { useRef } from 'react';
import { Timestamp } from 'firebase/firestore';
import { MdCancel, MdOutlineDelete } from 'react-icons/md';
import { IoIosSearch } from 'react-icons/io';
import { FaCheck } from 'react-icons/fa6';

import DashboardBookingFilterBtn from './DashboardBookingFilterBtn';
import Modal from './Modal';
import Spinner from './Spinner';

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
  deleteSelectedBookings,
  deleteBookingsStatus,
  deleteBookingsError,
  loading,
}) => {
  const modalDeleteBookingsRef = useRef(null);

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
      <h3>Reservas</h3>

      {!error && (
        <div className='date-filters-container'>{renderFilters()}</div>
      )}

      {!loading &&
        (displayedBookings.length > 0 || inputData.id || inputData.date) && (
          <div
            className={`dashboard-bookings-header_inputs ${
              bookingDateFilter === 'Todos' || bookingDateFilter === 'Pasados'
                ? 'three-columns'
                : ''
            }`}
          >
            {!error && (
              <div className='search-id-input-container instant-popup-container'>
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
                <p className='instant-popup'>Buscar por ID</p>
              </div>
            )}

            {(bookingDateFilter === 'Todos' ||
              bookingDateFilter === 'Pasados') &&
              !error && (
                <div className='date-input-container instant-popup-container'>
                  <input
                    type='date'
                    name='date'
                    value={inputData.date}
                    onChange={handleChange}
                    min={bookingDateFilter === 'Todos' ? getLimitDate() : null}
                    max={
                      bookingDateFilter === 'Pasados' ? getLimitDate() : null
                    }
                  />
                  <p className='instant-popup' style={{ left: '0' }}>
                    Elegir una fecha
                  </p>
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
                <FaCheck />
              </div>
              {selectedBookings.length >= 1 && (
                <>
                  <p className='bookings-selected-number'>
                    ({selectedBookings.length})
                  </p>
                  <button
                    className='delete-selected-bookings-btn'
                    data-modal='modal-delete-bookings'
                    onClick={() => {}}
                  >
                    <MdOutlineDelete />
                  </button>
                  <Modal
                    id='modal-delete-bookings'
                    ref={modalDeleteBookingsRef}
                  >
                    {deleteBookingsStatus === 'idle' ? (
                      <div>
                        <p>
                          Estás seguro que quieres eliminar las reservas
                          seleccionadas?
                        </p>
                        {deleteBookingsError && (
                          <span className='error-message'>
                            {deleteBookingsError}
                          </span>
                        )}
                        <div className='modal-delete-bookings-btns'>
                          <button
                            className='delete-btn'
                            onClick={() => {
                              deleteSelectedBookings(
                                selectedBookings,
                                modalDeleteBookingsRef
                              );
                            }}
                          >
                            <MdOutlineDelete />
                            Eliminar
                          </button>
                          <button
                            className='cancel-btn'
                            onClick={() => {
                              modalDeleteBookingsRef.current.close();
                            }}
                          >
                            <MdCancel />
                            Cancelar
                          </button>
                        </div>
                      </div>
                    ) : deleteBookingsStatus === 'loading' ? (
                      <Spinner spinnerContainerClassName='modal-delete-bookings-spinner' />
                    ) : (
                      <p className='modal-delete-bookings-success'>
                        Se elimaron las reservas seleccionadas
                      </p>
                    )}
                  </Modal>
                </>
              )}
            </div>
          </div>
        )}
    </div>
  );
};

export default DashboardBookingsHeader;
