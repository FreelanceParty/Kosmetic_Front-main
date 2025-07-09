import React, {useMemo} from "react";
import {useSelector} from "react-redux";
import {selectFilter} from "../../redux/filter/selectors";

import ProductList from "../ProductList/ProductList";

const Category = () => {
	const selectCategory = useSelector(selectFilter);

	const param = useMemo(
		() => ({
			category: selectCategory,
		}),
		[selectCategory]
	);

	return (
		<>
			<ProductList param={param}/>
		</>
	);
};

export default Category;
