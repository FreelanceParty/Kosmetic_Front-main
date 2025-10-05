import {ReactComponent as Icon} from "../../assets/icons/delete.svg";

export default function DeleteIcon({classes, onClick}) {
	return (
		<Icon onClick={onClick} className={classes ?? ''}/>
	)
}