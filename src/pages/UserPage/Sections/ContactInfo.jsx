import Button from "../../../components/ButtonNew/Button";
import Input from "../../../components/Input/Input";
import {useSelector} from "react-redux";
import {useState} from "react";
import {getUserEmail, getUserFirstName, getUserLastName, getUserNumber} from "../../../redux/auth/selectors";

const ContactInfo = () => {
	const [email, setEmail] = useState(useSelector(getUserEmail));
	const [firstName, setFirstName] = useState(useSelector(getUserFirstName));
	const [lastName, setLastName] = useState(useSelector(getUserLastName));
	const [number, setNumber] = useState(useSelector(getUserNumber));

	return (
		<div className="flex flex-col">
			<div className="hidden md:flex flex-col gap-4 mb-6">
				<div className="font-semibold text-lg leading-[13px]">КОНТАКТНА ІНФОРМАЦІЯ</div>
				<div className="border-t border-[#E8E8E8]"/>
			</div>
			<div className="flex flex-col gap-4 md:gap-[30px] mb-6 md:mb-10 max-w-[545px]">
				<div className="flex flex-col md:flex-row justify-between gap-2 md:gap-0">
					<div className="text-sm md:text-lg">EMAIL<span className="text-[#E667A4]">*</span></div>
					<Input
						type="email"
						value={email}
						inputClasses="max-w-[409px] h-[53px] !bg-[#f6f6f6]"
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className="flex flex-col md:flex-row justify-between gap-2 md:gap-0">
					<div className="text-sm md:text-lg">ІМ'Я<span className="text-[#E667A4]">*</span></div>
					<Input
						type="text"
						value={firstName}
						inputClasses="max-w-[409px] h-[53px] !bg-[#f6f6f6]"
						onChange={(e) => setFirstName(e.target.value)}
					/>
				</div>
				<div className="flex flex-col md:flex-row justify-between gap-2 md:gap-0">
					<div className="text-sm md:text-lg">ПРІЗВИЩЕ<span className="text-[#E667A4]">*</span></div>
					<Input
						type="text"
						value={lastName}
						inputClasses="max-w-[409px] h-[53px] !bg-[#f6f6f6]"
						onChange={(e) => setLastName(e.target.value)}
					/>
				</div>
				<div className="flex flex-col md:flex-row justify-between gap-2 md:gap-0">
					<div className="text-sm md:text-lg">ТЕЛЕФОН<span className="text-[#E667A4]">*</span></div>
					<Input
						type="text"
						value={number}
						inputClasses="max-w-[409px] h-[53px] !bg-[#f6f6f6]"
						onChange={(e) => setNumber(e.target.value)}
					/>
				</div>
			</div>
			<Button
				type="primary"
				text="ЗБЕРЕГТИ ЗМІНИ"
				classes="h-[53px] w-full max-w-[409px] md:max-w-[227px]"
			/>
		</div>
	);
};
export default ContactInfo;