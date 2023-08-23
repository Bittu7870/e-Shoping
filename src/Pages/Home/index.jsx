
import Layout from "../../Components/Layout";
import HeroSection from "../../Components/HeroSection";
import Filter from "../../Components/Fiter";
import ProductCard from "../../Components/ProductCard";
import Track from "../../Components/Track";
import Testimonial from "../../Components/Testimonial";
// import { useDispatch, useSelector } from "react-redux";
// import { addToCart, deleteFromCart } from "../../Redux/CartSlice";

const Home = () => {
  // const dispatch = useDispatch()
  // const cartItem = useSelector((state) => state.cart)
  // console.log(cartItem);
  
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
