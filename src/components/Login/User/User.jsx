import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import AuthModal from "../AuthModal/AuthModal";
import {
	LinkBtn,
	LogInIcon,
	DropDown,
	ListItem,
	LogOut,
} from "./user.styled";

const User = () => {
	const [showDropdown, setShowDropdown] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [loginOrRegister, setLoginOrRegister] = useState(false);
	const [isLogin, setIsLogin] = useState(!!localStorage.getItem("token"));
	const [isAdmin, setIsAdmin] = useState(localStorage.getItem("isAdmin") === "true");

	useEffect(() => {
		const handleStorage = () => {
			setIsLogin(!!localStorage.getItem("token"));
			setIsAdmin(localStorage.getItem("isAdmin") === "true");
		};
		window.addEventListener("storage", handleStorage);
		return () => window.removeEventListener("storage", handleStorage);
	}, []);

	const onRegisterSuccess = () => {
		setLoginOrRegister(true);
		alert("Ви успішно зареєструвалися, авторизуйтеся");
	};

	const handleModalEnter = () => {
		if (!isLogin) {
			setShowModal(true);
		}
	};

	const handleDropdownEnter = () => {
		if (isLogin) {
			setShowDropdown(true);
		}
	};

	const handleDropdownLeave = () => {
		setShowDropdown(false);
	};

	const logoutHandler = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("isAdmin");
		localStorage.removeItem("firstName");
		setIsLogin(false);
		setIsAdmin(false);
		setShowDropdown(false);
	};

	const handelDropClose = (e) => {
		if (e.target.tagName === "SECTION") {
			setShowModal(false);
		}
	};

	useEffect(() => {
		if (showModal) {
			document.body.classList.add("modal-open");
		} else {
			document.body.classList.remove("modal-open");
		}
		return () => document.body.classList.remove("modal-open");
	}, [showModal]);

	return (
		<>
			<LinkBtn
				onClick={!isLogin ? handleModalEnter : null}
				onMouseEnter={isLogin ? handleDropdownEnter : null}
			>
				<LogInIcon/>
			</LinkBtn>

			{showDropdown && (
				<DropDown onMouseLeave={handleDropdownLeave}>
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
							<Link to="/cabinet/history">історія замовлень</Link>
						</ListItem>
						<ListItem>
							<LogOut onClick={logoutHandler}>вихід</LogOut>
						</ListItem>
					</ul>
				</DropDown>
			)}

			{showModal && (
				<AuthModal
					setShowModal={setShowModal}
					setIsLogin={setIsLogin}
					onClose={() => setShowModal(false)}
					setIsAdmin={setIsAdmin}
				/>
			)}
		</>
	);
};

export default User;