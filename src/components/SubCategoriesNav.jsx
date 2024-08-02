import useHandleSearchParams from '../hooks/useHandleSearchParams';

const SubCategoriesNav = ({ items, selectedSubCategory }) => {
  const { handleSearchParams } = useHandleSearchParams();

  const subCategories = Array.from(
    new Set(
      items.filter(item => item.subCategory).map(item => item.subCategory)
    )
  );

  const subCategoriesEl = subCategories.map((subCategory, i) => {
    const subCategoryName = subCategory[0].toUpperCase() + subCategory.slice(1);

    return (
      <button
        key={`sub-category-${i}`}
        onClick={() => {
          handleSearchParams('sub-category', subCategory);
        }}
        className={`sub-category-btn ${
          selectedSubCategory === subCategory ? 'selected' : ''
        }`}
      >
        {subCategoryName}
      </button>
    );
  });

  return (
    <nav className='subcategory-navbar'>
      <button
        className={`sub-category-btn ${!selectedSubCategory ? 'selected' : ''}`}
        onClick={() => {
          handleSearchParams('sub-category', null);
        }}
      >
        Todas
      </button>
      {subCategoriesEl}
    </nav>
  );
};

export default SubCategoriesNav;
