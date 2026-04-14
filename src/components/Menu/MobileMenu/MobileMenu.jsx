import React, {useEffect, useMemo, useState} from "react";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";

import {routeHelper} from "../../../utils/helpers/routeHelper";
import {HEADER_MEGA_MENU} from "../../../utils/enums/headerMegaMenu";

// ==== Styled ====
const BurgerWrapper = styled.div`
  position: relative;
  z-index: 1000;
`;

const MobileMenuWrapper = styled.div`
	position:   fixed;
	inset:      0;
	left:       ${({isOpen}) => (isOpen ? "0" : "-100%")};
	width:      100%;
	height:     100vh;
	background: #FFFFFF;
	transition: left 0.3s ease;
	z-index:    999;
	overflow:   hidden;
`;

const MenuHeader = styled.div`
  height: 48px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e8e8e8;
  color: #64759b;
  font-size: 12px;
  font-weight: 600;
`;

const CloseBtn = styled.button`
  background: transparent;
  border: 0;
  padding: 8px;
  color: #000e55;
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
`;

const MenuBody = styled.div`
  height: calc(100vh - 48px);
  overflow-y: auto;
  padding-bottom: 56px;
`;

const MobileNav = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const RowButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 16px;
  background: transparent;
  border: 0;
  border-bottom: 1px solid #f2f2f2;
  cursor: pointer;
`;

const RowLink = styled.a`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 16px;
  color: #000e55;
  text-decoration: none;
  border-bottom: 1px solid #f2f2f2;
`;

const RowText = styled.span`
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: #000e55;
`;

const SubRowButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 16px;
  padding-left: 24px;
  background: transparent;
  border: 0;
  border-bottom: 1px solid #f7f7f7;
  cursor: pointer;
`;

const SubRowText = styled.span`
  font-weight: 600;
  font-size: 12px;
  color: #000e55;
`;

const LeafLink = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  padding-left: 32px;
  background: transparent;
  border: 0;
  border-bottom: 1px solid #fafafa;
  cursor: pointer;
  color: #64759b;
  font-size: 12px;
  font-weight: 500;
  text-align: left;
`;

const PlusMinus = styled.span`
  width: 16px;
  min-width: 16px;
  text-align: center;
  color: #000e55;
  font-size: 18px;
  font-weight: 400;
  line-height: 1;
