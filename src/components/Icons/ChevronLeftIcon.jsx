import {ReactComponent as Icon} from "../../assets/icons/chevron_left.svg";

export default function ChevronLeftIcon({classes, onClick}) {
	return (
		<Icon
			className={classes ?? ''}
			onClick={onClick}
		/>
	)
}