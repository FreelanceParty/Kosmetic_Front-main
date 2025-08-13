import {useState} from "react";

export function usePopup() {
	const [isOpen, setIsOpen] = useState(false);
	const [content, setContent] = useState(null);

	const openPopup = (popupContent) => {
		setContent(popupContent);
		setIsOpen(true);
	};

	const closePopup = () => {
		setIsOpen(false);
		setContent(null);
	};

	return {isOpen, content, openPopup, closePopup};
}
