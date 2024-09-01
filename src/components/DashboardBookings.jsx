import { useState, useEffect, useMemo } from 'react';
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
  Timestamp,
  doc,
  writeBatch,
} from 'firebase/firestore';

import { isToday, isThisWeek, isThisMonth, isSameDay } from 'date-fns';

import { db } from '../configs/firebase';
import DashboardBookingModal from './DashboardBookingModal';
import Spinner from './Spinner';
import DashboardBookingCard from './DashboardBookingCard';
import DashboardBookingsHeader from './DashboardBookingsHeader';
import DashboardBookingPaginationCtrls from './DashboardBookingPaginationCtrls';

const DashboardBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [bookingDateFilter, setBookingDateFilter] = useState('Hoy');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const fetchKey = useMemo(() => {
    return bookingDateFilter === 'Pasados' ? 'Pasados' : 'Vigentes';
  }, [bookingDateFilter]);

  const [inputData, setInputData] = useState({ id: '', date: '' });
  const [pageIndex, setPageIndex] = useState(1);

  const [selectedBookings, setSelectedBookings] = useState([]);
  const selectedBookingsId = selectedBookings.map(booking => booking.id);
  const [deleteBookingsStatus, setDeleteBookingsStatus] = useState('idle');
  const [deleteBookingsError, setDeleteBookingsError] = useState(null);
  const areAllBookingsSelected = () => {
    if (selectedBookingsId.length === 0) return false;

    return displayedBookings.every(booking =>
      selectedBookingsId.includes(booking.id)
    );
  };

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const deleteSelectedBookings = async (selectedBookings, modalRef) => {
    const bookingsCollectionRef = collection(db, 'bookings');

    const batch = writeBatch(db);

    selectedBookings.forEach(booking => {
      batch.delete(doc(bookingsCollectionRef, booking.id));
    });

    try {
      setDeleteBookingsStatus('loading');
      await batch.commit();
      setDeleteBookingsStatus('completed');

      setTimeout(() => {
        if (!modalRef.current) return;
        modalRef.current.close();
        setSelectedBookings([]);
        setDeleteBookingsStatus('idle');
      }, 1200);
    } catch (err) {
      setDeleteBookingsError(
        'Hubo un error al intentar eliminar las reservas seleccionadas, por favor reporta este fallo'
      );
      setDeleteBookingsStatus('idle');
    }
  };

  const handleCartSelect = clickedBooking => {
    // check if this booking has already been selected
    const isBookingSelected = selectedBookings.find(
      booking => booking.id === clickedBooking.id
    );

    // if so delete it from selected bookings
    if (isBookingSelected) {
      setSelectedBookings(prev =>
        prev.filter(booking => booking.id !== clickedBooking.id)
      );
    } else {
      // if not add it to selected bookings
      setSelectedBookings(prev => {
        return [...prev, clickedBooking];
      });
    }
  };

  const handleSelectAllBookings = currentDisplayedBookings => {
    if (displayedBookings.length === 0) return;

    if (areAllBookingsSelected() === true) {
      setSelectedBookings([]);
    } else {
      setSelectedBookings(currentDisplayedBookings);
    }
  };

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
    setSelectedBookings([]);
  }, [bookingDateFilter, inputData]);

  useEffect(() => {
    setInputData(prev => ({ ...prev, date: '' }));
    setPageIndex(1);
  }, [bookingDateFilter]);

  const [viewportWidth, setViewPortWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleViewportWidth = () => {
      setViewPortWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleViewportWidth);

    return () => {
      window.removeEventListener('resize', handleViewportWidth);
    };
  }, []);

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

  /// TEMPORARY
  const placeholderBookings = [];

  for (let i = 0; i < 40; i++) {
    if (bookings.length === 0) return;
    placeholderBookings.push(bookings[0]);
  }
  ///

  const bookingsResultsPerPage = () => {
    let resultsPerPageByScreenSize = 30;
    if (viewportWidth <= 1283) {
      resultsPerPageByScreenSize = 20;
    }

    if (viewportWidth <= 1000) {
      resultsPerPageByScreenSize = 15;
    }

    return resultsPerPageByScreenSize;
  };

  const resultsPerPage = bookingsResultsPerPage();

  console.log(resultsPerPage);

  const filteredBookings = placeholderBookings.filter(filterBookings);

  const getSearchResultsPage = function (dataArr, page) {
    const start = (page - 1) * resultsPerPage;
    const finish = page * resultsPerPage;

    return dataArr.slice(start, finish);
  };

  const displayedBookings = getSearchResultsPage(filteredBookings, pageIndex);

  const renderBookingCards = () => {
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
              handleCartSelect={handleCartSelect}
              selectedBookings={selectedBookings}
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
        selectedBookings={selectedBookings}
        displayedBookings={displayedBookings}
        handleSelectAllBookings={handleSelectAllBookings}
        areAllBookingsSelected={areAllBookingsSelected}
        deleteSelectedBookings={deleteSelectedBookings}
        deleteBookingsStatus={deleteBookingsStatus}
        deleteBookingsError={deleteBookingsError}
      />

      {renderBookingCards()}

      <DashboardBookingPaginationCtrls
        filteredBookings={filteredBookings}
        bookingsResultsPerPage={resultsPerPage}
        pageIndex={pageIndex}
        setPageIndex={setPageIndex}
        loading={loading}
      />

      <DashboardBookingModal selectedBooking={selectedBooking} />
    </div>
  );
};

export default DashboardBookings;
