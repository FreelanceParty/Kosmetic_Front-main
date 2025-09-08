import Button from "../../../components/ButtonNew/Button";
import Input from "../../../components/Input/Input";
const ContactInfo = () => {
	return (
		<div className="flex flex-col">
			<div className="flex flex-col gap-4 mb-6">
				<div className="font-semibold text-lg leading-[13px]">КОНТАКТНА ІНФОРМАЦІЯ</div>
				<div className="border-t border-[#E8E8E8]"/>
			</div>
			<div className="flex flex-col gap-[30px] mb-10 max-w-[545px]">
				<div className="flex justify-between">
					<div className="text-lg">EMAIL<span className="text-[#E667A4]">*</span></div>
					<Input
						type="email"
						inputClasses="max-w-[409px] h-[53px] !bg-[#f6f6f6]"
					/>
				</div>
				<div className="flex justify-between">
					<div className="text-lg">ІМ'Я<span className="text-[#E667A4]">*</span></div>
					<Input
						type="text"
						inputClasses="max-w-[409px] h-[53px] !bg-[#f6f6f6]"
					/>
				</div>
				<div className="flex justify-between">
					<div className="text-lg">ПРІЗВИЩЕ<span className="text-[#E667A4]">*</span></div>
					<Input
						type="text"
						inputClasses="max-w-[409px] h-[53px] !bg-[#f6f6f6]"
					/>
				</div>
				<div className="flex justify-between">
					<div className="text-lg">ТЕЛЕФОН<span className="text-[#E667A4]">*</span></div>
					<Input
						type="text"
						inputClasses="max-w-[409px] h-[53px] !bg-[#f6f6f6]"
					/>
				</div>
			</div>
			<Button
				type="primary"
				text="ЗБЕРЕГТИ ЗМІНИ"
				classes="h-[53px] max-w-[227px]"
			/>
		</div>
	);
};
export default ContactInfo;