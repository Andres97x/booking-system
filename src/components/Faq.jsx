import useHandleGroupClick from '../hooks/useHandleGroupClick';

import FaqGroup from './FaqGroup';
import faqData from '../data/faqData';
import faq1 from '../assets/faq-1.webp';
import faq2 from '../assets/faq-2.webp';

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
          <img src={faq2} alt='Plato elegante de un restaurante' />
          <img src={faq1} alt='Plato elegante de un restaurante' />
        </div>
      </div>
    </div>
  );
};

export default Faq;
