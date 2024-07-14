import { Route, BrowserRouter, Routes } from 'react-router-dom';

import { lazy, Suspense, useEffect } from 'react';
import './styles/app.css';

import { BookingContextWrapper } from './contexts/BookingContext';

import useCloseModalOnClickOutside from './hooks/useCloseModalOnClickOutside';

import PageLayout from './components/PageLayout';
import Home from './pages/Home';
import About from './pages/About';
import Bookings from './pages/Bookings';
import Menu from './pages/Menu';
const MenuItemsComponent = lazy(() => import('./pages/MenuItems'));
import DashboardLayout from './pages/DashboardLayout';
import DashboardMessage from './components/DashboardMessage';
import DashboardNotifications from './components/DashboardNotifications';
import DashboardBookings from './components/DashboardBookings';
import DashboardMenu from './components/DashboardMenu';
import DashboardNews from './components/DashboardNews';

function App() {
  useCloseModalOnClickOutside();

  useEffect(() => {
    const dialogs = document.querySelectorAll('dialog');
    // console.log(dialogs);

    dialogs.forEach(dialog => {
      console.log('closed');
      dialog.close();
    });
  });

  return (
    <BookingContextWrapper>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<PageLayout />}>
            <Route index element={<Home />} />
            <Route path='about' element={<About />} />
            <Route path='bookings' element={<Bookings />} />
            <Route path='menu' element={<Menu />} />
            <Route
              path='menu/:category'
              element={
                <Suspense fallback={<h2>Loading...</h2>}>
                  <MenuItemsComponent />
                </Suspense>
              }
            />
            <Route path='dashboard' element={<DashboardLayout />}>
              <Route index element={<DashboardMessage />} />
              <Route
                path='notifications'
                element={<DashboardNotifications />}
              />
              <Route path='bookings' element={<DashboardBookings />} />
              <Route path='menu' element={<DashboardMenu />} />
              <Route path='news' element={<DashboardNews />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </BookingContextWrapper>
  );
}

export default App;
