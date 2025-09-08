import React, {useState, useRef} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getIsAdmin, getIsLoggedIn} from "../../../redux/auth/selectors";
import {logOut} from "../../../redux/auth/operation";
import {DropDown, ListItem, LogOut} from "./user.styled";

const User = ({icon, title, onClick, classes}) => {
	const [showDropdown, setShowDropdown] = useState(false);
	const isLoggedIn = useSelector(getIsLoggedIn);
	const isAdmin = useSelector(getIsAdmin)

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const dropdownRef = useRef(null);

	const handleDropdownEnter = () => {
		if (isLoggedIn) {
			setShowDropdown(true);
		}
	};

	const handleDropdownLeave = (e) => {
		if (!dropdownRef.current.contains(e.relatedTarget)) {
			setShowDropdown(false);
		}
	};

	const logoutDispatch = () => {
		dispatch(logOut());
		navigate("/");
	};

	return (
		<>
			<div className={`flex gap-3 items-center cursor-pointer h-[44px] relative ${classes ?? ''}`}
				onClick={onClick}
				onMouseEnter={isLoggedIn ? handleDropdownEnter : null}
				onMouseLeave={isLoggedIn ? handleDropdownLeave : null}
				ref={dropdownRef}
			>
				<img
					src={require(`../../../assets/icons/header/${icon}.svg`)}
					alt={icon}
					className="w-6 lg:w-[18px] h-6 lg:h-[18px]"
				/>
				<div className="hidden lg:block">{title ?? ''}</div>

				{showDropdown && (
					<DropDown className="text-nowrap">
						<ul>
							{isAdmin && (
								<ListItem>
									<Link to="/ordersbyclient">замовлення (адмін)</Link>
								</ListItem>
							)}
							<ListItem>
								<Link to="/cabinet">особистий кабінет</Link>
							</ListItem>
							<ListItem>
								<LogOut onClick={() => logoutDispatch()}>вихід</LogOut>
							</ListItem>
						</ul>
					</DropDown>
				)}
			</div>
		</>
	);
};

export default User;