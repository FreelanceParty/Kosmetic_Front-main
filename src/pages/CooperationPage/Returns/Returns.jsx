import {MainTitle, SecondaryTitle} from "../CooperationPage.styled";
import Button from "../../../components/ButtonNew/Button";

const Returns = () => {
	const linkClassName = "font-medium hover:text-[#E667A4]";

	return (
		<div className="flex flex-col gap-8 items-center lg:items-start text-[#000E55]">
			<MainTitle className="w-full">ОБМІН ТА ПОВЕРНЕННЯ</MainTitle>
			<div className="flex flex-col gap-6 text-md leading-[160%] max-w-full lg:max-w-[880px] xl:pr-[100px]">
				<SecondaryTitle>ВАЖЛИВА ІНФОРМАЦІЯ ЩОДО ОТРИМАННЯ ЗАМОВЛЕНЬ НОВОЮ ПОШТОЮ!</SecondaryTitle>
				<div>
					<p>Любі клієнти!</p>
					<p>Ми прагнемо, щоб кожне ваше замовлення було цілим та неушкодженим. Проте, як відповідальний магазин, ми чітко дотримуємося законодавства України, щоб захистити ваше здоров'я та гарантувати оригінальність продукції.</p>
				</div>
				<p>
					Згідно з Постановою КМУ №172, парфумерно-косметичні вироби належної якості обміну та поверненню <span className="font-semibold">не підлягають</span>.
					Це стандарт безпеки: ми маємо бути впевнені, що кожна баночка не відкривалася і зберігалася в належних умовах, перш ніж потрапити до ваших рук.
				</p>
				<div>
					<p><span className="font-semibold">КОЛИ МИ БЕЗ ПИТАНЬ ПРИЙМЕМО ПОВЕРНЕННЯ?</span> Ми завжди на боці клієнта, якщо:</p>
					<p>— виявлено виробничий брак: дефекти дозатора тощо</p>
					<p>— помилка комплектації: ви отримали не той засіб, який замовляли</p>
				</div>
				<div>
					<p><span className="font-semibold">ВАЖЛИВО:</span> якщо ви помітили пошкодження або недостачу товару — зафіксуйте їх одразу у відділенні та зв’яжіться з нами:</p>
					<p>— через вашого менеджера в будь-якому зручному месенджері</p>
					<p>— за номером телефону <a className={linkClassName} href="tel:+380500529100">+380500529100</a></p>
					<p>— через Instagram <a className={linkClassName} href="https://www.instagram.com/beauty_blossom_ua" target="_blank" rel="noreferrer">@beauty_blossom_ua</a></p>
					<p>— через електронну пошту <a className={linkClassName} href="mailto:beautyblossom.opt@gmail.com">beautyblossom.opt@gmail.com</a></p>
				</div>
				<p>Ми оперативно вирішимо проблему, адже ваш гарний настрій — наш пріоритет!</p>
				<p className="font-semibold">ДЯКУЄМО ЗА СПІВПРАЦЮ, УВАЖНІСТЬ ТА ДОВІРУ!</p>
			</div>
			<Button type="primary" text="ВПЕРЕД ЗА ПОКУПКАМИ" to="/search?page=1&query="/>
		</div>
	);
};

export default Returns;
