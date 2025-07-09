import styled from "styled-components";

export const AboutUsContainer = styled.div`
	max-width:      1440px;
	padding:        20px;
	margin-left:    auto;
	margin-right:   auto;
	font-size:      33px;
	display:        flex;
	flex-direction: column;
`;

export const Title = styled.h2`
	font-family:    "Mulish", sans-serif;
	font-weight:    700;
	font-size:      17px;
	line-height:    1.079;
	text-transform: lowercase;
	text-align:     center;
	color:          #616161;
	/* -webkit-text-stroke: 1px #616161; Обведення тексту */
	/* opacity: 0.61; */
	margin-bottom:  32px;
	@media (min-width: 767px) {
	}
	@media (min-width: 1024px) {
	}
	@media (min-width: 1440px) {
		font-size: 32px;
	}
`;

export const SubTitle = styled.h3`
	font-family:   "Mulish", sans-serif;
	font-weight:   600;
	font-size:     15px;
	line-height:   1.09;
	text-align:    center;
	color:         black;
	margin-bottom: 15px;
	@media (min-width: 767px) {
	}
	@media (min-width: 1024px) {
	}
	@media (min-width: 1440px) {
		/* font-size: 32px; */
	}
`;
export const SubTitleBold = styled.h3`
	font-family:   "Mulish", sans-serif;
	font-weight:   700;
	font-size:     15px;
	line-height:   1.09;
	text-align:    center;
	color:         black;
	margin-bottom: 15px;
	@media (min-width: 767px) {
	}
	@media (min-width: 1024px) {
	}
	@media (min-width: 1440px) {
		/* font-size: 32px; */
	}
`;
export const SubTitleSpan = styled.span`
	font-family: "Mulish", sans-serif;
	font-weight: 600;
	font-size:   15px;
	line-height: 1.09;
	color:       #FF96CF;
	@media (min-width: 767px) {
	}
	@media (min-width: 1024px) {
	}
	@media (min-width: 1440px) {
		/* font-size: 32px; */
	}
`;

export const Text = styled.p`
	font-family:   "Mulish", sans-serif;
	font-weight:   300;
	font-size:     15px;
	line-height:   1.079;
	// text-transform: capitalize;
	text-align:    center;
	color:         #616161;
	margin-bottom: 35px;
	@media (min-width: 767px) {
	}
	@media (min-width: 1024px) {
	}
	@media (min-width: 1440px) {
		/* font-size: 32px; */
	}
`;
export const TextSecond = styled.p`
	font-size:   ${(p) => p.theme.fontSizes.sm}px;
	font-weight: ${(p) => p.theme.fontWeights.title};
	color:       ${(p) => p.theme.colors.black};
	margin:      0px 20px 10px;
`;
export const BenefitsList = styled.ul`
	padding-left: 60px;
	margin:       30px 0;
	list-style:   outside;
`;
export const BenefitsItem = styled.li`
	font-size: ${(p) => p.theme.fontSizes.sm}px;
	color:     ${(p) => p.theme.colors.black};
`;
export const TextItem = styled.p`
	font-size:   ${(p) => p.theme.fontSizes.sm}px;
	font-weight: ${(p) => p.theme.fontWeights.title};
	color:       ${(p) => p.theme.colors.black};
`;

export const TextLink = styled.p`
	font-size:   ${(p) => p.theme.fontSizes.m}px;
	font-weight: ${(p) => p.theme.fontWeights.title};
	color:       ${(p) => p.theme.colors.accentColor};
	margin:      0px 20px 10px;
`;

export const Link = styled.a`
	text-decoration: none;
	color:           ${(p) => p.theme.colors.accentColor};
	
	&:hover {
		color: ${(p) => p.theme.colors.textColor};
	}
`;

