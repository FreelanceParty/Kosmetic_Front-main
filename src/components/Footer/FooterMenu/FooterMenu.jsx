import {
	CategoryLink,
	Item,
	LinkStyled,
	List,
	ListWrap,
	Title,
	TitleWrap,
	Wrap,
} from "./footerMenu.styled";

const menuData = [
	{
		href:       "#category",
		text:       "категорії",
		mobileText: "категорії",
	},
	{
		to:         "/brands",
		text:       "бренди",
		mobileText: "бренди",
	},
	{
		to:         "/wholesaleProgram",
		text:       "клієнтам",
		mobileText: "оптова програма",
	},
];

const FooterMenu = () => {
	const scrollToTop = () => {
		window.scrollTo({
			top:      0,
			behavior: "smooth",
		});
	};

	const elementMenu = menuData.map((item) => (
		<Item key={item.text}>
			{item.href ? (
				<CategoryLink href={item.href}>{item.text}</CategoryLink>
			) : (
				<LinkStyled to={item.to} onClick={scrollToTop}>
					{item.text}
				</LinkStyled>
			)}
		</Item>
	));
	return (
		<Wrap>
			<TitleWrap>
				<Title>Iнформація</Title>
			</TitleWrap>
			<ListWrap>
				<List>{elementMenu}</List>
			</ListWrap>
		</Wrap>
	);
};

export default FooterMenu;
