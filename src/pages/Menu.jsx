import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';

import { storage, db } from '../configs/firebase';
import { firstDrinkCategory } from '../data/menuData';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';
import '../styles/Menu.css';

const Menu = () => {
  const [categoriesData, setCategoriesData] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

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

  useEffect(() => {
    // Fetch categories data from database
    const fetchCategoriesData = async () => {
      const collectionRef = collection(db, 'categories');

      const q = query(collectionRef, orderBy('order'));
      try {
        setStatus('loading');
        const querySnapshot = await getDocs(q);
        const retrievedData = await Promise.all(
          querySnapshot.docs.map(async doc => {
            const data = doc.data();
            // Create a reference with an initial file path and name
            const pathReference = ref(storage, data.imageRef);
            try {
              const url = await getDownloadURL(pathReference);
              return {
                description: data.description,
                name: data.name,
                id: doc.id,
                image: url,
              };
            } catch (err) {
              console.error(err);
              // Return a fallback object if there's an error
              return {
                description: data.description,
                name: data.name,
                id: doc.id,
                image: null,
              };
            }
          })
        );
        setCategoriesData(retrievedData);
      } catch (err) {
        setError('No se pudieron obtener los datos de la categoría');
      } finally {
        setStatus('idle');
      }
    };

    fetchCategoriesData();
  }, []);

  const categoriesEl = categoriesData.map((category, i) => {
    const pathName = category.name.split(' ').join('-').toLowerCase();

    return (
      <Link
        to={
          pathName === 'bebidas'
            ? `${pathName}?categoria=${firstDrinkCategory}`
            : pathName
        }
        key={`menu-category-${i}`}
        className='menu-category'
      >
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
