import {useDispatch} from "react-redux";

import hairCareImage from "../../assets/images/category/hairCare.png";
import serumImage from "../../assets/images/category/serum.png";
import creamImage from "../../assets/images/category/cream.png";
import moisturizingImage from "../../assets/images/category/moisturizing.png";
import mascaraForEyelashesImage from "../../assets/images/category/mascaraForEyelashes.png";
import eyeCreamImage from "../../assets/images/category/eyeCream.png";
import faceMasksImage from "../../assets/images/category/faceMasks.png";
import handCreamImage from "../../assets/images/category/handCream.png";

// import {
//   Container,
//   Item,
//   LinkStyle,
//   List,
//   Name,
//   Title,
//   WrapImg,
// } from "./categoryList.styled";

import {
	CategoriesWrapper,
	CategoriesTitle,
	CategoriesGrid,
	CategoryCard,
	CategoryImage,
	CategoryName,
} from "./categoryList.styled";

import {setFilter} from "../../redux/filter/slice";

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

const categories = [
	{
		image: require("../../assets/images/category/1.png"),
		name:  "Туш для вій",
	},
	{
		image: require("../../assets/images/category/2.png"),
		name:  "Догляд для волосся",
	},
	{
		image: require("../../assets/images/category/3.png"),
		name:  "Крем для обличчя",
	},
	{
		image: require("../../assets/images/category/4.png"),
		name:  "Зволоження",
	},
	{
		image: require("../../assets/images/category/5.png"),
		name:  "Сироватки",
	},
	{
		image: require("../../assets/images/category/6.png"),
		name:  "Маски для обличчя",
	},
	{
		image: require("../../assets/images/category/7.png"),
		name:  "Крем для очей",
	},
	{
		image: require("../../assets/images/category/8.png"),
		name:  "Крем для рук",
	},
];
const CategoryList = () => {
	const dispatch = useDispatch();

	const handleClick = (name) => {
		dispatch(setFilter(name));
		window.scrollTo({
			top:      0,
			behavior: "smooth",
		});
	};
	return (
		// <Container>
		//   <Title>категорії товарів</Title>
		//   <List>
		//     {categoryData.map((item) => (
		//       <Item key={item.id}>
		//         <LinkStyle to={item.to} onClick={() => handleClick(item.text)}>
		//           <WrapImg>
		//             <img src={item.srcImage} alt={item.name} />
		//           </WrapImg>
		//           <Name>{item.name}</Name>
		//         </LinkStyle>
		//       </Item>
		//     ))}
		//   </List>
		// </Container>
		<CategoriesWrapper>
			<CategoriesTitle>Категорії</CategoriesTitle>
			<CategoriesGrid>
				{categories.map((cat, idx) => (
					<CategoryCard key={idx} onClick={() => handleClick(cat.name)}>
						<CategoryImage src={cat.image} alt={cat.name}/>
						<CategoryName>{cat.name}</CategoryName>
					</CategoryCard>
				))}
			</CategoriesGrid>
		</CategoriesWrapper>
	);
};

export default CategoryList;
