import {
  AiOutlineWhatsApp,
  AiOutlineLinkedin,
  AiOutlineInstagram,
} from 'react-icons/ai';

const Footer = () => {
  return (
    <div className='footer' id='contact'>
      <div className='footer-container'>
        <div className='socials-col'>
          <button
            className='footer-logo'
            onClick={() => {
              window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth',
              });
            }}
          >
            Éclat Étoilé
          </button>
          <div className='social-icons'>
            <a href='http://wa.me/+573005259214' target='blank'>
              <AiOutlineWhatsApp className='social-icon' />
            </a>
            <a href='https://www.linkedin.com/in/andresguerra1/' target='blank'>
              <AiOutlineLinkedin className='social-icon' />
            </a>
            <a href='https://www.instagram.com/andresguerra.97/' target='blank'>
              <AiOutlineInstagram className='social-icon' />
            </a>
          </div>

          <div className='copy'>
            website designed by{' '}
            <a href='https://www.instagram.com/andresguerra.97/' target='blank'>
              Andrés Guerra
            </a>
            . All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
