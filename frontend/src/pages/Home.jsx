import Footer from "../components/layout/Footer";
import Testimonials from "../components/home/Testimonials";
import Stats from "../components/home/Stats";
import Features from "../components/home/Features";
import Navbar from "../components/Navbar";
import Hero from "../components/home/Hero";

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