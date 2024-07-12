import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';

import { storage, db } from '../configs/firebase';
// import { categoriesData, firstDrinkCategory } from '../data/menuData';
import '../styles/Menu.css';

const Menu = () => {
  const [categoriesData, setCategoriesData] = useState([]);
  console.log(categoriesData);

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
      try {
        const querySnapshot = await getDocs(collection(db, 'categories'));

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
        console.log(err);
      }
    };

    fetchCategoriesData();
  }, []);

  const categoriesEl = categoriesData.map((category, i) => {
    return (
      <Link
        to={
          category.category === 'bebidas'
            ? `${category.category}?categoria=${firstDrinkCategory}`
            : category.name.split(' ').join('-').toLowerCase()
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
      {categoriesData.length > 0 ? (
        <div className='menu-grid' style={getGridStyle(categoriesData)}>
          {categoriesEl}
        </div>
      ) : (
        <p className='categories-empty'>
          Aún no hay categorias añadidas al menú
        </p>
      )}
    </div>
  );
};

export default Menu;
