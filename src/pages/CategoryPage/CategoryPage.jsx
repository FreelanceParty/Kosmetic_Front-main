import React from "react";
import Category from "../../components/Category/Category";
import {useLocation} from "react-router-dom";
import Seo from "../../components/Seo/Seo";
import {routeHelper} from "../../utils/helpers/routeHelper";

const CategoryPage = () => {
	const location = useLocation();
	const {getCategoryByRoute} = routeHelper();
	const category = getCategoryByRoute(location.pathname);

	return (
		<div>
			<Seo
				title={category ? `${category} — корейська косметика` : "Каталог корейської косметики"}
				description={`${category ?? "Каталог корейської косметики"} в інтернет-магазині Beauty Blossom: оригінальні корейські бренди, опт і роздріб, швидка доставка по Україні.`}
			/>
			<Category/>
		</div>
	);
};

export default CategoryPage;
