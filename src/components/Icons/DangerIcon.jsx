import {ReactComponent as Icon} from "../../assets/icons/danger.svg";

export default function DangerIcon({classes}) {
	return (
		<Icon className={classes ?? ''}/>
	)
}