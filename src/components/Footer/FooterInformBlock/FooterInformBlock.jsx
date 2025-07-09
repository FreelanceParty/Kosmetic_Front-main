import {
	LinkStyled,
	LinkStyledSecond,
	List,
	Item,
	TitleWrap,
	Title,
	Wrap,
} from "./InformBlockStyled";

export const FooterInformBlock = () => {
	const isLogin = false;

	return (
		<Wrap>
			<TitleWrap>
				<Title>Клієнтам</Title>
			</TitleWrap>
			<List>
				<Item>
					<LinkStyledSecond href="/wholesaleProgram#return">
						Контактна інформація
					</LinkStyledSecond>
				</Item>
				{/* <Item>
          <LinkStyledSecond href="/wholesaleProgram#about">
          Про нас
          </LinkStyledSecond>
          </Item> */}
				{isLogin && (
					<ul>
						<Item>
							<LinkStyledSecond href="/cabinet/history">
								Історія замовлень
							</LinkStyledSecond>
						</Item>
						<Item>
							<LinkStyled to="/cabinet">Особистий кабінет</LinkStyled>
						</Item>
					</ul>
				)}
				<Item>
					<LinkStyledSecond href="feedback">Залишити відгук</LinkStyledSecond>
				</Item>
			</List>
		</Wrap>
	);
};
