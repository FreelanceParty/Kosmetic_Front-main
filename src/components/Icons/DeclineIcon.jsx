import {ReactComponent as Icon} from "../../assets/icons/decline.svg";

export default function DeclineIcon({classes, onClick}) {
	return (
		<Icon className={`${classes ?? ''}`} onClick={onClick}/>
	)
}