import {Container, Message, StyleLink} from "./NotFoundPage.styled";

const NotFoundPage = () => {
	return (
		<Container>
			<Message>Сторінка відсутня</Message>
			<StyleLink to="/">Перейти на головну сторінку</StyleLink>
		</Container>
	);
};

export default NotFoundPage;
