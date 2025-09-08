import React, {useState} from "react";
import {Container, Slider, SliderElement} from "../CooperationPage/CooperationPage.styled";
import OrderHistory from "./Sections/OrderHistory";
import ContactInfo from "./Sections/ContactInfo";
import ChangePassword from "./Sections/ChangePassword";
import LeaveFeedback from "./Sections/LeaveFeedback";

const tabs = [
	{id: "order_history", label: "Історія замовлень", component: <OrderHistory/>},
	{id: "contact_info", label: "Контактна інформація", component: <ContactInfo/>},
	{id: "change_password", label: "Змінити пароль", component: <ChangePassword/>},
	{id: "leave_feedback", label: "Залишити відгук", component: <LeaveFeedback/>},
];

const UserPage = () => {
	const [activeTab, setActiveTab] = useState("order_history");

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
			<div className="flex flex-col gap-10 md:px-[50px] xl:px-[100px] lg:pt-8">
				<div className="flex gap-[100px]">
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
					<div className="js-content px-5 w-full">
						{tabs.find(tab => tab.id === activeTab)?.component}
					</div>
				</div>
			</div>
		</Container>
	);
};

export default UserPage;
