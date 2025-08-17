import styled from "styled-components";

export const Wrap = styled.div`
	display:        flex;
	/* width: 150px; */
	align-items:    center;
	flex-direction: column;
	@media screen and (min-width: 768px) {
		align-items: flex-start;
	}
	@media screen and (min-width: 1024px) {
		width: 180px;
	}
	@media screen and (min-width: 1440px) {
		width: 225px;
	}
`;

export const TitleWrap = styled.div`
	/* margin-bottom: 5px; */
`;
export const Title = styled.h3`
	color:          #616161;
	font-weight:    700;
	font-size:      12px;
	line-height:    1.03;
	text-transform: uppercase;
	margin-bottom:  20px;
		/* font-weight: ${(p) => p.theme.fontWeights.subtitle}; */
	/* font-style: normal; */
	/* letter-spacing: 2.21px;
	letter-spacing: 0.745px; */
	@media screen and (min-width: 768px) {
		font-size: ${(p) => p.theme.fontSizes.s}px;
		/* justify-content: start;
		justify-items: start; */
	}
	@media screen and (min-width: 1024px) {
		font-size: ${(p) => p.theme.fontSizes.l}px;
	}
	@media screen and (min-width: 1440px) {
		font-size: ${(p) => p.theme.fontSizes.xl}px;
	}
`;

export const ContactWraper = styled.div`
	display:        flex;
	flex-direction: column;
	width:          max-content;
`;

export const ContactGroup = styled.div`
	position:        relative;
	break-inside:    avoid;
	transform:       translateZ(0);
	display:         grid;
	justify-content: center;
	justify-items:   center;
	/* margin-top: 28px; */
	@media screen and (min-width: 768px) {
		justify-content: start;
		justify-items:   start;
	}
`;
