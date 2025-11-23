import Checkbox from "../../../../components/Inputs/Checkbox";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const ProductsTable = ({orderId, products}) => {
	const colWidthClasses = {
		price:    "w-[79px] min-w-[79px]",
		quantity: "w-[89px] min-w-[89px]",
		amount:   "w-[88px] min-w-[88px]"
	};

	const updateProductCheck = async (productId, isChecked) => {
		try {
			const response = await axios.patch(`${API_URL}/orders/${orderId}/checked`, {
				productId: productId,
				isChecked: isChecked,
			});
			console.log(response)
		} catch (e) {
			console.log(e)
		}
	}

	return (
		<div className="text-[13px] max-w-[736px] mx-0 sm:mx-6">
			<div className="hidden sm:flex w-full h-[42px] font-semibold leading-[9px] border-b border-[#64759B]">
				<div className="flex my-auto pl-[14px] flex-1">Назва товару</div>
				<div className={`my-auto text-center ${colWidthClasses.price}`}>Ціна</div>
				<div className={`my-auto text-center ${colWidthClasses.quantity}`}>Кількість</div>
				<div className={`my-auto text-center ${colWidthClasses.amount}`}>Сума</div>
				{products.length > 5 &&
					<div className="w-[14px]"></div>
				}
			</div>

			<div className="flex flex-col overflow-y-auto max-h-[350px] gap-1 sm:gap-0">
				{products.map((product) => (
					<div key={product.productId} className="flex flex-col sm:flex-row items-center sm:min-h-[70px] sm:max-h-[70px] gap-4 sm:gap-0 py-4 sm:py-0 border-b-2 sm:border-none px-6 sm:px-0">
						<div className="flex gap-[10px] w-full sm:max-w-[480px]">
							<Checkbox defaultChecked={product.isChecked} onChange={(isChecked) => updateProductCheck(product.productId, isChecked)}/>
							<img className="w-[50px] h-[50px] my-auto" src={product.images} alt="product"/>
							<div className="w-full leading-4 line-clamp-4 sm:line-clamp-3">{product.name}</div>
						</div>
						<div className={`hidden sm:flex justify-center ${colWidthClasses.price}`}>{(product.amount / product.quantity).toFixed(2)}</div>
						<div className={`hidden sm:flex justify-center ${colWidthClasses.quantity}`}>{product.quantity} шт.</div>
						<div className={`hidden sm:flex justify-center ${colWidthClasses.amount}`}>{product.amount.toFixed(2)}</div>
						<div className="w-full sm:hidden border"></div>
						<div className="sm:hidden flex justify-between w-full text-center text-sm">
							<div className="flex flex-col gap-4">
								<div className="leading-[10px]">Ціна, грн</div>
								<div className="font-medium leading-[10px]">{(product.amount / product.quantity).toFixed(2)}</div>
							</div>
							<div className="flex flex-col gap-4">
								<div className="leading-[10px]">К-сть</div>
								<div className="font-medium leading-[10px]">{product.quantity} шт.</div>
							</div>
							<div className="flex flex-col gap-4">
								<div className="leading-[10px]">Сума, грн</div>
								<div className="font-medium leading-[10px]">{product.amount.toFixed(2)}</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default ProductsTable;