import {useSelector} from "react-redux";
import ProductList from "../../components/ProductList/ProductList";
import {selectFilter} from "../../redux/filter/selectors";
import {useParams} from "react-router-dom";

const BrandPage = () => {
	const {brands} = useParams();

	// const selectBrands = useSelector(selectFilter);
	// console.log(selectBrands);
	const param = {
		brand: brands,
	};

	return (
		<>
			<ProductList param={param}/>
		</>
	);
};

export default BrandPage;
