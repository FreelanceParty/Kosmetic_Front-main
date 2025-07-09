import ProductList from "../../components/ProductList/ProductList";

const DiscountPage = () => {
	const param = {
		sale: true,
	};

	return (
		<>
			<ProductList param={param}/>
		</>
	);
};

export default DiscountPage;
