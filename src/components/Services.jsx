import flavors1 from '../assets/flavors-1.webp';
import flavors2 from '../assets/flavors-2.webp';
import flavors3 from '../assets/flavors-3.webp';

import { IoRestaurant } from 'react-icons/io5';
import { FaBowlFood } from 'react-icons/fa6';
import { RiMentalHealthFill } from 'react-icons/ri';

const News = () => {
  return (
    <div className='section section-services'>
      <div className='services-container'>
        <div>
          <h5>Una experiencia culinaria única</h5>
          <h2>El arte de los sabores</h2>
        </div>
        <div className='services-grid'>
          <div className='services-card'>
            <img src={flavors1} alt='Chef sosteniendo un plato exquisito' />
            <div className='services-card__content'>
              <div>
                <span>
                  <IoRestaurant />
                </span>
              </div>
              <div>
                <h5>Preparaciones</h5>
                <p>
                  Elaboramos meticulosamente cada plato, combinando técnicas
                  culinarias avanzadas y una atención al detalle.
                </p>
              </div>
            </div>
          </div>
          <div className='services-card'>
            <img src={flavors2} alt='Chef sosteniendo un plato exquisito' />
            <div className='services-card__content'>
              <div>
                <span>
                  <FaBowlFood />
                </span>
              </div>
              <div>
                <h5>Calidad e innovación</h5>
                <p>
                  Utilizamos ingredientes frescos, de temporada y de la más alta
                  calidad, priorizando preferencias y necesidades dietéticas de
                  nuestros clientes.
                </p>
              </div>
            </div>
          </div>
          <div className='services-card'>
            <img src={flavors3} alt='Chef sosteniendo un plato exquisito' />
            <div className='services-card__content'>
              <div>
                <span>
                  <RiMentalHealthFill />
                </span>
              </div>
              <div>
                <h5>Experiencias</h5>
                <p>
                  Cuidamos cada aspecto de la experiencia, desde la presentación
                  de los platos hasta la ambientación y la música de fondo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
