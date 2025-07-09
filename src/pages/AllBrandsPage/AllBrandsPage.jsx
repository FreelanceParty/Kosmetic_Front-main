import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import {fetchBrands} from "../../redux/brands/operation";
import {
	BrandCard,
	BrandItem,
	BrandName,
	BrandPageContainer,
	Container,
	Title,
} from "./allBrandsPage.styled";
import {selectedBrand} from "../../redux/brands/selectors";
import {selectFilter} from "../../redux/filter/selectors";
import {setFilter} from "../../redux/filter/slice";

const AllBrandsPage = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchBrands());
	}, [dispatch]);

	const brands = useSelector(selectedBrand);

	const handleClick = (name) => {
		dispatch(setFilter(name));
	};
	return (
		<>
			<Container>
				<BrandPageContainer>
					{brands.items.map((item) => (
						<BrandItem>
							<Title>{item.letter}</Title>
							<BrandCard>
								{item.brandsName.map((name) => (
									<li key={name}>
										<BrandName
											to={`/brands/${name.toLowerCase().trim()}`}
											onClick={() => handleClick(name)}
										>
											{name}
										</BrandName>
									</li>
								))}
							</BrandCard>
						</BrandItem>
					))}
				</BrandPageContainer>
			</Container>
		</>
	);
};

export default AllBrandsPage;
