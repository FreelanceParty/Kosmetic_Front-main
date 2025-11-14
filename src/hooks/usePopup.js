import {useState} from "react";

export function usePopup() {
	const [isOpen, setIsOpen] = useState(false);
	const [content, setContent] = useState(null);
	const [headerText, setHeaderText] = useState(null);

	const openPopup = (popupContent) => {
		setContent(popupContent);
		setHeaderText(headerText);
		setIsOpen(true);
	};

	const closePopup = () => {
		setIsOpen(false);
		setContent(null);
		setHeaderText(null);
	};

	return {isOpen, headerText, content, openPopup, closePopup};
}
