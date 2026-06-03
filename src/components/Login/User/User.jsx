import React, {useState, useRef, useEffect} from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getIsAdmin, getIsLoggedIn} from "../../../redux/auth/selectors";
import {logOut} from "../../../redux/auth/operation";
import {DropDown} from "./user.styled";
import userIcon from "../../../assets/icons/header/user.svg";

const User = ({icon, title, onClick, classes}) => {
	const [showDropdown, setShowDropdown] = useState(false);
	const isLoggedIn = useSelector(getIsLoggedIn);
	const isAdmin = useSelector(getIsAdmin);
	const dispatch = useDispatch();
	const dropdownRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = (e) => {
			if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
				setShowDropdown(false);
			}
		};
		document.addEventListener("click", handleClickOutside);
		return () => document.removeEventListener("click", handleClickOutside);
	}, []);

	const toggleDropdown = (e) => {
		e.stopPropagation();
		if (isLoggedIn) {
			setShowDropdown((prev) => !prev);
		} else if (onClick) {
			onClick();
		}
	};

	const logoutDispatch = () => {
		dispatch(logOut());
		setShowDropdown(false);
	};

	const closeDropdown = (e) => {
		e.stopPropagation();
		setShowDropdown(false);
	};

	return (
		<div
			className={`flex gap-3 items-center cursor-pointer h-full max-h-[44px] relative ${classes ?? ''}`}
			onClick={toggleDropdown}
			ref={dropdownRef}
		>
			<img
				src={userIcon}
				alt={icon}
				className="w-6 lg:w-[18px] h-6 lg:h-[18px]"
			/>
			<div className="hidden lg:block">{title ?? ''}</div>

			{showDropdown && (
				<DropDown className="flex flex-col top-full -right-6 divide-y">
					{isAdmin && (
						<Link className={`py-2 px-4 truncate cursor-pointer hover:bg-[#FFE8F5]`} to="/admin-panel" onClick={closeDropdown}>
							панель адміністратора
						</Link>
					)}
					<Link className={`py-2 px-4 truncate cursor-pointer hover:bg-[#FFE8F5]`} to="/cabinet" onClick={closeDropdown}>
						особистий кабінет
					</Link>
					<div className={`py-2 px-4 truncate cursor-pointer hover:bg-[#FFE8F5]`} onClick={() => logoutDispatch()}>
						вихід
					</div>
				</DropDown>
			)}
		</div>
	);
};

export default User;