export const LinkToSaleProgram = styled.a`
	font-family:     "Mulish", sans-serif;
	font-weight:     700;
	font-size:       12px;
	line-height:     1.09;
	text-align:      center;
	color:           #FFFFFF;
	background:      #FF96CF;
	opacity:         0.8;
	text-decoration: none;
	padding:         7px 20px;
	text-align:      center;
	margin-left:     auto;
	margin-right:    auto;
	border:          0.32px solid #616161;
	border-radius:   30px;
	width:           228px;
	height:          47px;
	margin-bottom:   49px;
	
	&:hover {
		opacity: 1;
	}
	
	@media (min-width: 768px) {
		display: none;
	}
`;

export const OpenOptRegisterWindow = styled.button`
	font-family:     "Mulish", sans-serif;
	font-weight:     900;
	font-size:       17px;
	line-height:     1.09;
	text-align:      center;
	color:           #FFFFFF;
	background:      #FF96CF;
	opacity:         0.8;
	text-decoration: none;
	stroke-width:    0.32px;
	stroke:          #616161;
	text-align:      center;
	margin-left:     auto;
	margin-right:    auto;
	/* margin-bottom: 49px; */
	border:          0.32px solid #616161;
	border-radius:   50%;
	width:           175px;
	height:          175px;
	transition:      all 500ms ease-in-out;
	
	&:hover {
		opacity: 1;
	}
	
	@media (min-width: 1024px) {
		font-size: 22px;
		width:     224px;
		height:    224px;
	}
	@media (min-width: 1240px) {
		font-size: 28px;
		width:     254px;
		height:    254px;
	}
	@media (min-width: 1440px) {
		font-size: 35px;
		width:     294px;
		height:    294px;
	}
`;
//==================benefits=================

export const BenefitsBlockDIV = styled.div`
	display: none;
	@media (min-width: 768px) {
		display: block;
		/* margin-bottom: 23px; */
	}
`;
export const BenefitsSVGContainer = styled.div`
	display:         flex;
	/* flex-wrap: wrap; */
	justify-content: space-between;
	gap:             2px;
	width:           100%;
	@media (max-width: 768px) {
		justify-content: center;
	}
`;

export const BenefitsSVGItemDIV = styled.div`
	display:         flex;
	flex-direction:  column;
	justify-content: center;
	align-items:     center;
	padding:         10px;
	border:          0.8px solid #E2E2E2;
	border-radius:   3px;
	width:           100%;
	max-width:       300px;
	/* height: 366px; */
	margin:          1px;
	@media (min-width: 768px) {
		max-width: 90%;
		height:    auto;
	}
	@media (min-width: 1024px) {
		max-width: 90%;
		height:    auto;
		padding:   20px;
	}
`;

export const BenefitsTextContainer = styled.div`
	display:         flex;
	flex-direction:  column;
	justify-content: center;
	align-items:     center;
	text-align:      center;
	margin:          48px 0;
`;
export const IconWraper = styled.div`
	max-width:     185px;
	margin-bottom: 20px;
	@media (min-width: 768px) {
		max-width:     100px;
		margin-bottom: 15px;
	}
	/* @media (min-width: 480px) {
	  max-width: 120px;
	  margin-bottom: 10px;
	} */
`;

export const BenefitsTextP = styled.p`
	font-family:    "Mulish", sans-serif;
	font-weight:    600;
	font-size:      14px;
	line-height:    1.079;
	letter-spacing: 0.1em;
	text-align:     center;
	color:          #616161;
	@media (min-width: 1024px) {
		font-weight: 600;
		/* font-size: 16px; */
	}
	@media (min-width: 1240px) {
		font-weight: 800;
		font-size:   18px;
	}
	@media (min-width: 1440px) {
		font-size: 18px;
	}
`;

export const ModalBackground = styled.section`
	position:        fixed;
	top:             0;
	left:            0;
	width:           100%;
	height:          100%;
	background:      rgba(0, 0, 0, 0.5);
	display:         flex;
	justify-content: center;
	align-items:     center;
	z-index:         103;
`;

export const ModalContent = styled.div`
	background:    white;
	padding:       30px;
	border-radius: 5px;
	box-shadow:    0 2px 10px rgba(0, 0, 0, 0.2);
	max-width:     90%;
	max-height:    100vh;
	text-align:    center;
	position:      relative;
	overflow-y:    auto;
`;
