import Footer from "../components/Layout/Footer";
import Hero from "../components/Home/Hero";
import Features from "../components/Home/Features";
import Stats from "../components/Home/Stats";
import Testimonials from "../components/Home/Testimonials";
import Navbar from "../components/Navbar";

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