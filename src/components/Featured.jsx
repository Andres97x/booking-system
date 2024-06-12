import featured1 from '../assets/featured-1.jpg';
import featured2 from '../assets/featured-2.jpg';
import featuredProfilePic from '../assets/featured-profile-pic.jpg';

const Featured = () => {
  return (
    <div className='section section-featured'>
      <div className='featured-container'>
        <div className='featured-content'>
          <div>
            <h3>
              Nuestros chefs galardonados transforman ingredientes frescos en
              obras maestras culinarias, ofreciendo una experiencia gastronómica
              de primer nivel que deleita todos los sentidos.
            </h3>
            <div className='featured-content__quote'>
              <img
                src={featuredProfilePic}
                alt='foto de perfil del chef lider'
              />
              <blockquote>
                <p>
                  Nuestros chefs, maestros en su arte, fusionan creatividad y
                  precisión para ofrecer una experiencia culinaria inigualable,
                  elevando cada plato a una obra de arte gastronómica.
                </p>
                <cite> John Doe</cite>
              </blockquote>
            </div>
          </div>
        </div>
        <div className='featured-images'>
          <img src={featured1} alt='Plato elegante de un restaurante' />
          <img src={featured2} alt='Plato elegante de un restaurante' />
        </div>
      </div>
    </div>
  );
};

export default Featured;
