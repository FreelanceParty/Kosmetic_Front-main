import ProductList from "../../components/ProductList/ProductList";

const NewPage = () => {
	const param = {
		newness: true,
	};

	return (
		<>
			<ProductList param={param}/>
		</>
	);
};

export default NewPage;
