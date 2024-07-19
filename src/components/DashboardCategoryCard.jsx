import { Link } from 'react-router-dom';
import { MdOutlineDelete, MdEdit } from 'react-icons/md';

const DashboardCategoryCard = ({ category, setSelectedCategory }) => {
  return (
    <div className='dashboard-menu-category-card'>
      <div className='category-card-header'>
        <p className='category-card-name'>
          {category.name[0].toUpperCase() + category.name.slice(1)}
        </p>
        <span className='category-card-order'>orden: {category.order}</span>
      </div>
      <div className='category-card-options'>
        <Link
          to={`${category.id}-${category.name.toLowerCase()}`}
          className='dashboard-menu-see-items'
          onClick={() => {
            setSelectedCategory(category);
          }}
        >
          Ver items
        </Link>
        <div>
          <button
            className='dashboard-menu-see-category-options'
            data-modal='modal-category-options'
            onClick={() => {
              setSelectedCategory(category);
            }}
          >
            <MdEdit />
          </button>
          <button
            className='dashboard-menu-see-category-options'
            data-modal='modal-delete-category'
            onClick={() => {
              setSelectedCategory(category);
            }}
          >
            <MdOutlineDelete />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardCategoryCard;
