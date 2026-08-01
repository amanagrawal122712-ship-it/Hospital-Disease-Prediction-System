import Footer from "../components/Layout/Footer";
import Testimonials from "../components/Home/Testimonials";
import Stats from "../components/Home/Stats";
import Features from "../components/Home/Features";
import Navbar from "../components/Layout/Navbar";
import Hero from "../components/Home/Hero";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Stats />
      <Testimonials />
      <Footer />
    </>
  );
}

export default Home;