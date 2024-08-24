import { signatures } from '../data/signaturesData';

const SignatureDishes = () => {
  const signatureCardsEl = signatures.map((signature, i) => {
    return (
      <div key={`signature-${i}`} className='signature-card'>
        <div className='signature-img__container'>
          <img
            data-src={signature.dataImg}
            src={signature.img}
            alt={signature.imgAlt}
          />
        </div>
        <div className='signature-card__content'>
          <span>{signature.name}</span>
          <p>{signature.description}</p>
        </div>
      </div>
    );
  });

  return (
    <div className='section section-signatures'>
      <div className='signatures-container'>
        <div>
          <h5>Prepárese para ser encantado por </h5>
          <h2>Nuestros platos exclusivos.</h2>
        </div>
        <div className='signatures-grid'>{signatureCardsEl}</div>
      </div>
    </div>
  );
};

export default SignatureDishes;
