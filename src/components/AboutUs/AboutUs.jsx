import Benefits from "./Benefits";
import {CloseButton} from "../CloseButton/CloseButton";
import Register from "../Register/Register";

import {
	AboutUsContainer,
	LinkToSaleProgram,
	ModalBackground,
	ModalContent,
	OpenOptRegisterWindow,
	SubTitle,
	SubTitleBold,
	SubTitleSpan,
	Text,
	Title,
} from "./aboutUs.styled";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";

const AboutUs = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	// open modal
	useEffect(() => {
		if (isModalOpen) {
			document.body.classList.add("modal-open");
		} else {
			document.body.classList.remove("modal-open");
		}

		return () => {
			document.body.classList.remove("modal-open");
		};
	}, [isModalOpen]);
	const openModal = () => {
		setIsModalOpen(true);
	};
	const handelDropClose = (e) => {
		if (e.target.tagName === "SECTION") {
			setIsModalOpen(false);
		}
	};

	const onRegisterSuccess = () => {
		toast.info("Ви успішно зареєструвалися як оптовий клієнт, авторизуйтеся");
	};
	return (
		<AboutUsContainer>
			<Title>інформація для оптових покупців</Title>
			<Text>
				{" "}
				маєте свій власний магазин косметики / салон краси чи лише плануєте
				відкривати?
			</Text>
			<SubTitle>
				<SubTitleSpan> BEAUTY BLOSSOM </SubTitleSpan> – ТВІЙ НАЙКРАЩИЙ
				ПОСТАЧАЛЬНИК УЛЮБЛЕНОЇ КОРЕЙСЬКОЇ КОСМЕТИКИ
			</SubTitle>
			<Text>Наша ціль – зробити вас щасливими!</Text>
			<Text>
				Щодня ми працюємо для вас і для вашої краси, надаючи широкий асортимент
				<br/>
				популярних корейських брендів:
			</Text>
			<SubTitleBold>
				Medi-Peel, Laneige, Masil, Beauty Of Joseon, Daeng Gi Meo Ri та ін.
			</SubTitleBold>
			<Benefits/>

			<LinkToSaleProgram href="https://beautyblossom.com.ua/wholesaleProgram">
				дізнатися більше про умови для оптових покупців
			</LinkToSaleProgram>
			<OpenOptRegisterWindow onClick={openModal}>
				реєстрація оптового покупця
			</OpenOptRegisterWindow>

			{isModalOpen && (
				<ModalBackground onClick={handelDropClose}>
					<ModalContent>
						<CloseButton close={() => setIsModalOpen(false)}/>
						<Register onRegisterSuccess={onRegisterSuccess} opt/>
					</ModalContent>
				</ModalBackground>
			)}
		</AboutUsContainer>
	);
};

export default AboutUs;
