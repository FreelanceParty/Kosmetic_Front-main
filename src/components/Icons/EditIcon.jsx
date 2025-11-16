import {ReactComponent as Icon} from "../../assets/icons/edit.svg";

export default function EditIcon({classes, onClick}) {
	return (
		<Icon className={`text-[#000E55] ${classes ?? ''}`} onClick={onClick}/>
	)
}