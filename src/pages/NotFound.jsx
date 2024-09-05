import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className='not-found-container'>
      <div className='not-found-content'>
        <span>404</span>
        <div>
          <p>
            La página que estabas buscando no existe. Puede que hayas escrito
            mal la dirección o que la página se haya movido
          </p>
          <Link to='/'>Go home</Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
