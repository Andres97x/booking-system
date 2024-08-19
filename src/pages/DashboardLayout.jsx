import { Outlet, NavLink } from 'react-router-dom';
import { LuBookMarked } from 'react-icons/lu';
import { IoRestaurantOutline } from 'react-icons/io5';

import '../styles/Dashboard.css';

const DashboardLayout = () => {
  return (
    <div className='dashboard-container'>
      <div className='dashboard-grid'>
        <aside className='dashboard-sidebar'>
          <NavLink
            to='bookings'
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            <LuBookMarked />
            <span>Reservas</span>
          </NavLink>
          <NavLink
            to='menu'
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            <IoRestaurantOutline />
            <span>Menú</span>
          </NavLink>
        </aside>
        <div className='dashboard-main'>{<Outlet />}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
