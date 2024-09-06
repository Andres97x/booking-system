import HighlightMatch from './HighlightMatch';

const filteredOptions = ({ query, filteredOptions, onOptionClick }) => {
  return (
    <ul className='filtered-options-ul'>
      {filteredOptions.map((option, i) => (
        <li
          key={`item-subcategory-suggested-option-${i}`}
          onClick={() => {
            onOptionClick(option);
          }}
        >
          <HighlightMatch option={option} query={query} />
        </li>
      ))}
    </ul>
  );
};

export default filteredOptions;
