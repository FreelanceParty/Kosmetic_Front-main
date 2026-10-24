import {useLocation, useParams} from "react-router-dom";
import CompletedOrder from "./CompletedOrder";
import {usePurchase} from "../../ads/useEcommerceTracking";

const OrderReceivedPage = () => {
	const {orderNumber} = useParams();
	const {state} = useLocation();

	usePurchase(orderNumber, state?.items, state?.value);

	return <CompletedOrder orderNumber={orderNumber}/>;
};

export default OrderReceivedPage;
