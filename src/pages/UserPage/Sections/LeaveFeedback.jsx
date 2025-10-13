import Button from "../../../components/ButtonNew/Button";
import TextArea from "../../../components/TextArea/TextArea";
import React, {useState} from "react";

const LeaveFeedback = () => {
	const [feedbackText, setFeedbackText] = useState("");
	return (
		<div className="flex flex-col">
			<div className="hidden md:flex flex-col gap-4 mb-6">
				<div className="font-semibold text-lg leading-[13px]">ВІДГУКИ ТА ПРОПОЗИЦІЇ</div>
				<div className="border-t border-[#E8E8E8]"/>
			</div>
			<div className="flex flex-col gap-8 md:gap-10 mb-6 md:mb-10 max-w-[624px]">
				<div className="text-md ">
					<span className="font-semibold">Дорогі партнери!</span><br/>
					Щиро дякуємо за те, що обрали нас. Нам важлива ваша думка — вона допомагає нам ставати кращими.<br/>
					Маєте ідеї, зауваження чи просто хочете поділитися враженнями?<br/>
					Залиште, будь ласка, свій відгук — ми уважно читаємо кожен!
				</div>
				<TextArea
					placeholder="Введіть повідомлення сюди"
					value={feedbackText}
					onChange={(e) => setFeedbackText(e.target.value)}
					inputClasses="h-[155px] resize-none"
				/>
			</div>
			<Button
				type="primary"
				text="ЗАЛИШИТИ ВІДГУК"
				classes="h-[53px] w-[249px]"
			/>
		</div>
	);
};
export default LeaveFeedback;