import React, { useContext } from "react";
import Layout from "../../Components/Layout";
import { GlobalContext } from "../../Context/data/globalContext";
import HeroSection from "../../Components/HeroSection";
import Filter from "../../Components/Fiter";
import ProductCard from "../../Components/ProductCard";
import Track from "../../Components/Track";
import Testimonial from "../../Components/Testimonial";

const Home = () => {
  const { name } = useContext(GlobalContext);
  console.log(name);
  return (
    <Layout>
      <HeroSection />
      <Filter />
      <ProductCard />
      <Track/>
      <Testimonial/>
    </Layout>
  );
};

export default Home;
