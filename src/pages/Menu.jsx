import { Link } from 'react-router-dom';
import '../styles/Menu.css';
import { categoriesData, firstDrinkCategory } from '../data/menuData';

const Menu = () => {
  const categoriesEl = categoriesData.map((category, i) => {
    return (
      <Link
        to={
          category.category === 'bebidas'
            ? `${category.category}?categoria=${firstDrinkCategory}`
            : category.category
        }
        key={`menu-category-${i}`}
        className={`menu-category menu-${category.category}`}
      >
        <img src={category.image} alt={category.imageAlt} />
        <div className='category-content'>
          <h3 className='catergory-title'>{category.name}</h3>
          <p className='category-description'>{category.description}</p>
        </div>
      </Link>
    );
  });

  return (
    <div className='section-menu'>
      <div className='menu-grid'>{categoriesEl}</div>
    </div>
  );
};

export default Menu;
