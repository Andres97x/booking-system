import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../configs/firebase';
import { IoEllipsisVertical } from 'react-icons/io5';

import useHandleSearchParams from '../hooks/useHandleSearchParams';
import DashboardAddCategoryPopUp from './DashboardAddCategoryPopUp';
import DashboardAddItemPopUp from './DashboardAddItemPopUp';
import CategoryOptionsPopUP from './CategoryOptionsPopUP';

const DashboardMenu = () => {
  const [addCategoryPopUpActive, setAddCategoryPopUpActive] = useState(false);
  const [categoryOptionsPopUpActive, setCategoryOptionsPopUpActive] =
    useState(false);
  const [addItempopUpActive, setAddItemPopUpActive] = useState(false);
  const [categoriesData, setCategoriesData] = useState([]);
  const { searchParams, handleSearchParams } = useHandleSearchParams();

  console.log(categoriesData);

  const closeItemPopUp = () => {
    setAddItemPopUpActive(false);
  };

  const closeCategoryPopUp = () => {
    setAddCategoryPopUpActive(false);
  };

  const closeOptionPopUp = () => {
    setCategoryOptionsPopUpActive(false);
  };

  const categoriesDataEl = categoriesData.map((category, i) => {
    return (
      <div
        className='dashboard-menu-category-card'
        key={`dashboard-menu-category-card-${i}`}
      >
        <p>{category.name}</p>
        <div className='category-card-options'>
          <button
            className='dashboard-menu-see-items'
            onClick={() => {
              handleSearchParams(
                'category',
                `${category.name.split(' ').join('-').toLowerCase()}`
              );
            }}
          >
            Ver items
          </button>
          <button
            className='dashboard-menu-see-options'
            onClick={() => {
              setCategoryOptionsPopUpActive(true);
            }}
          >
            <IoEllipsisVertical />
          </button>
        </div>
      </div>
    );
  });

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'categories'));

      const retrievedData = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));

      setCategoriesData(retrievedData);
    };

    fetchData();
  }, []);

  return (
    <div className='dashboard-menu'>
      <div className='dashboard-menu-bar'>
        <h3>Categorías</h3>
        <button
          className='dashboard-btn'
          onClick={() => {
            setAddCategoryPopUpActive(true);
          }}
        >
          Añadir categoría
        </button>

        <button
          className='dashboard-btn left-margin'
          onClick={() => {
            setAddItemPopUpActive(true);
          }}
        >
          Añadir item
        </button>
      </div>

      {addCategoryPopUpActive ? (
        <DashboardAddCategoryPopUp closePopUp={closeCategoryPopUp} />
      ) : null}

      {addItempopUpActive ? (
        <DashboardAddItemPopUp closePopUp={closeItemPopUp} />
      ) : null}

      {categoryOptionsPopUpActive ? (
        <CategoryOptionsPopUP closePopUp={closeOptionPopUp} />
      ) : null}

      {/* <p>Categorías</p> */}
      <div className='dashboard-menu-grid'>{categoriesDataEl}</div>
    </div>
  );
};

export default DashboardMenu;
