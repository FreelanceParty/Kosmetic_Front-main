import {ModalClose, IconClose} from "./CloseButtonStyled";

export const CloseButton = ({close}) => {
	return (
		<ModalClose onClick={close}>
			<IconClose/>
		</ModalClose>
	);
};
