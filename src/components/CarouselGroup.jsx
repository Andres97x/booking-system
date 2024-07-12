import news1 from '../assets/news-1.jpg';
import news2 from '../assets/news-2.jpg';
import news3 from '../assets/news-3.jpg';
import news4 from '../assets/news-4.jpg';
import news5 from '../assets/news-5.jpg';
import news6 from '../assets/news-6.jpg';
import news7 from '../assets/news-7.jpg';
import news8 from '../assets/news-8.jpg';
import news9 from '../assets/news-9.jpg';
import news10 from '../assets/news-10.jpg';
import news11 from '../assets/news-11.jpg';
import news12 from '../assets/news-12.jpg';

import { useEffect, useRef } from 'react';

const CarouselGroup = () => {
  const progressBarRef = useRef(null);

  const onClickHandle = e => {
    let handle;

    if (e.target.matches('.handle')) {
      handle = e.target;
    } else {
      handle = e.target.closest('.handle');
    }

    if (handle === null) return;

    const slider = handle.closest('.container').querySelector('.slider');

    const sliderIndex = parseInt(
      getComputedStyle(slider).getPropertyValue('--slider-index')
    );

    const numItems = Math.ceil(slider.children.length);

    const itemsPerScreen = parseInt(
      getComputedStyle(slider).getPropertyValue('--items-per-screen')
    );

    const numSlides = numItems / itemsPerScreen;

    const progressBar = handle.closest('.row').querySelector('.progress-bar');

    const updateProgressBar = updatedIndex => {
      progressBar.children[sliderIndex].classList.remove('active');
      progressBar.children[updatedIndex].classList.add('active');
    };

    // Go to next slide
    if (handle.classList.contains('next-handle')) {
      if (sliderIndex >= numSlides - 1) {
        // if in last slide
        slider.style.setProperty('--slider-index', 0);
        updateProgressBar(0);
      } else {
        slider.style.setProperty('--slider-index', sliderIndex + 1);
        updateProgressBar(sliderIndex + 1);
      }
    }

    // Go to prev slide
    if (handle.classList.contains('prev-handle')) {
      if (sliderIndex <= 0) {
        // if in first slide
        slider.style.setProperty('--slider-index', numSlides - 1);
        updateProgressBar(numSlides - 1);
      } else {
        slider.style.setProperty('--slider-index', sliderIndex - 1);
        updateProgressBar(sliderIndex - 1);
      }
    }
  };

  const calculateProgressBar = progressBar => {
    if (!progressBar) return;

    progressBar.innerHTML = '';

    const slider = progressBar.closest('.row').querySelector('.slider');

    let sliderIndex = parseInt(
      getComputedStyle(slider).getPropertyValue('--slider-index')
    );

    const numItems = slider.children.length;

    const itemsPerScreen = parseInt(
      getComputedStyle(slider).getPropertyValue('--items-per-screen')
    );

    const numSlides = Math.ceil(numItems / itemsPerScreen);

    // prevent bugs from happening when resizing the window (for a smaller window there will be more tags which won't exist on a larger window)
    if (sliderIndex > numSlides - 1) {
      slider.style.setProperty('--slider-index', numSlides - 1);
      sliderIndex = numSlides - 1;
    }

    for (let i = 0; i < numSlides; i++) {
      const barItem = document.createElement('div');
      barItem.classList.add('bar-item');
      if (i === sliderIndex) {
        barItem.classList.add('active');
      }
      progressBar.append(barItem);
    }
  };

  function throttle(cb, delay = 1000) {
    let shouldWait = false;
    let waitingArgs;
    const timeoutFunc = () => {
      if (waitingArgs == null) {
        shouldWait = false;
      } else {
        cb(...waitingArgs);
        waitingArgs = null;
        setTimeout(timeoutFunc, delay);
      }
    };

    return (...args) => {
      if (shouldWait) {
        waitingArgs = args;
        return;
      }

      cb(...args);
      shouldWait = true;
      setTimeout(timeoutFunc, delay);
    };
  }

  const throttleProgressBar = throttle(() => {
    calculateProgressBar(progressBarRef.current);
  }, 250);

  useEffect(() => {
    // Initial calculation of progress bar
    calculateProgressBar(progressBarRef.current);

    // Recalculating progress bar items
    window.addEventListener('resize', throttleProgressBar);

    return () => {
      window.removeEventListener('resize', throttleProgressBar);
    };
  }, []);

  return (
    <div className='row'>
      <div className='slider-header'>
        {/* <h6 className='slider-title'>Próximos eventos</h6> */}
        <div className='progress-bar' ref={progressBarRef}>
          {/* <div className='bar-item active'></div>
          <div className='bar-item'></div>
          <div className='bar-item'></div> */}
        </div>
      </div>
      <div className='container'>
        <button className='handle prev-handle' onClick={onClickHandle}>
          <div className='text'>&lsaquo;</div>
        </button>
        <div className='slider'>
          <div className='slider-card'>
            <img src={news1} />
            <div className='slider-card_content'>
              <span>Cena Temática Internacional</span>
              <p>
                ¡Viaja con nosotros sin salir del restaurante! Este sábado,
                nuestro chef ejecutivo preparará un menú degustación inspirado
                en la gastronomía de Japón. Reserva tu mesa y vive una
                experiencia culinaria única.
              </p>
            </div>
          </div>
          <div className='slider-card'>
            <img src={news2} />
            <div className='slider-card_content'>
              <span>Cata de Vinos Exclusivos</span>
              <p>
                Este viernes, únete a nuestra cata de vinos con el sommelier
                Javier López, quien nos guiará a través de una selección de
                vinos raros y exquisitos. Plazas limitadas.
              </p>
            </div>
          </div>
          <div className='slider-card'>
            <img src={news3} />
            <div className='slider-card_content'>
              <span>Noche de Jazz en Vivo</span>
              <p>
                Disfruta de una velada inolvidable con música jazz en vivo este
                sábado por la noche. La banda 'Smooth Vibes' nos acompañará
                mientras degustas nuestros platos más sofisticados.
              </p>
            </div>
          </div>
          <div className='slider-card'>
            <img src={news4} />
            <div className='slider-card_content'>
              <span>Nuevo Menú de Temporada</span>
              <p>
                Nuestro chef ha diseñado un nuevo menú de temporada utilizando
                los ingredientes más frescos y exclusivos. Ven a probarlo y
                descubre nuevos sabores y texturas.
              </p>
            </div>
          </div>
          <div className='slider-card'>
            <img src={news5} />
            <div className='slider-card_content'>
              <span>Clase Magistral de Cocina</span>
              <p>
                El próximo miércoles, aprende a cocinar como un profesional con
                nuestra clase magistral de cocina impartida por el Chef
                Rodríguez. Inscripciones abiertas ahora.
              </p>
            </div>
          </div>
          <div className='slider-card'>
            <img src={news6} />
            <div className='slider-card_content'>
              <span>Aniversario del Restaurante</span>
              <p>
                Celebra con nosotros nuestro décimo aniversario este mes.
                Tendremos una semana de eventos especiales, menús conmemorativos
                y sorpresas para nuestros clientes más fieles.
              </p>
            </div>
          </div>
          <div className='slider-card'>
            <img src={news7} />
            <div className='slider-card_content'>
              <span>Brunch de Domingo con Burbujas</span>
              <p>
                Este domingo, disfruta de nuestro exclusivo brunch acompañado de
                una selección de champañas premium. Una manera perfecta de
                empezar el día con elegancia.
              </p>
            </div>
          </div>
          <div className='slider-card'>
            <img src={news8} />
            <div className='slider-card_content'>
              <span>Cena Maridaje con Cervezas Artesanales</span>
              <p>
                Nuestro chef se ha unido a la cervecería local 'Craft Brew' para
                crear un menú especial de maridaje con cervezas artesanales. Una
                experiencia gastronómica que no te puedes perder.
              </p>
            </div>
          </div>
          <div className='slider-card'>
            <img src={news9} />
            <div className='slider-card_content'>
              <span>Evento Benéfico Gourmet</span>
              <p>
                Únete a nosotros en una cena benéfica gourmet a favor de la
                fundación 'Alimentos para Todos'. Todo lo recaudado será
                destinado a proporcionar comidas a familias necesitadas.
              </p>
            </div>
          </div>
          <div className='slider-card'>
            <img src={news10} />
            <div className='slider-card_content'>
              <span>Noche de Trufas</span>
              <p>
                Este viernes, nuestro menú estará dedicado a las trufas. Cada
                plato será elaborado con trufas frescas y presentado por nuestro
                chef en un evento exclusivo.
              </p>
            </div>
          </div>
          <div className='slider-card'>
            <img src={news11} />
            <div className='slider-card_content'>
              <span>Taller de Postres</span>
              <p>
                Aprende los secretos detrás de nuestros postres más famosos en
                nuestro taller de postres. El Chef de pastelería te guiará paso
                a paso en la creación de dulces deliciosos.
              </p>
            </div>
          </div>
          <div className='slider-card'>
            <img src={news12} />
            <div className='slider-card_content'>
              <span>Visita del Chef Invitado</span>
              <p>
                "Estamos emocionados de recibir al reconocido Chef Luis
                Fernández, quien preparará un menú especial disponible solo por
                una noche. Una oportunidad única para degustar su aclamada
                cocina."
              </p>
            </div>
          </div>
        </div>
        <button className='handle next-handle' onClick={onClickHandle}>
          <div className='text'>&rsaquo;</div>
        </button>
      </div>
    </div>
  );
};

export default CarouselGroup;
