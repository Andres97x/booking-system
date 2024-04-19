import Featured from '../components/Featured';
import HomeNews from '../components/HomeNews';
import Menu from '../components/Menu';
import Faq from '../components/Faq';
import BehindScenes from '../components/BehindScenes';
import Contact from '../components/Contact';
import '../styles/Home.css';

const Home = () => {
  return (
    <>
      <Featured />
      <HomeNews />
      <Menu />
      <Faq />
      <BehindScenes />
      <Contact />
    </>
  );
};

export default Home;
