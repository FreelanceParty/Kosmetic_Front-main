import React from "react";
import Category from "../../components/Category/Category";
import {useLocation} from "react-router-dom";
import ProductsTag from "../../components/ProductTag/ProductTag";
const CategoryPage = () => {
	// const dispatch = useDispatch();
	// const navigate = useNavigate();
	const location = useLocation();

	const categorySegments = decodeURIComponent(location.pathname)
		.split("/")
		.filter(Boolean); // фільтрує порожні рядки

	return (
		<div>
			<Category/>
		</div>
	);
};

export default CategoryPage;
