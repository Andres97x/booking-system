import CarouselGroup from './CarouselGroup';
import '../styles/CarouselGroup.css';

const News = () => {
  return (
    <div className='section section-news'>
      <div className='news-container'>
        <div>
          <h5>Noticias del Paladar Refinado</h5>
          <h2>Nuestras noticias y eventos</h2>
        </div>
      </div>
      <div className='news-carousel'>
        <CarouselGroup />
      </div>
    </div>
  );
};

export default News;
