import {ModalClose, IconClose} from "./closeButton.styled";

export const CloseButton = ({close}) => {
	return (
		<ModalClose onClick={close}>
			<IconClose/>
		</ModalClose>
	);
};
