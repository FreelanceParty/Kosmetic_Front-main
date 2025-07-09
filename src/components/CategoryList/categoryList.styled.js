import styled from "styled-components";
import {Link} from "react-router-dom";

export const Container = styled.div`
	padding:   0 20px;
	max-width: 1440px;
	margin:    20px auto;
`;

export const Title = styled.h3`
	font-family: "Mulish", sans-serif;
	font-weight: 700;
	font-size:   14px;
	line-height: 1.09;
	text-align:  center;
	color:       #616161;
	margin-top:  20px;
	@media screen and (min-width: 768px) {
		font-size: 24px;
	}
	@media screen and (min-width: 1440px) {
		font-family: "Mulish", sans-serif;
		font-weight: 700;
		font-size:   28px;
		line-height: 1.09;
		text-align:  center;
		color:       #616161;
		margin-top:  40px;
	}
`;

export const List = styled.ul`
	display:         flex;
	flex-wrap:       wrap;
	gap:             20px;
	justify-content: center;
	margin-top:      20px;
	@media screen and (min-width: 1024px) {
		gap: 25px;
	}
	@media screen and (min-width: 1440px) {
		gap:        25px;
		margin-top: 30px;
	}
`;

export const Item = styled.li`
	position: relative;
`;

export const LinkStyle = styled(Link)`
	color: #616161;
	
	&:hover,
	&:focus {
		color: #FF96CF;
	}
`;

export const WrapImg = styled.div`
	overflow: hidden;
	width:    150px;
	height:   160px;
	@media screen and (min-width: 768px) {
		width:  160px;
		height: 170px;
	}
	@media screen and (min-width: 940px) {
		width:  210px;
		height: 220px;
	}
	@media (min-width: 1180px) {
		width:  260px;
		height: 270px;
	}
	@media (min-width: 1440px) {
		width:  320px;
		height: 330px;
	}
	
	& img {
		-moz-transition:    all 250ms ease-out;
		-o-transition:      all 250ms ease-out;
		-webkit-transition: all 250ms ease-out;
	}
	
	& img:hover {
		-webkit-transform: scale(1.1);
		-moz-transform:    scale(1.1);
		-o-transform:      scale(1.1);
	}
`;

export const Name = styled.p`
	position:       absolute;
	bottom:         10px;
	left:           50%;
	transform:      translateX(-50%);
	width:          120px;
	padding:        8px;
	background:     #FFFFFF;
	border-radius:  20px;
	font-family:    "Mulish", sans-serif;
	font-weight:    700;
	font-size:      9px;
	line-height:    1.079;
	text-transform: lowercase;
	text-align:     center;
	@media screen and (min-width: 1024px) {
		font-size:     15px;
		width:         180px;
		bottom:        20px;
		left:          50%;
		transform:     translateX(-50%);
		padding:       15px;
		background:    #FFFFFF;
		border-radius: 30px;
	}
	@media screen and (min-width: 1440px) {
		font-size:     18px;
		width:         250px;
		bottom:        30px;
		left:          50%;
		transform:     translateX(-50%);
		padding:       20px;
		background:    #FFFFFF;
		border-radius: 60px;
	}
`;
// _______________________v2____________________

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
	font-family:    Montserrat;
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
	font-family:     Montserrat;
	font-weight:     500;
	text-transform:  uppercase;
	line-height:     16.8px;
	word-wrap:       break-word;
	text-align:      center;
	/* pointer-events: none; */
`;
