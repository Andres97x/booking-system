import { useState, useEffect } from 'react';
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
  Timestamp,
} from 'firebase/firestore';
import { format, isToday, isThisWeek, isThisMonth } from 'date-fns';
import { es } from 'date-fns/locale';

import { db } from '../configs/firebase';
import DashboardBookingModal from './DashboardBookingModal';
import Spinner from './Spinner';
import { capitalizeDate } from '../utils';

const DashboardBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingDateFilter, setBookingDateFilter] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    // fetch bookings in real-time
    const q = query(
      collection(db, 'bookings'),
      where('dateTime', '>', Timestamp.now()),
      orderBy('dateTime')
    );

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
      }
    );

    return unsubscribe;
  }, []);

  useEffect(() => {
    setBookingDateFilter('Hoy');
  }, []);

  const dates = ['Hoy', 'Esta semana', 'Este mes', 'Todos'];

  const bookingDates = dates.map((date, i) => (
    <button
      key={`booking-card-date-${i}`}
      className={`card-date-filter ${
        date === bookingDateFilter ? 'selected' : ''
      }`}
      onClick={() => {
        setBookingDateFilter(date);
      }}
    >
      {date}
    </button>
  ));

  const displayedBookings = bookings.filter(booking => {
    if (bookingDateFilter === 'Hoy') {
      return isToday(booking.justDate.toMillis());
    } else if (bookingDateFilter === 'Esta semana') {
      return isThisWeek(booking.justDate.toMillis());
    } else if (bookingDateFilter === 'Este mes') {
      return isThisMonth(booking.justDate.toMillis());
    } else {
      return true;
    }
  });

  const bookingCardsEl = displayedBookings.map((booking, i) => {
    return (
      <button
        key={`booking-card-${i}`}
        className='booking-card'
        data-modal='booking-modal'
        onClick={() => setSelectedBooking(booking)}
      >
        <h5>
          {booking.firstName} {booking.lastName}
        </h5>
        <p>
          {capitalizeDate(
            format(booking.justDate.toDate(), "EEE d 'de' MMMM',' y", {
              locale: es,
            })
          )}{' '}
          {format(booking.dateTime.toDate(), 'hh:mm aaa')}
        </p>
      </button>
    );
  });

  const bookingsEmptyMessage = dateFilter => {
    if (dateFilter === 'Hoy') {
      return 'No hay reservas para hoy';
    } else if (dateFilter === 'Esta semana') {
      return 'No hay reservas para esta semana';
    } else if (dateFilter === 'Este mes') {
      return 'No hay reservas para este mes';
    } else {
      return 'No hay reservas';
    }
  };

  return (
    <div className='dashboard-bookings'>
      <div className='dashboard-bookings-header'>
        <h3>Reservas</h3>
        <div className='date-filters-container'>{bookingDates}</div>
      </div>
      {loading ? (
        <Spinner spinnerContainerClassName='dashboard-main-spinner' />
      ) : displayedBookings.length === 0 ? (
        <p style={{ fontWeight: '500' }}>
          {bookingsEmptyMessage(bookingDateFilter)}
        </p>
      ) : (
        <div className='dashboard-bookings-grid'>{bookingCardsEl}</div>
      )}

      <DashboardBookingModal selectedBooking={selectedBooking} />
    </div>
  );
};

export default DashboardBookings;
