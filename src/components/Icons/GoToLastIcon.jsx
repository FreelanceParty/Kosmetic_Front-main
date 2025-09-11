import {ReactComponent as Icon} from "../../assets/icons/go_to_last.svg";

export default function GoToLastIcon({classes, onClick}) {
	return (
		<Icon
			className={classes ?? ''}
			onClick={onClick}
		/>
	)
}