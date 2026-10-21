import React, {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {FaCommentDots, FaInstagram, FaPhoneAlt, FaTelegramPlane, FaTimes, FaViber} from "react-icons/fa";
import {trackContact} from "../../ads/AdEvents";
import {getUserEmail, getUserFirstName, getUserLastName, getUserNumber} from "../../redux/auth/selectors";

const PHONE = "+380500529100";

const channels = [
	{id: "viber", label: "Viber", href: `viber://chat?number=${encodeURIComponent(PHONE)}`, icon: FaViber, color: "bg-[#7360F2]"},
	{id: "telegram", label: "Telegram", href: `https://t.me/${PHONE}`, icon: FaTelegramPlane, color: "bg-[#229ED9]"},
	{id: "instagram", label: "Instagram", href: "https://www.instagram.com/beauty_blossom_ua", icon: FaInstagram, color: "bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF]"},
	{id: "phone", label: "Подзвонити", href: `tel:${PHONE}`, icon: FaPhoneAlt, color: "bg-[#22A75B]"},
];

const ContactWidget = () => {
	const [isOpen, setIsOpen] = useState(false);
	const wrapRef = useRef(null);

	const userEmail = useSelector(getUserEmail);
	const userFirstName = useSelector(getUserFirstName);
	const userLastName = useSelector(getUserLastName);
	const userNumber = useSelector(getUserNumber);

	useEffect(() => {
		document.documentElement.classList.toggle("contact-widget-open", isOpen);
		if (!isOpen) {
			return;
		}
		const handleClickOutside = (e) => {
			if (wrapRef.current && !wrapRef.current.contains(e.target)) {
				setIsOpen(false);
			}
		};
		const handleEscape = (e) => {
			if (e.key === "Escape") {
				setIsOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		document.addEventListener("keydown", handleEscape);
		return () => {
			document.documentElement.classList.remove("contact-widget-open");
			document.removeEventListener("mousedown", handleClickOutside);
			document.removeEventListener("keydown", handleEscape);
		};
	}, [isOpen]);

	const handleChannelClick = (channelId) => {
		trackContact(channelId, {em: userEmail, fn: userFirstName, ln: userLastName, ph: userNumber});
		setIsOpen(false);
	};

	return (
		<div ref={wrapRef} className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
			{isOpen && (
				<ul id="contact-widget-list" className="flex flex-col items-end gap-3">
					{channels.map(({id, label, href, icon: Icon, color}) => (
						<li key={id}>
							<a
								href={href}
								target={href.startsWith("http") ? "_blank" : undefined}
								rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
								onClick={() => handleChannelClick(id)}
								className="flex items-center gap-3 group"
							>
								<span className="px-3 py-1 rounded-full bg-white text-[#000E55] text-sm font-medium shadow-md">{label}</span>
								<span className={`flex items-center justify-center w-11 h-11 rounded-full text-white text-xl shadow-md transition-transform group-hover:scale-110 ${color}`}>
									<Icon/>
								</span>
							</a>
						</li>
					))}
				</ul>
			)}
			<button
				type="button"
				onClick={() => setIsOpen(prev => !prev)}
				aria-label={isOpen ? "Закрити контакти" : "Зв'язатися з нами"}
				aria-expanded={isOpen}
				aria-controls="contact-widget-list"
				className="flex items-center justify-center w-[50px] h-[50px] rounded-full bg-[#DA469A] hover:bg-[#c23a87] text-white text-2xl shadow-[0_4px_4px_rgba(0,0,0,0.25)] transition-colors"
			>
				{isOpen ? <FaTimes/> : <FaCommentDots/>}
			</button>
		</div>
	);
};

export default ContactWidget;
