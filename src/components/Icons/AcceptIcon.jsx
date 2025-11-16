import {ReactComponent as Icon} from "../../assets/icons/accept.svg";

export default function AcceptIcon({classes, onClick}) {
	return (
		<Icon className={`${classes ?? ''}`} onClick={onClick}/>
	)
}