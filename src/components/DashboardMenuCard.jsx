import { Link } from 'react-router-dom';
import { MdOutlineDelete, MdEdit } from 'react-icons/md';
import { formatPrice } from '../utils';

const DashboardMenuCard = ({ type, option, setSelectedOption }) => {
  return (
    <div className='dashboard-menu-card'>
      <div className='menu-card-header'>
        <p className='menu-card-name'>
          {option.name[0].toUpperCase() + option.name.slice(1)}
        </p>
        {type === 'category' ? (
          <span className='menu-card-order'>orden: {option.order}</span>
        ) : (
          <span className='menu-card-order'>{formatPrice(option.price)}</span>
        )}
      </div>
      <div className='menu-card-options'>
        <Link
          to={`${option.id}-${option.name.toLowerCase()}`}
          className='dashboard-menu-see-items'
          onClick={() => {
            setSelectedOption(option);
          }}
        >
          Ver items
        </Link>
        <div>
          <button
            className='dashboard-menu-see-options'
            data-modal={`modal-${type}-options`}
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
