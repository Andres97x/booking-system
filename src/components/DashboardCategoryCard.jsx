import { IoEllipsisVertical } from 'react-icons/io5';

const DashboardCategoryCard = ({ category }) => {
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
        <button
          className='dashboard-menu-see-options'
          data-modal='modal-options'
        >
          <IoEllipsisVertical />
        </button>
      </div>
    </div>
  );
};

export default DashboardCategoryCard;
