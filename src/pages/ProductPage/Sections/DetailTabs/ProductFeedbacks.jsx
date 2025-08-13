import Button from "../../../../components/ButtonNew/Button";
import ProductFeedback from "./_elements/ProductFeedback";
import {usePopup} from "../../../../hooks/usePopup";
import {Popup} from "../../../../popups/Abstracts/Popup";
import CreateProductFeedback from "../../../../popups/CreateProductFeedback";

const ProductFeedbacks = ({product}) => {
	const {isOpen, content, openPopup, closePopup} = usePopup();

	const testData = [
		{
			id:   1,
			user: {
				name: "Дарина",
			},
			date: '22.03.2025',
			rate: 5,
			text: 'Дуже подобається сироватка, дуже класна текстура та аромат. Добре працює з сухістю, гарно лягає будь який крем',
		},
		{
			id:   2,
			user: {
				name: "Olga",
			},
			date: '30.06.2024',
			rate: 4,
			text: 'Дуже подобається сироватка, дуже класна текстура та аромат. Добре працює з сухістю, гарно лягає будь який крем',
		},
		{
			id:   3,
			user: {
				name: "Марія",
			},
			date: '02.05.2024',
			rate: 3,
			text: 'Дуже подобається сироватка, дуже класна текстура та аромат. Добре працює з сухістю, гарно лягає будь який крем',
		},
	];

	// todo: add feedbacks from db
	return (
		<div className="flex flex-col gap-10 w-fit">
			<Button
				type="secondary"
				text="ЗАЛИШИТИ ВІДГУК"
				onClick={() => openPopup(<CreateProductFeedback product={product}/>)}
			/>
			{false ? (
				<div className="flex flex-col gap-10">
					{testData.map((feedback) => (
						<ProductFeedback
							key={feedback.id}
							feedback={feedback}
						/>
					))}
				</div>
			) : (
				<div className="font-normal text-md">Станьте першим, хто залишить відгук на цей товар.</div>
			)}
			<Popup isOpen={isOpen} content={content} onClose={closePopup}/>
		</div>
	);
}

export default ProductFeedbacks;
