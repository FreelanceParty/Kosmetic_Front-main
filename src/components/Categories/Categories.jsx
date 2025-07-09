import React from "react";
import {
	CategoriesWrapper,
	CategoriesTitle,
	CategoriesGrid,
	CategoryCard,
	CategoryImage,
	CategoryName,
} from "./Categories.styled";

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

const Categories = () => (
	<CategoriesWrapper>
		<CategoriesTitle>Категорії</CategoriesTitle>
		<CategoriesGrid>
			{categories.map((cat, idx) => (
				<CategoryCard key={idx}>
					<CategoryImage src={cat.image} alt={cat.name}/>
					<CategoryName>{cat.name}</CategoryName>
				</CategoryCard>
			))}
		</CategoriesGrid>
	</CategoriesWrapper>
);

export default Categories;
