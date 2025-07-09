import React from "react";
import Slider from "../../components/Slider/Slider.jsx";
import Hero from "../../components/Hero/HeroTrimay/Hero.jsx";
import CategoryList from "../../components/CategoryList/CategoryList.jsx";
import AboutUs from "../../components/AboutUs/AboutUs.jsx";
import SliderList from "../../components/SwiperSlider/SliderList/SliderList.jsx";
import ProductSlider from "../../components/ProductSlider/ProductSlider.jsx";
import Cooperation from "../../components/Cooperation/Cooperation.jsx";
import Reviews from "../../components/Reviews/Reviews.jsx";

const HomePage = () => {
	return (
		<div>
			<Hero/>
			<ProductSlider sale/>
			<ProductSlider newness/>

			{/* <SliderList title="товари зі зниженною ціною" sale />
      <SliderList title="нове постачання" newness /> */}
			{/* <Slider title="товари зі зниженною ціною" sale /> */}
			{/* <Slider title="нове постачання" newness /> */}
			<div id="category">
				<CategoryList/>
			</div>
			<Cooperation/>
			<Reviews/>
			{/* <AboutUs /> */}
		</div>
	);
};

export default HomePage;
