import Input from "../../../components/Input/Input";
import Button from "../../../components/ButtonNew/Button";
const ChangePassword = () => {
	return (
		<div className="flex flex-col">
			<div className="flex flex-col gap-4 mb-6">
				<div className="font-semibold text-lg leading-[13px]">ЗМІНИТИ ПАРОЛЬ</div>
				<div className="border-t border-[#E8E8E8]"/>
			</div>
			<div className="flex flex-col gap-[30px] mb-10 max-w-[610px]">
				<div className="flex justify-between">
					<div className="text-lg whitespace-nowrap">СТАРИЙ ПАРОЛЬ<span className="text-[#E667A4]">*</span></div>
					<Input
						type="password"
						inputClasses="max-w-[409px] h-[53px] !bg-[#f6f6f6]"
					/>
				</div>
				<div className="flex justify-between">
					<div className="text-lg whitespace-nowrap">НОВИЙ ПАРОЛЬ<span className="text-[#E667A4]">*</span></div>
					<Input
						type="password"
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
export default ChangePassword;