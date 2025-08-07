import {MainTitle} from "../CooperationPage.styled";
import Canals from "./_elements/Canals";

const Contacts = () => {
	return (
		<div className="flex flex-col gap-8 items-center lg:items-start text-[#000E55] text-center lg:text-left">
			<div className="flex flex-col gap-[60px]">
				<div className="flex flex-col gap-[33px]">
					<MainTitle>
						КОНТАКТИ
					</MainTitle>
					<div className="flex flex-col gap-8">
						<div className="font-semibold text-xl leading-[14px]">ТЕЛЕФОН ДЛЯ ДЗВІНКІВ</div>
						<div className="font-medium text-md">+380 500 52 91 00 <br className="lg:hidden"/>(VIBER, TELEGRAM)</div>
					</div>
				</div>
				<div className="flex flex-col lg:flex-row gap-[60px]">
					<div className="flex flex-col gap-8 ">
						<div className="font-semibold text-xl leading-[14px]">НАШ ІНСТАГРАМ</div>
						<div className="flex gap-4 justify-center lg:justify-start items-center">
							<img
								src={require("../../../assets/icons/insta.svg").default}
								alt="insta"
								width={16}
								height={16}
							/>
							<div className="font-medium text-md">BEAUTY_BLOSSOM_UA</div>
						</div>
					</div>
					<Canals headerText="КАНАЛИ ДЛЯ ОПТУ"/>
					<Canals headerText="КАНАЛИ ДЛЯ ДРОПШИПІНГУ"/>
				</div>
			</div>
		</div>
	);
};

export default Contacts;
