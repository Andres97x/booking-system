import { Link } from 'react-router-dom';

import aboutUs from '../assets/about-us.webp';

const About = () => {
  return (
    <div className='section-about'>
      <div className='about-img-container'>
        <img src={aboutUs} alt='Dentro de un restaurante elegante' />
      </div>
      <div className='about-content'>
        <h2>Acerca de Nosotros</h2>
        <p>
          En Éclat Étoilé, creemos que cada comida es una obra de arte y cada
          experiencia culinaria, un viaje sensorial. Nuestro compromiso con la
          excelencia se refleja en cada detalle, desde la selección meticulosa
          de ingredientes frescos y locales hasta la presentación impecable de
          cada plato. Bajo la dirección de chefs galardonados, ofrecemos una
          fusión única de sabores tradicionales y técnicas modernas que deleitan
          el paladar y elevan el espíritu. Con un ambiente elegante y un
          servicio personalizado, nos dedicamos a crear momentos memorables que
          perduren en el corazón de nuestros comensales. Aquí, la pasión por la
          gastronomía se convierte en una celebración de la vida.
        </p>
      </div>
    </div>
  );
};

export default About;
