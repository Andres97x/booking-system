import Featured from '../components/Featured';
import News from '../components/News';
import SignatureDishes from '../components/SignatureDishes';
import Faq from '../components/Faq';
import BehindScenes from '../components/BehindScenes';
import Contact from '../components/Contact';
import '../styles/Home.css';

const Home = () => {
  return (
    <>
      <Featured />
      <News />
      <SignatureDishes />
      <Faq />
      <BehindScenes />
      <Contact />
    </>
  );
};

export default Home;
