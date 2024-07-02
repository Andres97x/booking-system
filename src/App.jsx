import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';

import { lazy, Suspense } from 'react';
import './styles/app.css';

import { BookingContextWrapper } from './contexts/BookingContext';

import PageLayout from './components/PageLayout';
import Home from './pages/Home';
import About from './pages/About';
import Bookings from './pages/Bookings';
import Menu from './pages/Menu';
const MenuItemsComponent = lazy(() => import('./pages/MenuItems'));
import DashboardLayout from './pages/DashboardLayout';
import DashboardMessage from './components/DashboardMessage';
import DashboardBookings from './components/DashboardBookings';

const router = createBrowserRouter(
  createRoutesFromElements(
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
        <Route path='bookings' element={<DashboardBookings />} />
      </Route>
    </Route>
  )
);

function App() {
  return (
    <BookingContextWrapper>
      <RouterProvider router={router} />;
    </BookingContextWrapper>
  );
}

export default App;
