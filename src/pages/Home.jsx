import Featured from '../components/Featured';
import Services from '../components/Services';
import SignatureDishes from '../components/SignatureDishes';
import Faq from '../components/Faq';
import Gallery from '../components/Gallery';
import Map from '../components/Map';
import '../styles/Home.css';

const Home = () => {
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
