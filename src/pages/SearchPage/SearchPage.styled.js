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

export const List = styled.ul`
	display:               grid;
	grid-template-columns: repeat(1, minmax(250px, 1fr));
	gap:                   20px;
	text-align:            center;
	justify-content:       center;
	justify-items:         center;
	@media screen and (min-width: 600px) {
		grid-template-columns: repeat(2, minmax(150px, 1fr));
	}
	@media screen and (min-width: 768px) {
		grid-template-columns: repeat(3, minmax(150px, 1fr));
	}
	@media screen and (min-width: 1024px) {
		gap:                   25px;
		grid-template-columns: repeat(3, minmax(150px, 1fr));
	}
	@media screen and (min-width: 1440px) {
		justify-content:       flex-start;
		grid-template-columns: repeat(4, minmax(150px, 1fr));
	}
`;
