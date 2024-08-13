import { useState, useEffect, useMemo } from 'react';
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
  Timestamp,
} from 'firebase/firestore';
import { isToday, isThisWeek, isThisMonth } from 'date-fns';
import { IoIosSearch } from 'react-icons/io';

import { db } from '../configs/firebase';
import DashboardBookingModal from './DashboardBookingModal';
import Spinner from './Spinner';
import DashboardBookingCard from './DashboardBookingCard';
import DashboardBookingFilterBtn from './DashboardBookingFilterBtn';

const DashboardBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [bookingDateFilter, setBookingDateFilter] = useState('Hoy');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchKey = useMemo(() => {
    return bookingDateFilter === 'Pasados' ? 'Pasados' : 'Vigentes';
  }, [bookingDateFilter]);
  const [searchInput, setSearchInput] = useState('');

  const handleChange = e => {
    const { value } = e.target;
    setSearchInput(value);
  };

  useEffect(() => {
    // fetch bookings in real-time
    const q = query(
      collection(db, 'bookings'),
      where('dateTime', fetchKey === 'Pasados' ? '<=' : '>', Timestamp.now()),
      orderBy('dateTime')
    );

    setLoading(true);

    const unsubscribe = onSnapshot(
      q,
      querySnapshot => {
        const retrievedData = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        }));

        setBookings(retrievedData);
        setLoading(false);
      },
      error => {
        console.error(error);
        setError(
          'Hubo un problema al obtener los datos de las reservas, por favor reporta este fallo'
        );
      }
    );

    return unsubscribe;
  }, [fetchKey]);

  const filterBookings = booking => {
    switch (bookingDateFilter) {
      case 'Hoy':
        return isToday(booking.justDate.toMillis());
      case 'Esta semana':
        return isThisWeek(booking.justDate.toMillis());
      case 'Este mes':
        return isThisMonth(booking.justDate.toMillis());
      case 'Todos':
      case 'Pasados':
      default:
        return true;
    }
  };

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

  const renderBookingsEmptyMessage = () => {
    const messages = {
      Hoy: `No hay reservas para hoy`,
      'Esta semana': 'No hay reservas para esta semana',
      'Este mes': 'No hay reservas para este mes',
      Todos: 'No hay reservas registradas',
      Pasados: 'No hay reservas registradas en el pasado',
    };

    return messages[bookingDateFilter];
  };

  const renderBookingCards = () => {
    let displayedBookings = bookings.filter(filterBookings);

    if (searchInput) {
      displayedBookings = displayedBookings.filter(booking =>
        booking.id.toLowerCase().startsWith(searchInput.toLowerCase())
      );
    }

    if (loading) {
      return <Spinner spinnerContainerClassName='dashboard-main-spinner' />;
    } else if (error) {
      return <p className='error-message'>{error}</p>;
    } else if (displayedBookings.length === 0) {
      return (
        <p style={{ fontWeight: '500' }}>{`${renderBookingsEmptyMessage()} ${
          searchInput && 'con este ID'
        }`}</p>
      );
    } else {
      return (
        <div className='dashboard-bookings-grid'>
          {displayedBookings.map((booking, i) => (
            <DashboardBookingCard
              key={`booking-card-${i}`}
              booking={booking}
              setSelectedBooking={setSelectedBooking}
            />
          ))}
        </div>
      );
    }
  };

  return (
    <div className='dashboard-bookings'>
      <div className='dashboard-bookings-header'>
        <div style={{ display: 'flex', gap: '3rem', alignItems: 'center' }}>
          <h3>Reservas</h3>
          <div className='dashboard-bookings-input-container'>
            <div className='dashboard-bookings-input-container_svg-container'>
              <IoIosSearch />
            </div>
            <input
              type='search'
              id='booking-id-input'
              placeholder='Búsqueda por ID'
              value={searchInput}
              onChange={handleChange}
              className={searchInput ? 'active' : ''}
            />
          </div>
        </div>
        {!error && (
          <div className='date-filters-container'>{renderFilters()}</div>
        )}
      </div>

      {renderBookingCards()}
      <DashboardBookingModal selectedBooking={selectedBooking} />
    </div>
  );
};

export default DashboardBookings;
