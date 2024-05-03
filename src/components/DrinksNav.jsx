import useHandleSearchParams from '../hooks/useHandleSearchParams';

const DrinksNav = ({ drinks, drinksCategory }) => {
  const { handleSearchParams } = useHandleSearchParams();

  const drinkCategories = Array.from(
    new Set(drinks.map(drink => drink.subcategory))
  );

  const drinksNavEl = drinkCategories.map((drinkCat, i) => {
    const drinkCategory = drinkCat[0].toUpperCase() + drinkCat.slice(1);

    return (
      <button
        key={`drink-category-${i}`}
        onClick={() => {
          handleSearchParams('categoria', drinkCat);
        }}
        className={`drink-category-btn ${
          drinksCategory === drinkCat ? 'selected' : ''
        }`}
      >
        {drinkCategory}
      </button>
    );
  });

  return (
    <nav className='drinks-navbar'>
      {drinksNavEl}
      <button
        className='clear-drink-category'
        onClick={() => {
          handleSearchParams('categoria', null);
        }}
      >
        Todas
      </button>
    </nav>
  );
};

export default DrinksNav;
