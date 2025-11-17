import Checkbox from "../../../../components/Inputs/Checkbox";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const ProductsTable = ({orderId, products}) => {
	const colWidths = {
		price:    "79px",
		quantity: "89px",
		amount:   "88px"
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
		<div className="text-[13px] max-w-[736px]">
			<table className="w-full table-fixed border-b border-[#64759B]">
				<thead>
				<tr className="h-[42px] font-semibold leading-[9px] bg-white z-10 top-0">
					<td className="pl-[14px] max-w-[541px]">Назва товару</td>
					<td style={{width: colWidths.price, minWidth: colWidths.price}} align="center">Ціна</td>
					<td style={{width: colWidths.quantity, minWidth: colWidths.quantity}} align="center">Кількість</td>
					<td style={{width: colWidths.amount, minWidth: colWidths.amount}} align="center">Сума</td>
					{products.length > 5 &&
						<td style={{width: '15px'}}></td>
					}
				</tr>
				</thead>
			</table>

			<div className="overflow-y-auto max-h-[42vh]">
				<table className="w-full table-fixed">
					<tbody>
					{products.map((product) => (
						<tr key={product.productId} className="flex items-center h-[70px]">
							<td className="flex gap-[10px] max-w-[480px]">
								<Checkbox defaultChecked={product.isChecked} onChange={(isChecked) => updateProductCheck(product.productId, isChecked)}/>
								<img className="w-[50px] h-[50px]" src={product.images} alt="product"/>
								<div className="w-full line-clamp-3">{product.name}</div>
							</td>
							<td style={{width: colWidths.price, minWidth: colWidths.price}} align="center">{(product.amount / product.quantity).toFixed(2)}</td>
							<td style={{width: colWidths.quantity, minWidth: colWidths.quantity}} align="center">{product.quantity} шт.</td>
							<td style={{width: colWidths.amount, minWidth: colWidths.amount}} align="center">{product.amount.toFixed(2)}</td>
						</tr>
					))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default ProductsTable;