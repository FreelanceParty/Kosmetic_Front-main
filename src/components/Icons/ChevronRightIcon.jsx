import {ReactComponent as Icon} from "../../assets/icons/chevron_right.svg";

export default function ChevronRightIcon({classes, onClick}) {
	return (
		<Icon
			className={classes ?? ''}
			onClick={onClick}
		/>
	)
}