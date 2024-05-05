import ProductAddItem from './ProductAddItem';

const ProductOptions = ({ selectedItem, setOrder }) => {
  return (
    <div className='product-options'>
      {selectedItem.add && (
        <ProductAddItem selectedItem={selectedItem} setOrder={setOrder} />
      )}
    </div>
  );
};

export default ProductOptions;
