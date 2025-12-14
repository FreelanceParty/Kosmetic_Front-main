import RateHearts from "../../RateHearts/RateHearts";
import {useNavigate} from "react-router-dom";
import {handleAddToCart} from "../../../utils/helpers/basket";
import {useDispatch, useSelector} from "react-redux";
import {getIsLoggedIn, getUserEmail, getUserFirstName, getUserLastName, getUserNumber, getOptUser} from "../../../redux/auth/selectors";
import {selectCart} from "../../../redux/cart/selectors";
import {trackAddToCart} from "../../../ads/AdEvents";
import {useEffect, useState} from "react";
import axios from "axios";
import Tag from "./_elements/Tag";
import {toast} from "react-toastify";

const API_URL = process.env.REACT_APP_API_URL;

const ProductCard = ({product, isSlider = false}) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const isLoggedIn = useSelector(getIsLoggedIn);
	const productCart = useSelector(selectCart);
	const isOptUser = useSelector(getOptUser);
	const [price, setPrice] = useState(0);
	const [priceOld, setPriceOld] = useState(0);

	const userEmail = useSelector(getUserEmail);
	const userFirstName = useSelector(getUserFirstName);
	const userLastName = useSelector(getUserLastName);
	const userNumber = useSelector(getUserNumber);

	const [averageRating, setAverageRating] = useState(0);
	const [reviewsCount, setReviewsCount] = useState('');

	useEffect(() => {
		if (isOptUser) {
			setPrice(product.priceOPT);
			setPriceOld(product.priceOldOPT);
		} else {
			setPrice(product.price);
			setPriceOld(product.priceOld);
		}
	}, [isOptUser])

	useEffect(() => {
		const fetchReviews = async () => {
			function getReviewWord(count) {
				if (count % 100 >= 11 && count % 100 <= 19) {
					return 'відгуків';
				}
				switch (count % 10) {
					case 1:
						return 'відгук';
					case 2:
					case 3:
					case 4:
						return 'відгуки';
					default:
						return 'відгуків';
				}
			}

			try {
				const response = await axios.get(`${API_URL}/productReviews/forProduct/${product.id}`);
				const reviews = response.data;
				const count = reviews.length;
				const totalRating = reviews.reduce((acc, review) => acc + review.rate, 0);
				const average = totalRating / count;
				setAverageRating(Math.ceil(average));
				setReviewsCount(`${count} ${getReviewWord(count)}`);
			} catch (error) {
				console.error('Failed to fetch reviews:', error);
			}
		};

		fetchReviews();
	}, [product._id]);

	const productCartFind = productCart?.find(
		(item) => +item.id === +product.id
	);

	const handleCardClick = (e) => {
		const el = e.target;
		const isIcon = el.closest('button');
		if (isIcon) {
			el.closest('button').classList.toggle('hidden');
			handleAddToCart({product, quantity: 1, dispatch, isLoggedIn, event: e});
			try {
				trackAddToCart(product, {em: userEmail, fn: userFirstName, ln: userLastName, ph: userNumber});
				toast.success("Товар додано в корзину");
			} catch (e) {
				toast.error("Помилка додавання товару в корзину");
				console.log(e);
			}
		} else {
			navigate(`/products/${product.id}`);
		}
	}

	return (
		<>
			<div className={`flex flex-col w-[159px] cursor-pointer ${isSlider ? 'md:hidden' : 'sm:hidden'} ${product.amount <= 0 ? 'opacity-50' : ''}`}
				onClick={handleCardClick}>
				<div className="relative flex items-center justify-center w-full aspect-square">
					<img className="h-[159px]" src={product.images} alt="product"/>
					{(product.sale || product.new) &&
						<div className="absolute top-3 right-0 flex flex-col gap-3 z-10">
							{product.sale && <Tag isSale={true}/>}
							{product.new && <Tag isSale={false}/>}
						</div>
					}
				</div>
				<div className="flex flex-col gap-4 py-3 px-[10px]">
					<div className="flex flex-col gap-3">
						<div className="flex gap-[6px] leading-[12px]">
							<RateHearts count={averageRating} heartSize={12}/>
							<div className="font-normal text-[10px]">{reviewsCount}</div>
						</div>
						<div className="font-semibold text-xs leading-[8px] uppercase">{product.brand}</div>
						<div className="font-normal text-xs line-clamp-3 leading-[15px]">{product.name}</div>
					</div>
					<div className="flex justify-between h-[44px]">
						<div className="flex flex-col justify-between">
							{product.amount > 0 ? (
								<div className="text-[#007504] text-[10px] leading-[7px]">В наявності</div>
							) : (
								<div className="text-[#B90003] text-[10px] leading-[7px] truncate">Немає в наявності</div>
							)}
							<div className={`flex flex-col h-[27px] ${priceOld ? 'justify-between' : 'justify-end'}`}>
								{priceOld && (
									<div className="font-normal text-[10px] line-through leading-[7px] text-nowrap">{priceOld} ГРН</div>
								)}
								<div className={`font-bold text-sm leading-[10px] text-nowrap ${priceOld ? 'text-[#B90003]' : ''}`}>{price} ГРН</div>
							</div>
						</div>
						{!productCartFind &&
							<button>
								<img
									src={require("../../../assets/icons/buy_mobile.svg").default}
									alt="to cart"
									width={44}
									height={44}
								/>
							</button>
						}
					</div>
				</div>
			</div>

			<div className={`hidden flex-col justify-between h-full ${isSlider ? 'md:flex w-full' : 'sm:flex w-[283px]'} cursor-pointer ${product.amount <= 0 ? 'opacity-50' : ''}`}
				onClick={handleCardClick}>
				<div className="relative flex items-center justify-center w-full aspect-square">
					<img className="max-w-full" src={product.images} alt="product"/>
					{(product.sale || product.new) &&
						<div className="absolute top-4 right-0 flex flex-col gap-4 z-10">
							{product.sale && <Tag isSale={true}/>}
							{product.new && <Tag isSale={false}/>}
						</div>
					}
				</div>
				<div className="flex flex-col gap-2 lg:gap-5 py-2 lg:py-5 px-1 lg:px-3">
					<div className="flex justify-between">
						<div className="flex flex-col gap-2 lg:gap-4">
							<div className="flex gap-2 lg:gap-3">
								<RateHearts count={averageRating}/>
								<div className="font-normal text-xs">{reviewsCount}</div>
							</div>
							<div className="font-semibold text-sm leading-[11px] uppercase">{product.brand}</div>
						</div>
						{!productCartFind &&
							<button>
								<img
									src={require("../../../assets/icons/buy_mobile.svg").default}
									alt="to cart"
									width={44}
									height={44}
								/>
							</button>
						}
					</div>
					<div className="font-normal text-sm line-clamp-2 leading-[15px]">{product.name}</div>
					<div className="flex justify-between">
						<div className="flex flex-col justify-between text-xs justify-center gap-2 h-[31px] leading-[8px]">
							{product.amount > 0 ? (
								<div className="text-[#007504]">В наявності</div>
							) : (
								<div className="text-[#B90003]">Немає в наявності</div>
							)}
							<div>Роздрібна ціна</div>
						</div>
						<div className={`flex flex-col ${priceOld ? 'justify-between' : 'justify-end'}`}>
							{priceOld && (
								<div className="font-normal text-sm line-through leading-[10px] text-nowrap">{priceOld} ГРН</div>
							)}
							<div className={`font-bold text-md leading-[11px] text-nowrap ${!priceOld ? '' : 'text-[#B90003]'}`}>{price} ГРН</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default ProductCard;
