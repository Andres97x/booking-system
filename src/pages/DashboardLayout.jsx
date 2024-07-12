import { Outlet, NavLink } from 'react-router-dom';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { LuBookMarked } from 'react-icons/lu';
import { IoRestaurantOutline, IoNewspaperOutline } from 'react-icons/io5';
import { MdOutlineLogout } from 'react-icons/md';

import '../styles/Dashboard.css';

const DashboardLayout = () => {
  return (
    <div className='dashboard-container'>
      <div className='dashboard-grid'>
        <aside className='dashboard-sidebar'>
          <NavLink
            to='notifications'
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            <IoMdNotificationsOutline />
            <span>Notificaciones</span>
          </NavLink>
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
          <NavLink
            to='news'
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            <IoNewspaperOutline />
            <span>Noticias</span>
          </NavLink>
        </aside>
        {/* <div className='dashboard-header'>
          <p>Bienvenido de vuelta Andrés</p>
          <button className='dashboard-logout_btn'>
            <span>Cerrar sesión</span> <MdOutlineLogout />
          </button>
        </div> */}
        <div className='dashboard-main'>{<Outlet />}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
