import { Route, BrowserRouter, Routes } from 'react-router-dom';

import './styles/app.css';
import './styles/Home.css';
import './styles/CarouselGroup.css';
import './styles/Bookings.css';
import './styles/Menu.css';
import './styles/Dashboard.css';
import './styles/queries.css';

import { BookingContextWrapper } from './contexts/BookingContext';

import useCloseModalOnClickOutside from './hooks/useCloseModalOnClickOutside';
import useOpenModalOnBtnClick from './hooks/useOpenModalOnBtnClick';

import PageLayout from './components/PageLayout';
import Home from './pages/Home';
import About from './pages/About';
import Bookings from './pages/Bookings';
import Menu from './pages/Menu';
import MenuItemsComponent from './pages/MenuItems';
import DashboardLayout from './pages/DashboardLayout';
import DashboardMessage from './components/DashboardMessage';
import DashboardNotifications from './components/DashboardNotifications';
import DashboardBookings from './components/DashboardBookings';
import DashboardMenu from './components/DashboardMenu';
import DashboardMenuCategory from './components/DashboardMenuCategory';

function App() {
  useOpenModalOnBtnClick();

  useCloseModalOnClickOutside(
    'dialog:not(.product-modal)',
    modal => {
      modal.close();
    },
    []
  );

  return (
    <BookingContextWrapper>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<PageLayout />}>
            <Route index element={<Home />} />
            <Route path='about' element={<About />} />
            <Route path='bookings' element={<Bookings />} />
            <Route path='menu' element={<Menu />} />
            <Route path='menu/:category' element={<MenuItemsComponent />} />
            <Route path='dashboard' element={<DashboardLayout />}>
              <Route index element={<DashboardMessage />} />
              <Route
                path='notifications'
                element={<DashboardNotifications />}
              />
              <Route path='bookings' element={<DashboardBookings />} />
              <Route path='menu' element={<DashboardMenu />} />
              <Route
                path='menu/:category'
                element={<DashboardMenuCategory />}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </BookingContextWrapper>
  );
}

export default App;
