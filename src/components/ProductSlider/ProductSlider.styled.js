import styled from "styled-components";

export const Wrapper = styled.section`
  padding-top: 32px;

  justify-content: center;
  align-items: center;
  gap: 32px;
  display: flex;
  flex-direction: column;
  background: #ffffff;
`;

export const Title = styled.h2`
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

export const SliderRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 17px;
`;

export const AllProductsButton = styled.a`
  padding: 20px 30px;

  background: ${(p) => p.theme.colors.primary_text};
  border-radius: 30px;
  justify-content: center;
  align-items: center;
  display: flex;

  color: ${(p) => p.theme.colors.white};
  font-size: 18px;
  font-family: Montserrat;
  font-weight: 500;
  text-transform: uppercase;
  line-height: 25.2px;
  word-wrap: break-word;
  text-decoration: none;
  &:hover {
    background: ${(p) => p.theme.colors.button_buy};
  }
`;
