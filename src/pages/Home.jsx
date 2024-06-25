import Featured from '../components/Featured';
import Services from '../components/Services';
import SignatureDishes from '../components/SignatureDishes';
import Faq from '../components/Faq';
import News from '../components/News';
import Map from '../components/Map';
import '../styles/Home.css';

const Home = () => {
  return (
    <>
      <Featured />
      <Services />
      <SignatureDishes />
      <Faq />
      <News />
      <Map />
    </>
  );
};

export default Home;
