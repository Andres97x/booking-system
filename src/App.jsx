import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import './styles/app.css';

import PageLayout from './components/PageLayout';
import Home from './pages/Home';
import About from './pages/About';
import Bookings from './pages/Bookings';
import Menu from './pages/Menu';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<PageLayout />}>
      <Route index element={<Home />} />
      <Route path='about' element={<About />} />
      <Route path='bookings' element={<Bookings />} />
      <Route path='menu' element={<Menu />} />
      <Route path='menu/:category' element={<div>hola</div>} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
