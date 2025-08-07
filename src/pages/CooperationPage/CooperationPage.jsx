import React, {useState} from "react";
import {Container, Slider, SliderElement} from "./CooperationPage.styled";
import PersonalOrders from "./PersonalOrders/PersonalOrders";
import Business from "./Business/Business";
import Dropshipping from "./Dropshipping/Dropshipping";
import Contacts from "./Contacts/Contacts";

const tabs = [
	{id: "personal", label: "Особисті замовлення", component: <PersonalOrders/>},
	{id: "business", label: "Для бізнесів (Опт)", component: <Business/>},
	{id: "dropshipping", label: "Дропшипінг", component: <Dropshipping/>},
	{id: "contacts", label: "Контакти", component: <Contacts/>},
];

const CooperationPage = () => {
	const [activeTab, setActiveTab] = useState("personal");

	return (
		<Container>
			<Slider>
				{tabs.map((tab, index) => (
					<SliderElement
						key={tab.id}
						onClick={() => setActiveTab(tab.id)}
						className={`${
							activeTab === tab.id
								? "bg-[#ffe8f5] text-gray-600"
								: "bg-[#f6f6f6] text-gray-600 hover:bg-gray-200"
						} ${index === 0 ? "ml-5" : ""} ${index === tabs.length - 1 ? "mr-5" : ""}`}
					>
						{tab.label}
					</SliderElement>
				))}
			</Slider>
			<div className="flex flex-col gap-10 lg:px-[100px] lg:pt-8">
				<div className="gap-[10px] items-center text-[#000E55] text-sm hidden lg:flex h-6">
					<div>Головна</div>
					<div className="border-l border-gray-700 h-full"></div>
					<div>Співпраця</div>
				</div>
				<div className="flex gap-20">
					<div className="flex-col gap-[30px] lg:flex hidden">
						{tabs.map((tab, index) => (
							<SliderElement
								key={tab.id}
								onClick={() => setActiveTab(tab.id)}
								className={`${
									activeTab === tab.id
										? "bg-[#ffe8f5] text-gray-600"
										: "bg-[#f6f6f6] text-gray-600 hover:bg-gray-200"
								}`}
							>
								{tab.label}
							</SliderElement>
						))}
					</div>
					<div className="js-content px-5">
						{tabs.find(tab => tab.id === activeTab)?.component}
					</div>
				</div>
			</div>
		</Container>
	);
};

export default CooperationPage;
