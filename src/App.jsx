import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';

import { lazy, Suspense } from 'react';
import './styles/app.css';

import PageLayout from './components/PageLayout';
import Home from './pages/Home';
import About from './pages/About';
import Bookings from './pages/Bookings';
import Menu from './pages/Menu';
const MenuItemsComponent = lazy(() => import('./pages/MenuItems'));

/* TODO create CART component*/

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
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
