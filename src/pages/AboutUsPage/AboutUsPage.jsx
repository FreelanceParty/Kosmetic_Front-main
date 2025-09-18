import React from "react";
import {Link} from "react-router-dom";

const AboutUsPage = () => {
	return (
		<div className="flex flex-col pt-[34px]">
			<div className="flex gap-[10px] text-sm mb-10">
				<Link className="cursor-pointer" to="/">Головна</Link>
				<div className="border-[#000E55] border-l"></div>
				<span>Про нас</span>
			</div>
		</div>
	);
};

export default AboutUsPage;
