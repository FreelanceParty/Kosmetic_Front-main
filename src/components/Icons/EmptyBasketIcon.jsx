import {ReactComponent as Icon} from "../../assets/icons/empty_basket.svg";

export default function EmptyBasketIcon({classes}) {
	return (
		<Icon className={classes ?? ''}/>
	)
}