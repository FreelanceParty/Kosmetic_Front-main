import styled from "styled-components";
import {Link} from "react-router-dom";

export const WrapBanner = styled.div`
	position: relative;
	overflow: hidden;
`;

export const Banner = styled.img`
	z-index:         -1;
	width:           100%;
	height:          300px;
	object-fit:      cover;
	object-position: center;
	@media screen and (min-width: 768px) {
		width:  100%;
		height: auto;
	}
`;

export const TitleContainer = styled.div`
	position:       absolute;
	left:           43%;
	top:            clamp(30px, 5vw, 50px);
	display:        flex;
	flex-direction: column;
	gap:            clamp(30px, 2vw, 60px);
	@media screen and (min-width: 430px) {
		left: 48%;
	}
	@media screen and (min-width: 768px) {
		top:   15%;
		width: 50%;
		left:  15%;
	}
`;

export const DescWrap = styled.div`
	display:        flex;
	flex-direction: column;
	gap:            clamp(30px, 2vw, 60px);
	@media screen and (min-width: 768px) {
		flex-direction:  row;
		gap:             50px;
		justify-content: center;
		align-items:     center;
	}
`;
export const DescImg = styled.img`
	max-height: 60px;
	@media screen and (min-width: 1024px) {
		max-height: 100px;
	}
`;
export const LinkImg = styled.img`
	max-height: 77px;
	@media screen and (min-width: 1024px) {
		max-height: 170px;
	}
`;

export const LinkBtn = styled(Link)`
	position:   relative;
	transition: all 250ms linear;
	
	&:hover,
	&:focus {
		transform: scale(0.95);
	}
`;