`;

const MobileMenu = ({isOpen, setIsOpen}) => {
	const navigate = useNavigate();
	const {getCategoryRoute} = routeHelper();

	const [openedTop, setOpenedTop] = useState(null);
	const [openedSection, setOpenedSection] = useState(null);

	useEffect(() => {
		if (!isOpen) {
			setOpenedTop(null);
			setOpenedSection(null);
		}
	}, [isOpen]);

	const closeMenu = () => setIsOpen(false);

	const go = (to) => {
		closeMenu();
		navigate(to);
	};

	const topItems = useMemo(() => ([
		{
			key: "СПІВПРАЦЯ",
			type: "accordion",
			children: [
				{label: "ОСОБИСТІ ЗАМОВЛЕННЯ", to: "/cooperation"},
				{label: "ДЛЯ БІЗНЕСУ (ОПТ)", to: "/cooperation"},
				{label: "ДРОПШИПІНГ", to: "/cooperation"},
				{label: "КОНТАКТИ", to: "/cooperation"},
			],
		},
		{
			key: "ОБЛИЧЧЯ",
			type: "category",
			href: getCategoryRoute("догляд для обличчя"),
			menuKey: "ОБЛИЧЧЯ",
		},
		{
			key: "ВОЛОССЯ",
			type: "category",
			href: getCategoryRoute("догляд для волосся"),
			menuKey: "ВОЛОССЯ",
		},
		{
			key: "МАКІЯЖ",
			type: "category",
			href: getCategoryRoute("макіяж"),
			menuKey: "МАКІЯЖ",
		},
		{
			key: "ТІЛО",
			type: "category",
			href: getCategoryRoute("догляд для тіла"),
			menuKey: "ТІЛО",
		},
		{
			key: "НАБОРИ & ПОДАРУНКИ",
			type: "category",
			href: getCategoryRoute("набори"),
			menuKey: "НАБОРИ & ПОДАРУНКИ",
		},
		{key: "SALE", type: "link", href: "/"},
		{key: "БРЕНДИ", type: "link", href: "/brands"},
		{key: "ПРО НАС", type: "link", href: "/about-us"},
	]), [getCategoryRoute]);

	const openedCategoryMenu = openedTop && HEADER_MEGA_MENU[openedTop] ? HEADER_MEGA_MENU[openedTop] : null;
	const openedCategoryHref = topItems.find((i) => i.key === openedTop)?.href;

	return (
		<BurgerWrapper className="flex lg:hidden">
			<MobileMenuWrapper isOpen={isOpen}>
				<MenuHeader>
					<span>Меню</span>
					<CloseBtn type="button" onClick={closeMenu} aria-label="Close menu">
						×
					</CloseBtn>
				</MenuHeader>

				<MenuBody>
					<MobileNav>
						{topItems.map((item) => {
							const isOpenTop = openedTop === item.key;
							const canExpand = item.type === "accordion" || item.type === "category";

							if (!canExpand) {
								return (
									<li key={item.key}>
										<RowButton
											type="button"
											onClick={() => go(item.href)}
										>
											<RowText style={item.key === "SALE" ? {color: "#B90003"} : undefined}>{item.key}</RowText>
											<span />
										</RowButton>
									</li>
								);
							}

							return (
								<li key={item.key}>
									<RowButton
										type="button"
										onClick={() => {
											setOpenedSection(null);
											setOpenedTop(isOpenTop ? null : item.key);
										}}
									>
										<RowText>{item.key}</RowText>
										<PlusMinus>{isOpenTop ? "−" : "+"}</PlusMinus>
									</RowButton>

									{isOpenTop && item.type === "accordion" && (
										<ul style={{listStyle: "none", margin: 0, padding: 0}}>
											{item.children.map((ch) => (
												<li key={ch.label}>
													<LeafLink type="button" onClick={() => go(ch.to)}>
														{ch.label}
														<span />
													</LeafLink>
												</li>
											))}
										</ul>
									)}

									{isOpenTop && item.type === "category" && openedCategoryMenu && openedCategoryHref && (
										<ul style={{listStyle: "none", margin: 0, padding: 0}}>
											{openedCategoryMenu.columns
												.flatMap((c) => c.sections ?? [])
												.map((section) => {
													const isSectionOpen = openedSection === section.title;
													const hasItems = (section.items ?? []).length > 0;

													return (
														<li key={section.title}>
															<SubRowButton
																type="button"
																onClick={() => {
																if (!hasItems) {
																	go(`${openedCategoryHref}?category=${encodeURIComponent(section.title)}`);
																	return;
																}
																setOpenedSection(isSectionOpen ? null : section.title);
															}}
															>
																<SubRowText>{section.title}</SubRowText>
																{hasItems ? <PlusMinus>{isSectionOpen ? "−" : "+"}</PlusMinus> : <span />}
															</SubRowButton>

															{hasItems && isSectionOpen && (
																<ul style={{listStyle: "none", margin: 0, padding: 0}}>
																	{section.items.map((leaf) => (
																		<li key={leaf}>
																			<LeafLink
																				type="button"
																				onClick={() => go(`${openedCategoryHref}?subcategory=${encodeURIComponent(leaf)}`)}
																			>
																				{leaf}
																				<span />
																			</LeafLink>
																		</li>
																	))}
																</ul>
															)}
														</li>
													);
												})}
										</ul>
									)}
								</li>
							);
						})}
					</MobileNav>
				</MenuBody>
			</MobileMenuWrapper>
		</BurgerWrapper>
	);
};

export default MobileMenu;
