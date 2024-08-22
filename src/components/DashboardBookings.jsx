import { useState, useEffect, useMemo } from 'react';
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
  Timestamp,
} from 'firebase/firestore';
import { isToday, isThisWeek, isThisMonth, isSameDay } from 'date-fns';

import { db } from '../configs/firebase';
import DashboardBookingModal from './DashboardBookingModal';
import Spinner from './Spinner';
import DashboardBookingCard from './DashboardBookingCard';
import DashboardBookingsHeader from './DashboardBookingsHeader';
import DashboardBookingPaginationCtrls from './DashboardBookingPaginationCtrls';
import { bookingsResultsPerPage } from '../constants';

const DashboardBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [bookingDateFilter, setBookingDateFilter] = useState('Hoy');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchKey = useMemo(() => {
    return bookingDateFilter === 'Pasados' ? 'Pasados' : 'Vigentes';
  }, [bookingDateFilter]);
  const [inputData, setInputData] = useState({ id: '', date: '' });
  const [pageIndex, setPageIndex] = useState(1);

  const handleChange = e => {
    const { name, value } = e.target;
    setInputData(prev => ({ ...prev, [name]: value }));
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

  useEffect(() => {
    setInputData(prev => ({ ...prev, date: '' }));
  }, [bookingDateFilter]);

  const filterBookings = booking => {
    if (!booking) return;

    // Check if the booking date matches the input date filter
    const matchesDateFilter =
      bookingDateFilter === 'Hoy'
        ? isToday(booking.justDate.toMillis())
        : bookingDateFilter === 'Esta semana'
        ? isThisWeek(booking.justDate.toMillis())
        : bookingDateFilter === 'Este mes'
        ? isThisMonth(booking.justDate.toMillis())
        : bookingDateFilter === 'Pasados'
        ? booking.justDate.toMillis() <= Timestamp.now().toMillis()
        : true;

    // If both inputData.date and inputData.id are set by its filters
    if (inputData.date && inputData.id) {
      return (
        matchesDateFilter &&
        matchesDateFilter &&
        isSameDay(
          booking.justDate.toDate(),
          new Date(`${inputData.date}T00:00:00`)
        ) &&
        booking.id.toLowerCase().startsWith(inputData.id.toLowerCase())
      );
    }

    // If inputData.date is set, filter by it
    if (inputData.date) {
      return (
        matchesDateFilter &&
        isSameDay(
          booking.justDate.toDate(),
          new Date(`${inputData.date}T00:00:00`)
        )
      );
    }

    // If inputData.date is not set, but inputData.id is set, filter by ID
    if (inputData.id) {
      return (
        matchesDateFilter &&
        booking.id.toLowerCase().startsWith(inputData.id.toLowerCase())
      );
    }

    // If neither inputData.date nor inputData.id is set, apply the date filter
    return matchesDateFilter;
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

  const filteredBookings = bookings.filter(filterBookings);

  const getSearchResultsPage = function (dataArr, page) {
    const start = (page - 1) * bookingsResultsPerPage;
    const finish = page * bookingsResultsPerPage;

    return dataArr.slice(start, finish);
  };

  useEffect(() => {
    setPageIndex(1);
  }, [bookingDateFilter]);

  const renderBookingCards = () => {
    const displayedBookings = getSearchResultsPage(filteredBookings, pageIndex);

    if (loading) {
      return <Spinner spinnerContainerClassName='dashboard-main-spinner' />;
    } else if (error) {
      return <p className='error-message'>{error}</p>;
    } else if (displayedBookings.length === 0) {
      return (
        <p style={{ fontWeight: '500' }}>{`${renderBookingsEmptyMessage()} ${
          inputData.id && 'con este ID'
        } ${inputData.date && 'para la fecha establecida'}.`}</p>
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
      <DashboardBookingsHeader
        error={error}
        inputData={inputData}
        handleChange={handleChange}
        bookingDateFilter={bookingDateFilter}
        setBookingDateFilter={setBookingDateFilter}
      />

      {renderBookingCards()}

      <DashboardBookingPaginationCtrls
        filteredBookings={filterBookings}
        bookingsResultsPerPage={bookingsResultsPerPage}
        pageIndex={pageIndex}
        setPageIndex={setPageIndex}
      />

      <DashboardBookingModal selectedBooking={selectedBooking} />
    </div>
  );
};

export default DashboardBookings;
