import {ReactComponent as Icon} from "../../assets/icons/close_cross.svg";

export default function CloseCrossIcon({classes, onClick}) {
	return (
		<Icon
			className={classes ?? ''}
			onClick={onClick}
		/>
	)
}