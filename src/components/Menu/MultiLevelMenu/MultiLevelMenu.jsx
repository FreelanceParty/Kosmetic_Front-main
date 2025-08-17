import React, {useState} from "react";
import styled from "styled-components";
import {NavLink, useNavigate} from "react-router-dom";

import {useSelector, useDispatch} from "react-redux";
import {selectedBrand} from "../../../redux/brands/selectors";

import {setFilter} from "../../../redux/filter/slice";

import {transliterate} from "../../transliterate";
import menuData from "../menuItems.json";
import {
	BrandLetter,
	DownIcon,
	Item,
	ItemBrands,
	LinkBrand,
	LinkStyle,
	ListBrand,
	MenuBrandList,
	RightIcon,
} from "../MenuItem/MenuItem.styled";

// === Стили ===
const MenuContainer = styled.ul`
	display:    flex;
	gap:        20px;
	list-style: none;
	padding:    0;
	margin:     0;
`;

const MenuItem = styled.li`
	position: relative;
	
	&:hover > ul,
	&:hover > div {
		display: block;
	}
`;

export const MenuLink = styled(NavLink)`
	text-decoration: none;
	font-weight:     400;
	font-size:       16px;
	line-height:     1.02312;
	text-transform:  lowercase;
	/* text-align: center; */
	color:           #616161;
	padding:         12px;
	display:         flex;
	align-items:     center;
	justify-content: space-between;
	/* align-items: center; */
	gap:             3px;
	transition:      all 250ms linear;
	
	&.active {
		color: #FF63B8;
	}
	
	&:hover,
	&:focus {
		color: #FF63B8;
	}
	
	@media screen and (min-width: 1024px) {
		font-size: 18px;
	}
	@media screen and (min-width: 1440px) {
		font-size: 22px;
	}
`;

const SubMenu = styled.ul`
	display:          none;
	position:         absolute;
	top:              ${({level}) => (level === 1 ? "100%" : "0")};
	left:             ${({level}) => (level === 1 ? "0" : "100%")};
	background-color: #FFFFFF;
	border-radius:    8px;
	box-shadow:       0 4px 8px rgba(0, 0, 0, 0.1);
	padding:          10px 0;
	min-width:        200px;
	list-style:       none;
	z-index:          100;
`;

const Wrapper = styled.div`
	position: relative;
`;

// === Якірний скрол ===
const handleAnchorScroll = (anchorId) => {
	const target = document.querySelector(anchorId);
	if (target) {
		target.scrollIntoView({behavior: "smooth"});
	}
};

// === Рекурсивне меню ===
const RecursiveMenu = ({items, level = 1, parentPath = ""}) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [expandedItem, setExpandedItem] = useState(null);

	const brands = useSelector(selectedBrand);
	// console.log("brands", brands);
	const handleClickBrand = (e) => {
		const name = e.target.innerText;
		dispatch(setFilter(name.toLowerCase().trim()));
	};
	const handleClickCategory = () => {
		navigate("/");
		setTimeout(() => {
			handleAnchorScroll("#category");
		}, 700);
	};
	const handleMouseEnter = (id) => {
		setExpandedItem(id);
	};

	const handleMouseLeave = () => {
		setExpandedItem(null);
	};

	return items.map((item, index) => {
		const hasChildren = item.children?.length > 0;
		const currentPath = `${parentPath}/${transliterate(item.text)}`;

		if (item.to === "/brands") {
			return (
				<Item
					onMouseEnter={() => handleMouseEnter("brands")}
					onMouseLeave={handleMouseLeave}
				>
					<LinkStyle to={item.to}>
						{item.text}
						{expandedItem === "brands" ? <DownIcon/> : <RightIcon/>}
					</LinkStyle>
					{expandedItem === "brands" && brands.items?.length > 0 && (
						<MenuBrandList>
							{brands.items.map(({letter, brandsName}) => (
								<ItemBrands key={letter}>
									<BrandLetter>{letter}</BrandLetter>
									<ListBrand>
										{brandsName.map((name) => (
											<li key={name}>
												<LinkBrand
													to={`/brands/${name.toLowerCase()}`}
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
				</Item>
			);
		}
		if (item.to === "#category") {
			return (
				<MenuItem
					key={index}
					onMouseEnter={() => handleMouseEnter(`${item.text}`)}
					onMouseLeave={handleMouseLeave}
				>
					<MenuLink as="a" href="#category" onClick={handleClickCategory}>
						{item.text}

						{expandedItem === `${item.text}` ? <DownIcon/> : <RightIcon/>}
					</MenuLink>

					{hasChildren && (
						<SubMenu
							level={level}
							onMouseEnter={() => handleMouseEnter(`${item.text}`)}
							onMouseLeave={handleMouseLeave}
						>
							<RecursiveMenu
								items={item.children}
								level={level + 1}
								parentPath={currentPath}
							/>
						</SubMenu>
					)}
				</MenuItem>
			);
		}

		if (item.to === "#contacts") {
			return (
				<MenuItem key={index}>
					<MenuLink
						as="a"
						onClick={() => handleAnchorScroll("#contacts")}
						href="#contacts"
					>
						{item.text}
					</MenuLink>

					{hasChildren && (
						<SubMenu level={level}>
							<RecursiveMenu
								items={item.children}
								level={level + 1}
								parentPath={currentPath}
							/>
						</SubMenu>
					)}
				</MenuItem>
			);
		}

		return (
			<MenuItem key={index}>
				<MenuLink to={`${currentPath}`}>
					{item.text}
					{hasChildren && (level === 1 ? <DownIcon/> : <RightIcon/>)}
				</MenuLink>

				{hasChildren && (
					<SubMenu level={level}>
						<RecursiveMenu
							items={item.children}
							level={level + 1}
							parentPath={currentPath}
						/>
					</SubMenu>
				)}
			</MenuItem>
		);
	});
};

const MultiLevelMenu = () => (
	<MenuContainer>
		<RecursiveMenu items={menuData}/>
	</MenuContainer>
);

export default MultiLevelMenu;
