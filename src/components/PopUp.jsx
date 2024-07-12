import { IoCloseOutline } from 'react-icons/io5';

const PopUp = ({ children, className, onCloseHandler }) => {
  let popUpClassName = 'pop-up-window';
  if (className) {
    popUpClassName += ` ${className}`;
  }

  return (
    <>
      <div className={popUpClassName}>
        <IoCloseOutline className='pop-up-close' onClick={onCloseHandler} />
        {children}
      </div>
      <div className='pop-up-overlay' onClick={onCloseHandler}></div>
    </>
  );
};

export default PopUp;
