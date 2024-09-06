import { useState } from 'react';
import { Link } from 'react-router-dom';

import useFetchMenu from '../hooks/useFetchMenu';
import Spinner from '../components/utils/Spinner';
import ErrorMessage from '../components/utils/ErrorMessage';

const Menu = () => {
  const [categoriesData, setCategoriesData] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  useFetchMenu({
    type: 'categories',
    stateSetterFn: setCategoriesData,
    setStatus,
    setError,
  });

  const firstCategoryDimmensions =
    categoriesData.length <= 1
      ? 'small-size'
      : categoriesData.length < 5
      ? 'medium-size'
      : 'big-size';

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
        <div className={`menu-grid first-category-${firstCategoryDimmensions}`}>
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
