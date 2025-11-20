import {ReactComponent as Icon} from "../../assets/icons/filter.svg";

export default function FilterIcon({classes, onClick}) {
	return (
		<Icon className={`${classes ?? ''}`} onClick={onClick}/>
	)
}