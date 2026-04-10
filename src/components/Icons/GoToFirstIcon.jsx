import {ReactComponent as Icon} from "../../assets/icons/go_to_first.svg";

export default function GoToFirstIcon({classes, onClick}) {
	return (
		<Icon
			className={classes ?? ''}
			onClick={onClick}
		/>
	)
}