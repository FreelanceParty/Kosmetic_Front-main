import hairCareImage from "../../assets/images/category/hairCare.png";
import serumImage from "../../assets/images/category/serum.png";
import creamImage from "../../assets/images/category/cream.png";
import moisturizingImage from "../../assets/images/category/moisturizing.png";
import mascaraForEyelashesImage from "../../assets/images/category/mascaraForEyelashes.png";
import eyeCreamImage from "../../assets/images/category/eyeCream.png";
import faceMasksImage from "../../assets/images/category/faceMasks.png";
import handCreamImage from "../../assets/images/category/handCream.png";
import {CATEGORIES} from "../../utils/enums/categories";

import {useNavigate} from "react-router-dom";

const categoryData = [
	{
		id:       "1",
		name:     "догляд для волосся",
		text:     "догляд для волосся",
		srcImage: hairCareImage,
		to:       "/katehoriji/dohliad%20dlia%20volossia",
	},
	{
		id:       "2",
		name:     "сироватки",
		text:     "сироватка",
		srcImage: serumImage,
		to:       "/katehoriji/dohliad%20dlia%20oblychchia/zvolozhennia/syrovatka%20dlia%20oblychchia",
	},
	{
		id:       "3",
		name:     "крема",
		text:     "крем для обличчя",
		srcImage: creamImage,
		to:       "/katehoriji/dohliad%20dlia%20oblychchia/zvolozhennia/krem%20dlia%20oblychchia",
	},
	{
		id:       "4",
		name:     "зволоження",
		text:     "зволоження",
		srcImage: moisturizingImage,
		to:       "/katehoriji/dohliad%20dlia%20oblychchia/zvolozhennia",
	},
	{
		id:       "5",
		name:     "туш для вій",
		text:     "туш",
		srcImage: mascaraForEyelashesImage,
		to:       "/katehoriji/makiiazh/dlia%20ochej/tush",
	},
	{
		id:       "6",
		name:     "крем для очей",
		text:     "крем під очі",
		srcImage: eyeCreamImage,
		to:       "/katehoriji/dohliad%20dlia%20oblychchia/dlia%20shkiry%20pid%20ochyma/krem%20pid%20ochi",
	},
	{
		id:       "7",
		name:     "маски для обличчя",
		text:     "маски для обличчя",
		srcImage: faceMasksImage,
		to:       "/katehoriji/dohliad%20dlia%20oblychchia/masky%20dlia%20oblychchia",
	},
	{
		id:       "8",
		name:     "крем для рук",
		text:     "крем для рук",
		srcImage: handCreamImage,
		to:       "/katehoriji/dohliad%20dlia%20tila/kosmetyka%20dlia%20ruk/krem%20dlia%20ruk",
	},
];

const CategoryList = () => {
	const navigate = useNavigate();

	return (
		<div className="flex flex-col">
			<div className="flex md:hidden font-semibold text-lg leading-[13px] py-[10.5px] justify-center">
				КАТЕГОРІЇ
			</div>
			<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 pt-[23px] md:pt-10 border-t border-[#E8E8E8]">
				{CATEGORIES.map((category, index) => (
					<div key={index} className="flex justify-center relative w-[clamp(159px,20vw,298px)] h-[clamp(173px,25vw,323px)] rounded-[8px] cursor-pointer"
						onClick={() => navigate(category.route)}>
						<img className="rounded-[8px] w-full h-full" src={category.image} alt="category image"/>
						<div
							className="flex items-center justify-center rounded-[27px] bg-white absolute h-[clamp(44px,5vw,50px)] left-[clamp(6px,2vw,30px)] right-[clamp(6px,2vw,30px)] bottom-[clamp(6px,2vw,30px)]">
							<div className="font-medium text-xs uppercase leading-[17px] text-center">{category.name}</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default CategoryList;
