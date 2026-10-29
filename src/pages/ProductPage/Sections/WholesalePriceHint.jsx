import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {getIsLoggedIn, getOwnedCabinets} from "../../../redux/auth/selectors";

const linkClassName = "underline hover:text-[#E667A4]";

const WholesalePriceHint = ({classes}) => {
	const isLoggedIn = useSelector(getIsLoggedIn);
	const ownedCabinets = useSelector(getOwnedCabinets) ?? [];

	if (!isLoggedIn) {
		return (
			<div className={classes}>
				<Link className={linkClassName} to="/reg-opt-cabinet">Зареєструйтесь</Link> або <Link className={linkClassName} to="/authorization">увійдіть</Link> для відображення оптових цін
			</div>
		);
	}

	if (ownedCabinets.includes("opt")) {
		return (
			<div className={classes}>
				<Link className={linkClassName} to="/cabinet?tab=cabinets">Перемкніться на оптовий кабінет</Link> для відображення оптових цін
			</div>
		);
	}

	if (ownedCabinets.includes("drop")) {
		return (
			<div className={classes}>
				<Link className={linkClassName} to="/cabinet?tab=cabinets">Перемкніться на дроп-кабінет</Link> для відображення дроп цін
			</div>
		);
	}

	return (
		<div className={classes}>
			<Link className={linkClassName} to="/cabinet?tab=cabinets&create=opt">Створіть оптовий кабінет</Link> для відображення оптових цін
		</div>
	);
};

export default WholesalePriceHint;
