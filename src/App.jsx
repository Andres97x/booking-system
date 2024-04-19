import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';

import PageLayout from './components/PageLayout';
import Home from './pages/Home';
import About from './pages/About';
import Bookings from './pages/Bookings';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<PageLayout />}>
      <Route index element={<Home />} />
      <Route path='about' element={<About />} />
      <Route path='bookings' element={<Bookings />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
