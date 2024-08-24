import featured1Low from '../assets/featured-1-low.webp';
import featured2Low from '../assets/featured-2-low.webp';
import featuredProfilePic from '../assets/featured-profile-pic.webp';

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
          <img
            data-src='featured-1.webp'
            src={featured1Low}
            alt='Plato elegante de un restaurante'
          />
          <img
            data-src='featured-2.webp'
            src={featured2Low}
            alt='Plato elegante de un restaurante'
          />
        </div>
      </div>
    </div>
  );
};

export default Featured;
