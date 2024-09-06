import { Link } from 'react-router-dom';
import { MdOutlineDelete, MdEdit } from 'react-icons/md';

const DashboardMenuCard = ({ type, option, setSelectedOption }) => {
  return (
    <div
      className={`dashboard-menu-card ${type === 'item' ? 'item-card' : ''}`}
    >
      <div className='menu-card-header'>
        <p className='menu-card-name'>
          {option.name[0].toUpperCase() + option.name.slice(1)}
        </p>
        {type === 'category' && (
          <span className='menu-card-order'>{option.order}</span>
        )}
      </div>
      <div className='menu-card-options'>
        {type === 'category' && (
          <Link
            to={`${option.id}-${option.name.toLowerCase()}`}
            className='dashboard-menu-see-items'
            onClick={() => {
              setSelectedOption(option);
            }}
          >
            Ver items
          </Link>
        )}
        <div>
          <button
            className='dashboard-menu-see-options'
            data-modal={`modal-update-${type}`}
            onClick={() => {
              setSelectedOption(option);
            }}
          >
            <MdEdit />
          </button>
          <button
            className='dashboard-menu-see-options'
            data-modal={`modal-delete-${type}`}
            onClick={() => {
              setSelectedOption(option);
            }}
          >
            <MdOutlineDelete />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardMenuCard;
