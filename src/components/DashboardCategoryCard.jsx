import { IoEllipsisVertical } from 'react-icons/io5';
import { MdOutlineDelete } from 'react-icons/md';

const DashboardCategoryCard = ({ category, handleCategoryClick }) => {
  return (
    <div className='dashboard-menu-category-card'>
      <div className='category-card-header'>
        <p className='category-card-name'>
          {category.name[0].toUpperCase() + category.name.slice(1)}
        </p>
        <span className='category-card-order'>orden: {category.order}</span>
      </div>
      <div className='category-card-options'>
        <button className='dashboard-menu-see-items'>Ver items</button>
        <div>
          <button
            className='dashboard-menu-see-category-options'
            data-modal='modal-category-options'
            onClick={() => {
              handleCategoryClick(category);
            }}
          >
            <IoEllipsisVertical />
          </button>
          <button
            className='dashboard-menu-see-category-options'
            data-modal='modal-delete-category'
            onClick={() => {
              handleCategoryClick(category);
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
