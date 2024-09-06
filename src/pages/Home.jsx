import useLazyLoadImages from '../hooks/useLazyLoadImages';
import Featured from '../components/home/Featured';
import Services from '../components/home/Services';
import SignatureDishes from '../components/home/SignatureDishes';
import Faq from '../components/home/Faq';
import Gallery from '../components/home/Gallery';
import Map from '../components/home/Map';

const Home = () => {
  useLazyLoadImages();

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
