import styled from "styled-components";

export const CategoriesWrapper = styled.section`
	padding-top:     32px;
	justify-content: center;
	align-items:     center;
	display:         flex;
	flex-direction:  column;
	background:      #FFFFFF;
`;

export const CategoriesTitle = styled.h2`
	color:          ${(p) => p.theme.colors.primary_text};
	font-size:      18px;
	font-weight:    600;
	text-transform: uppercase;
	line-height:    25.2px;
	word-wrap:      break-word;
	text-align:     center;
	padding:        10px;
	border-bottom:  1px solid ${(p) => p.theme.colors.neutural_ligth_gray};
	width:          90%;
`;

export const CategoriesGrid = styled.div`
	display:               grid;
	grid-template-columns: 1fr 1fr;
	gap:                   17px;
	max-width:             375px;
	margin:                0 auto;
	margin-top:            24px;
	padding:               0 20px;
`;

export const CategoryCard = styled.div`
	width:           100%;
	aspect-ratio:    1 / 1;
	background:      #F6F6F6;
	border-radius:   5px;
	overflow:        hidden;
	display:         flex;
	align-items:     center;
	justify-content: center;
	position:        relative;
	transition:      all 300ms linear;
	
	img {
		transition: transform 300ms linear;
	}
	
	img:hover {
		transform: scale(1.1);
	}
`;
export const CategoryImage = styled.img`
	width:      100%;
	height:     100%;
	object-fit: cover;
	display:    block;
`;

export const CategoryName = styled.div`
	position:        absolute;
	/* left: 50%; */
	width:           147px;
	height:          44px;
	bottom:          6px;
	display:         flex;
	justify-content: center;
	align-items:     center;
	background:      white;
	padding:         5px;
	border-radius:   30px;
	color:           ${(p) => p.theme.colors.primary_text};
	font-size:       12px;
	font-weight:     500;
	text-transform:  uppercase;
	line-height:     16.8px;
	word-wrap:       break-word;
	text-align:      center;
	/* pointer-events: none; */
`;
