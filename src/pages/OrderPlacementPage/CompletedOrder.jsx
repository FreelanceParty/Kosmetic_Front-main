import Button from "../../components/ButtonNew/Button";
import {useNavigate} from "react-router-dom";

const CompletedOrder = ({orderNumber}) => {
	const navigate = useNavigate();

	return (
		<div className="flex flex-col gap-6 md:gap-[50px] items-center py-10 md:py-[60px] px-[35px] md:px-[50px] bg-[#FFE8F5] text-center w-fit mx-auto top-[200px]">
			<div className="flex flex-col gap-[30px]">
				<div className="font-semibold leading-[11px] md:leading-[13px] uppercase text-md md:text-lg">Дякуємо за замовлення!</div>
				<div className="text-sm md:text-lg">
					Номер вашого замовлення {orderNumber}.<br/>
					Очікуйте на зворотній звяʼзок з менеджером!
				</div>
			</div>
			<Button
				type="secondary"
				text="НА ГОЛОВНУ СТОРІНКУ"
				classes="w-full max-w-[264px] md:max-w-[289px] h-[51px] md:h-[53px]"
				onClick={() => navigate('/')}
			/>
		</div>
	)
}

export default CompletedOrder;