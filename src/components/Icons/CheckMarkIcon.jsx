import {ReactComponent as Icon} from "../../assets/icons/check_mark.svg";

export default function CheckMarkIcon({classes}) {
	return (
		<Icon className={classes ?? ''}/>
	)
}