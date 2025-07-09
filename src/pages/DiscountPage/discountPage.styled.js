import styled from "styled-components";

export const Container = styled.div`
	padding:         6px;
	/* width: 100vw; */
	min-width:       320px;
	max-width:       768px;
	display:         flex;
	justify-content: center;
	@media screen and (min-width: 768px) {
		min-width: 700px;
		max-width: 1024px;
	}
	@media screen and (min-width: 1024px) {
		min-width: 950px;
		max-width: 1440px;
	}
`;
