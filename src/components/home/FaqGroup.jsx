import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';

const FaqGroup = ({ title, body, id, activeGroupId, handleGroupClick }) => {
  return (
    <div
      className={`faq-content__group ${
        activeGroupId === id ? 'group-active' : ''
      }`}
    >
      <div className='faq-group__header' onClick={() => handleGroupClick(id)}>
        <h4>{title}</h4>

        {activeGroupId === id ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
      </div>

      <div className='faq-accordion'>
        <div>
          <p>{body}</p>
        </div>
      </div>
    </div>
  );
};

export default FaqGroup;
