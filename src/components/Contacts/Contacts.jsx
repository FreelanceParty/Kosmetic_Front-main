import React from "react";

import {Link, Wrap} from "./contacts.styled";

const Contacts = ({title, to, icon, head, burger}) => {
	if (icon === "telegram") {
		return (
			<Wrap>
				<Link
					href={to}
					target="_blank"
					rel="noreferrer"
					className={(head && "head") || (burger && "burger")}
				>
					{title}
				</Link>
			</Wrap>
		);
	} else if (icon === "instagram") {
		return (
			<Wrap>
				<Link
					href={to}
					target="_blank"
					rel="noreferrer"
					className={(head && "head") || (burger && "burger")}
				>
					{title}
				</Link>
			</Wrap>
		);
	} else if (icon === "phone") {
		return (
			<Wrap>
				<Link href={to} className={(head && "head") || (burger && "burger")}>
					{title}
				</Link>
			</Wrap>
		);
	} else {
		return (
			<Wrap>
				<Link href={to} className={(head && "head") || (burger && "burger")}>
					{title}
				</Link>
			</Wrap>
		);
	}
};

export default Contacts;
