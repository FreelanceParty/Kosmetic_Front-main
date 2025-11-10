import React, {useState} from "react";
import {Slider, SliderElement} from "./AdminPage.styled";

import Orders from "./tabs/Orders/Orders";
import Feedbacks from "./tabs/Feedbacks/Feedbacks";
import Mailing from "./tabs/Mailing/Mailing";

const tabs = [
	{id: "orders", label: "ЗАМОВЛЕННЯ", component: <Orders/>, styles: "w-full max-w-[240px]"},
	{id: "feedbacks", label: "ВІДГУКИ", component: <Feedbacks/>, styles: "w-full max-w-[200px]"},
	{id: "mailing", label: "ПОШТОВІ РОЗСИЛКИ", component: <Mailing/>, styles: "w-full max-w-[248px]"},
];

const AdminPage = () => {
	const [activeTab, setActiveTab] = useState("orders");

	return (
		<div className="flex flex-col gap-[50px] w-full max-w-[1183px] items-center py-10 mx-auto">
			<div className="flex flex-col gap-8 w-full">
				<div className="text-center text-lg font-semibold leading-[13px]">ПАНЕЛЬ АДМІНІСТРАТОРА</div>
				<Slider>
					{tabs.map((tab) => (
						<SliderElement
							key={tab.id}
							onClick={() => setActiveTab(tab.id)}
							className={`leading-[13px] text-gray-600 ${tab.styles} ${
								activeTab === tab.id
									? "bg-[#ffe8f5] "
									: "bg-[#f6f6f6] hover:bg-gray-200"
							}`}
						>
							{tab.label}
						</SliderElement>
					))}
				</Slider>
			</div>
			<div className="js-content w-full">
				{tabs.find(tab => tab.id === activeTab)?.component}
			</div>
		</div>
	);
};

export default AdminPage;
