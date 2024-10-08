import { Route, BrowserRouter, Routes } from 'react-router-dom';

import './styles/app.css';
import './styles/Home.css';
import './styles/About.css';
import './styles/CarouselGroup.css';
import './styles/Bookings.css';
import './styles/Menu.css';
import './styles/Dashboard.css';
import './styles/queries.css';
import './styles/queriesAbout.css';
import './styles/queriesMenu.css';
import './styles/queriesDashboardBookings.css';
import './styles/queriesDashboardMenu.css';
import './styles/queriesBookings.css';

import { BookingContextWrapper } from './contexts/BookingContext';

import useCloseModalOnClickOutside from './hooks/useCloseModalOnClickOutside';
import useOpenModalOnBtnClick from './hooks/useOpenModalOnBtnClick';

import PageLayout from './components/layouts/PageLayout';
import Home from './pages/Home';
import About from './pages/About';
import Bookings from './pages/Bookings';
import Menu from './pages/Menu';
import MenuItemsComponent from './pages/MenuItems';
import DashboardBookings from './pages/DashboardBookings';
import DashboardMenu from './pages/DashboardMenu';
import DashboardMenuItems from './pages/DashboardMenuItems';
import DashboardLayout from './components/layouts/DashboardLayout';
import DashboardMessage from './components/dashboard/DashboardMessage';
import NotFound from './pages/NotFound';

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
              <Route path='bookings' element={<DashboardBookings />} />
              <Route path='menu' element={<DashboardMenu />} />
              <Route path='menu/:category' element={<DashboardMenuItems />} />
            </Route>
            <Route path='*' element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </BookingContextWrapper>
  );
}

export default App;
