import { useEffect } from 'react';
import { getDownloadURL, ref } from 'firebase/storage';

import { storage } from '../configs/firebase';
import Featured from '../components/Featured';
import Services from '../components/Services';
import SignatureDishes from '../components/SignatureDishes';
import Faq from '../components/Faq';
import Gallery from '../components/Gallery';
import Map from '../components/Map';
import '../styles/Home.css';

// TODO
// refactor this code into hook
// cache thing
// bug with signatures images

const Home = () => {
  useEffect(() => {
    const lazyImages = document.querySelectorAll('img[data-src]');

    // Adding blur filter to lazy images
    lazyImages.forEach(img => {
      img.classList.add('blurred-transition');
      img.classList.add('blurred');
    });

    const options = {
      root: null,
      threshold: 0,
      rootMargin: '100px',
    };

    const loadImage = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const imageRef = ref(storage, `static/${entry.target.dataset.src}`);
          // download the high res image
          getDownloadURL(imageRef)
            .then(url => {
              // change the src of the image
              entry.target.src = url;

              entry.target.addEventListener('load', () => {
                entry.target.classList.remove('blurred');
              });

              observer.unobserve(entry.target);
            })
            .catch(err => {
              console.error(err);
            });
        }
      });
    };

    const observer = new IntersectionObserver(loadImage, options);

    lazyImages.forEach(img => observer.observe(img));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <Featured />
      <Services />
      <SignatureDishes />
      <Faq />
      <Gallery />
      <Map />
    </>
  );
};

export default Home;
