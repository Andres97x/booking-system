import gallery1 from '../assets/gallery-1.jpg';
import gallery2 from '../assets/gallery-2.jpg';
import gallery3 from '../assets/gallery-3.jpg';
import gallery4 from '../assets/gallery-4.jpg';
import gallery5 from '../assets/gallery-5.jpg';
import gallery6 from '../assets/gallery-6.jpg';
import gallery7 from '../assets/gallery-7.jpg';
import gallery8 from '../assets/gallery-8.jpg';
import gallery9 from '../assets/gallery-9.jpg';
import gallery10 from '../assets/gallery-10.jpg';
import gallery11 from '../assets/gallery-11.jpg';
import gallery12 from '../assets/gallery-12.jpg';

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
            <img src={gallery1} />
            <div className='slider-card_content'>
              <span>Cena Temática Internacional</span>
            </div>
          </div>
          <div className='slider-card'>
            <img src={gallery2} />
            <div className='slider-card_content'>
              <span>Cata de Vinos Exclusivos</span>
            </div>
          </div>
          <div className='slider-card'>
            <img src={gallery3} />
            <div className='slider-card_content'>
              <span>Noche de Jazz en Vivo</span>
            </div>
          </div>
          <div className='slider-card'>
            <img src={gallery4} />
            <div className='slider-card_content'>
              <span>Nuevo Menú de Temporada</span>
            </div>
          </div>
          <div className='slider-card'>
            <img src={gallery5} />
            <div className='slider-card_content'>
              <span>Clase Magistral de Cocina</span>
            </div>
          </div>
          <div className='slider-card'>
            <img src={gallery6} />
            <div className='slider-card_content'>
              <span>Aniversario del Restaurante</span>
            </div>
          </div>
          <div className='slider-card'>
            <img src={gallery7} />
            <div className='slider-card_content'>
              <span>Brunch de Domingo con Burbujas</span>
            </div>
          </div>
          <div className='slider-card'>
            <img src={gallery8} />
            <div className='slider-card_content'>
              <span>Cena Maridaje con Cervezas Artesanales</span>
            </div>
          </div>
          <div className='slider-card'>
            <img src={gallery9} />
            <div className='slider-card_content'>
              <span>Evento Benéfico Gourmet</span>
            </div>
          </div>
          <div className='slider-card'>
            <img src={gallery10} />
            <div className='slider-card_content'>
              <span>Noche de Trufas</span>
            </div>
          </div>
          <div className='slider-card'>
            <img src={gallery11} />
            <div className='slider-card_content'>
              <span>Taller de Postres</span>
            </div>
          </div>
          <div className='slider-card'>
            <img src={gallery12} />
            <div className='slider-card_content'>
              <span>Visita del Chef Invitado</span>
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
