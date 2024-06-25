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
    window.addEventListener('resize', () => {
      throttleProgressBar();
    });
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
          <img src={news1} />
          <img src={news2} />
          <img src={news3} />
          <img src={news4} />
          <img src={news5} />
          <img src={news6} />
          <img src={news7} />
          <img src={news8} />
          <img src={news9} />
          <img src={news10} />
          <img src={news11} />
          <img src={news12} />
        </div>
        <button className='handle next-handle' onClick={onClickHandle}>
          <div className='text'>&rsaquo;</div>
        </button>
      </div>
    </div>
  );
};

export default CarouselGroup;
