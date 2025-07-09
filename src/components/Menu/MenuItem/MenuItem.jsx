import React, {useEffect, useState} from "react";

import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchBrands} from "../../../redux/brands/operation";
import {selectedBrand} from "../../../redux/brands/selectors";
import {setFilter} from "../../../redux/filter/slice";

import {
	BrandLetter,
	ContactLink,
	DownIcon,
	Item,
	ItemBrands,
	LinkBrand,
	LinkStyle,
	ListBrand,
	MenuBrandList,
	RightIcon,
} from "./MenuItem.styled";
import MultiLevelMenu from "../MultiLevelMenu/MultiLevelMenu";

const MenuItem = ({item}) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [expanded, setExpanded] = useState(false);

	// useEffect(() => {
	//   dispatch(fetchBrands());
	// }, [dispatch]);

	const brands = useSelector(selectedBrand);

	const handleClickBrand = (e) => {
		const name = e.target.innerText;
		console.log(name);
		dispatch(setFilter(name.toLowerCase().trim()));
	};

	const handleMouseEnter = () => {
		setExpanded(true);
	};

	const handleMouseLeave = () => {
		setExpanded(false);
	};

	const handleClickCategory = () => {
		navigate("/");
		setTimeout(() => {
			const categoryElement = document.getElementById("category");
			if (categoryElement) {
				categoryElement.scrollIntoView({behavior: "smooth", block: "start"});
			}
		}, 10);
	};

	return (
		<Item onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
			{item.href || item.to ? (
				item.href ? (
					item.href === "#category" ? (
						<ContactLink href={item.href} onClick={handleClickCategory}>
							{item.text}
							{expanded ? <DownIcon/> : <RightIcon/>}
							<MultiLevelMenu/>
						</ContactLink>
					) : (
						<ContactLink href={item.href}>{item.text}</ContactLink>
					)
				) : item.to === "/brands" ? (
					<>
						<LinkStyle to={item.to}>
							{item.text}
							{expanded ? <DownIcon/> : <RightIcon/>}
						</LinkStyle>
						{expanded && brands.items && brands.items.length > 0 && (
							<MenuBrandList>
								{brands.items.map(({letter, brandsName}) => (
									<ItemBrands key={letter}>
										<BrandLetter>{letter}</BrandLetter>
										<ListBrand>
											{brandsName.map((name) => (
												<li key={name}>
													<LinkBrand
														to={`/brands/${name}`}
														onClick={handleClickBrand}
													>
														{name}
													</LinkBrand>
												</li>
											))}
										</ListBrand>
									</ItemBrands>
								))}
							</MenuBrandList>
						)}
					</>
				) : (
					<LinkStyle to={item.to}>{item.text}</LinkStyle>
				)
			) : null}
		</Item>
	);
};

export default MenuItem;
