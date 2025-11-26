import {ReactComponent as Icon} from "../../assets/icons/download.svg";

export default function DownloadIcon({classes, onClick}) {
	return (
		<Icon className={`${classes ?? ''}`} onClick={onClick}/>
	)
}