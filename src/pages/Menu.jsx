import { useState } from 'react';
import { Link } from 'react-router-dom';

import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';
import useFetchMenu from '../hooks/useFetchMenu';

const Menu = () => {
  const [categoriesData, setCategoriesData] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState(null);

  useFetchMenu({
    type: 'categories',
    stateSetterFn: setCategoriesData,
    setStatus,
    setError,
  });

  const getGridStyle = categoriesData => {
    if (categoriesData.length === 1) {
      return {
        '--row-span-first-category': '1',
        '--aspect-ratio-first-category': '1 / 0.45',
      };
    } else if (categoriesData.length < 5) {
      return {
        '--row-span-first-category': '1',
        '--aspect-ratio-first-category': '1 / 0.5',
      };
    } else {
      return {
        '--row-span-first-category': '2',
        '--aspect-ratio-first-category': '1 / 1.01',
      };
    }
  };

  const categoriesEl = categoriesData.map((category, i) => {
    const pathName = `${category.id}-${category.name
      .split(' ')
      .join('-')
      .toLowerCase()}`;

    return (
      <Link to={pathName} key={`menu-category-${i}`} className='menu-category'>
        <img src={category.image} alt={category.imageAlt} />
        <div className='category-content'>
          <h3 className='catergory-title'>{category.name}</h3>
          <p className='category-description'>{category.description}</p>
        </div>
      </Link>
    );
  });

  if (status === 'loading') {
    return <Spinner spinnerContainerClassName='categories-spinner-container' />;
  }

  if (error) {
    return (
      <ErrorMessage
        message={error}
        errorContainerClassName='error-menu-container'
      />
    );
  }

  return (
    <div className='section-menu'>
      {categoriesData.length > 0 ? (
        <div className='menu-grid' style={getGridStyle(categoriesData)}>
          {categoriesEl}
        </div>
      ) : (
        <div className='categories-empty'>
          <p>Aún no hay categorias añadidas al menú</p>
        </div>
      )}
    </div>
  );
};

export default Menu;
