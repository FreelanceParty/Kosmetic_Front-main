import React, {useEffect, useMemo, useState} from "react";
import {useNavigate} from "react-router-dom";

import {routeHelper} from "../../../utils/helpers/routeHelper";
import {HEADER_MEGA_MENU} from "../../../utils/enums/headerMegaMenu";

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
			key:      "СПІВПРАЦЯ",
			type:     "accordion",
			children: [
				{label: "ОСОБИСТІ ЗАМОВЛЕННЯ", to: "/cooperation"},
				{label: "ДЛЯ БІЗНЕСУ (ОПТ)", to: "/cooperation?section=business"},
				{label: "ДРОПШИПІНГ", to: "/cooperation?section=dropshipping"},
				{label: "КОНТАКТИ", to: "/cooperation?section=contacts"},
			],
		},
		{
			key:     "ОБЛИЧЧЯ",
			type:    "category",
			href:    getCategoryRoute("догляд для обличчя"),
			menuKey: "ОБЛИЧЧЯ",
		},
		{
			key:     "ВОЛОССЯ",
			type:    "category",
			href:    getCategoryRoute("догляд для волосся"),
			menuKey: "ВОЛОССЯ",
		},
		{
			key:     "МАКІЯЖ",
			type:    "category",
			href:    getCategoryRoute("макіяж"),
			menuKey: "МАКІЯЖ",
		},
		{
			key:     "ТІЛО",
			type:    "category",
			href:    getCategoryRoute("догляд для тіла"),
			menuKey: "ТІЛО",
		},
		{
			key:     "НАБОРИ & ПОДАРУНКИ",
			type:    "category",
			href:    getCategoryRoute("набори"),
			menuKey: "НАБОРИ & ПОДАРУНКИ",
		},
		{key: "SALE", type: "link", href: "/search?marker=sale&page=1&query=", styles: 'text-[#B90003]'},
		{key: "NEW", type: "link", href: "/search?marker=new&page=1&query=", styles: 'text-green-600'},
		{key: "БРЕНДИ", type: "link", href: "/brands"},
		{key: "ПРО НАС", type: "link", href: "/about-us"},
	]), [getCategoryRoute]);

	const openedCategoryMenu = openedTop && HEADER_MEGA_MENU[openedTop] ? HEADER_MEGA_MENU[openedTop] : null;
	const openedCategoryHref = topItems.find((i) => i.key === openedTop)?.href;

	return (
		<div className="relative z-[1000] flex lg:hidden">
			<div
				className={
					"fixed inset-0 h-screen w-full overflow-hidden bg-white z-[999] transition-transform duration-300 ease-in-out " +
					(isOpen ? "translate-x-0" : "-translate-x-full")
				}
			>
				<div className="flex h-12 items-center justify-between border-b border-[#e8e8e8] px-4 text-[12px] font-semibold text-[#64759b]">
					<span>Меню</span>
					<button
						type="button"
						onClick={closeMenu}
						aria-label="Close menu"
						className="cursor-pointer bg-transparent p-2 text-[20px] leading-none text-[#000e55]"
					>
						×
					</button>
				</div>

				<div className="h-[calc(100vh-48px)] overflow-y-auto pb-14">
					<ul className="list-none m-0 p-0">
						{topItems.map((item) => {
							const isOpenTop = openedTop === item.key;
							const canExpand = item.type === "accordion" || item.type === "category";

							if (!canExpand) {
								return (
									<li key={item.key}>
										<button
											type="button"
											onClick={() => go(item.href)}
											className="flex w-full cursor-pointer items-center justify-between gap-3 border-b border-[#f2f2f2] bg-transparent px-4 py-[14px]"
										>
											<span
												className={
													`text-[12px] font-bold uppercase tracking-[0.02em] text-[#000e55] ${item.styles ?? ''}`
												}
											>
												{item.key}
											</span>
											<span/>
										</button>
									</li>
								);
							}

							return (
								<li key={item.key}>
									<button
										type="button"
										onClick={() => {
											setOpenedSection(null);
											setOpenedTop(isOpenTop ? null : item.key);
										}}
										className="flex w-full cursor-pointer items-center justify-between gap-3 border-b border-[#f2f2f2] bg-transparent px-4 py-[14px]"
									>
										<span className="text-[12px] font-bold uppercase tracking-[0.02em] text-[#000e55]">
											{item.key}
										</span>
										<span className="min-w-4 w-4 text-center text-[18px] font-normal leading-none text-[#000e55]">
											{isOpenTop ? "−" : "+"}
										</span>
									</button>

									{isOpenTop && item.type === "accordion" && (
										<ul className="list-none m-0 p-0">
											{item.children.map((ch) => (
												<li key={ch.label}>
													<button
														type="button"
														onClick={() => go(ch.to)}
														className="flex w-full cursor-pointer items-center justify-between border-b border-[#fafafa] bg-transparent px-4 py-[10px] pl-8 text-left text-[12px] font-medium text-[#64759b]"
													>
														{ch.label}
														<span/>
													</button>
												</li>
											))}
										</ul>
									)}

									{isOpenTop && item.type === "category" && openedCategoryMenu && openedCategoryHref && (
										<ul className="list-none m-0 p-0">
											{openedCategoryMenu.columns
												.flatMap((c) => c.sections ?? [])
												.map((section) => {
													const isSectionOpen = openedSection === section.title;
													const hasItems = (section.items ?? []).length > 0;

													return (
														<li key={section.title}>
															<button
																type="button"
																onClick={() => {
																	if (!hasItems) {
																		go(`${openedCategoryHref}?category=${encodeURIComponent(section.title)}`);
																		return;
																	}
																	setOpenedSection(isSectionOpen ? null : section.title);
																}}
																className="flex w-full cursor-pointer items-center justify-between gap-3 border-b border-[#f7f7f7] bg-transparent px-4 py-3 pl-6"
															>
																<span className="text-[12px] font-semibold text-[#000e55]">{section.title}</span>
																{hasItems ? (
																	<span className="min-w-4 w-4 text-center text-[18px] font-normal leading-none text-[#000e55]">
																		{isSectionOpen ? "−" : "+"}
																	</span>
																) : (
																	<span/>
																)}
															</button>

															{hasItems && isSectionOpen && (
																<ul className="list-none m-0 p-0">
																	{section.items.map((leaf) => (
																		<li key={leaf}>
																			<button
																				type="button"
																				onClick={() => go(`${openedCategoryHref}?subcategory=${encodeURIComponent(leaf)}`)}
																				className="flex w-full cursor-pointer items-center justify-between border-b border-[#fafafa] bg-transparent px-4 py-[10px] pl-8 text-left text-[12px] font-medium text-[#64759b]"
																			>
																				{leaf}
																				<span/>
																			</button>
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
					</ul>
				</div>
			</div>
		</div>
	);
};

export default MobileMenu;
