import {Container} from "./Details.styled";
import Description from "./DetailTabs/Description";
import Using from "./DetailTabs/Using";
import Composition from "./DetailTabs/Composition";
import ProductFeedbacks from "./DetailTabs/ProductFeedbacks";
import {useState} from "react";

const Details = ({product}) => {
	// todo: кількість відгуків
	const tabs = [
		{id: "description", label: "ОПИС ПРОДУКТУ", component: <Description product={product}/>},
		{id: "using", label: "СПОСІБ ЗАСТОСУВАННЯ", component: <Using product={product}/>},
		{id: "composition", label: "СКЛАД", component: <Composition product={product}/>},
		{id: "reviews", label: "ВІДГУКИ (x)", component: <ProductFeedbacks product={product}/>},
	];

	const [activeTab, setActiveTab] = useState("description");
	const [openTab, setOpenTab] = useState(null);

	return (
		<Container>
			<div className="hidden md:flex flex-col gap-10">
				<div className="gap-[67px] flex">
					{tabs.map((tab, index) => (
						<div
							key={tab.id}
							onClick={() => setActiveTab(tab.id)}
							className={`cursor-pointer text-lg font-semibold ${
								activeTab === tab.id
									? "text-[#DA469A]"
									: "text-[#000E55]"
							}`}
						>
							{tab.label}
						</div>
					))}
				</div>
				<div className="js-content">
					{tabs.find(tab => tab.id === activeTab)?.component}
				</div>
			</div>
			<div className="flex flex-col md:hidden w-full">
				{tabs.map((tab, index) => (
					<div key={tab.id} className="flex flex-col gap-6">
						<div
							className={`flex justify-between items-center border-b pt-3 pb-2 w-full font-semibold text-md cursor-pointer
            ${
								openTab === tab.id
									? "border-[#DA469A] text-[#DA469A]"
									: "border-[#000E55] text-[#000E55]"
							}`}
							onClick={() => setOpenTab(openTab === tab.id ? null : tab.id)}
						>
							<div>{tab.label}</div>
							<div>{openTab === tab.id ? "˅" : ">"}</div>
						</div>

						<div className={openTab === tab.id ? "block" : "hidden"}>
							{tab.component}
						</div>
					</div>
				))}
			</div>
		</Container>
	);
}
export default Details;
