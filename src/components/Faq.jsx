import useHandleGroupClick from '../hooks/useHandleGroupClick';

import FaqGroup from './FaqGroup';
import faqData from '../data/faqData';
import faq1Low from '../assets/faq-1-low.webp';
import faq2Low from '../assets/faq-2-low.webp';

const Faq = () => {
  const { activeGroupId, handleGroupClick } = useHandleGroupClick();

  const faqGroupEl = faqData.map(group => {
    return (
      <FaqGroup
        key={`faq-group-${group.id}`}
        title={group.title}
        body={group.body}
        id={group.id}
        activeGroupId={activeGroupId}
        handleGroupClick={handleGroupClick}
      />
    );
  });

  return (
    <div className='section section-faq'>
      <div className='faq-container'>
        <div className='faq-content'>
          <div>
            <h3>
              Prepárate para embarcarte en una aventura culinaria donde la
              tradición se cruza con la innovación
            </h3>
            <div className='faq-content__groups'>{faqGroupEl}</div>
          </div>
        </div>

        <div className='faq-images'>
          <img
            data-src='faq-2.webp'
            src={faq2Low}
            alt='Plato elegante de un restaurante'
          />
          <img
            data-src='faq-1.webp'
            src={faq1Low}
            alt='Plato elegante de un restaurante'
          />
        </div>
      </div>
    </div>
  );
};

export default Faq;
