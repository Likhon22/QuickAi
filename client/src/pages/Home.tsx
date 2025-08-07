import AiTools from "../components/AiTools";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Plan from "../components/Plan";
import Testimonials from "../components/Testimonials";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <AiTools />
      <Testimonials />
      <Plan />
    </div>
  );
};

export default Home;
