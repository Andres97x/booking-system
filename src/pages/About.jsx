import { Link } from 'react-router-dom';

import aboutUs from '../assets/about-us.jpg';
import '../styles/About.css';

const About = () => {
  return (
    <div className='section-about'>
      <div>
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
            fusión única de sabores tradicionales y técnicas modernas que
            deleitan el paladar y elevan el espíritu. Con un ambiente elegante y
            un servicio personalizado, nos dedicamos a crear momentos memorables
            que perduren en el corazón de nuestros comensales. Aquí, la pasión
            por la gastronomía se convierte en una celebración de la vida.
          </p>
          <p>
            Nos enorgullece ser un destino para los amantes de la buena mesa,
            donde cada visita es una oportunidad para descubrir nuevas
            sensaciones y disfrutar de una hospitalidad sin igual. En Éclat
            Étoilé, no solo servimos comida; creamos experiencias que inspiran y
            conectan a las personas. Ya sea una cena íntima, una celebración
            especial, o una reunión de negocios, nuestro objetivo es siempre
            superar sus expectativas y ofrecerle una velada que recordará por
            mucho tiempo.
          </p>
        </div>

        <div className='about-redirection-btns'>
          <Link to='/menu'>Ver el menú</Link>
          <Link to='/bookings'>Hacer una reserva</Link>
        </div>
      </div>
    </div>
  );
};

export default About;
