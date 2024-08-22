import CarouselGroup from './CarouselGroup';
import '../styles/CarouselGroup.css';

const Gallery = () => {
  return (
    <div className='section section-news'>
      <div className='news-container'>
        <div>
          <h5>Galería del Paladar Refinado</h5>
          <h2>Nuestras noticias y eventos</h2>
        </div>
      </div>
      <div className='news-carousel'>
        <CarouselGroup />
      </div>
    </div>
  );
};

export default Gallery;
