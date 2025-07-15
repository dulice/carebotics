import About from "@/components/About";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import React from "react";

const Home = () => {
  return (
    <section>
      <Hero />
      <Services />
      <About />
      <Footer />
    </section>
  );
};

export default Home;
