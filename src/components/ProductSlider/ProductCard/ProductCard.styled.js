import styled from "styled-components";

export const CardWrapper = styled.div`
  width: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;

  box-shadow: 0px 4px 20px -2px rgba(201.55, 201.55, 201.55, 0.25);
  overflow: hidden;
  border-radius: 2px;
  @media screen and (min-width: 768px) {
  }
`;
export const CardImageWrap = styled.div`
	width:      160px;
	height:     160px;
	padding:    30px;
	position:   relative;
	background: ${(p) => p.theme.colors.neutural_ligth_gray};
	overflow:   hidden;
`;
export const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const CardTag = styled.div`
  position: absolute;
  top: 12px;
  right: 0;
  padding: 6px 8px;

  background: ${(p) => p.theme.colors.accentBlue};
  overflow: hidden;
  border-top-left-radius: 9.08px;
  border-bottom-left-radius: 9.08px;
  justify-content: flex-start;
  align-items: center;
  display: flex;

  color: ${(p) => p.theme.colors.primary_text};
  font-size: 10px;
  font-family: Montserrat;
  font-weight: 500;
  text-transform: uppercase;
  line-height: 14px;
`;

export const CardInfo = styled.div`
  padding: 12px 10px;
`;

export const CardBrand = styled.div`
  color: ${(p) => p.theme.colors.primary_text};
  font-size: 12px;
  font-family: Montserrat;
  font-weight: 600;
  text-transform: uppercase;
  line-height: 16.8px;
  word-wrap: break-word;
  margin-bottom: 12px;
`;

export const CardDesc = styled.div`
  color: ${(p) => p.theme.colors.primary_text};
  font-size: 12px;
  font-family: Montserrat;
  font-weight: 400;
  line-height: 16.8px;
  word-wrap: break-word;
  margin-bottom: 16px;
`;

export const CardRatingWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 12px;
`;
export const CardRating = styled.div`
  display: flex;
  align-items: center;
`;
export const CardRatingImg = styled.img`
  padding: 1.7px 1.2px;
`;

export const CardReviews = styled.span`
  color: ${(p) => p.theme.colors.primary_text};
  font-size: 10px;
  font-family: Montserrat;
  font-weight: 400;
  line-height: 14px;
  word-wrap: break-word;
`;
export const CardBuyWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const CardPriceBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: baseline;
  gap: 10px;
  margin-bottom: 12px;
`;

export const CardOldPrice = styled.span`
  color: var(--primary-text, #000e55);
  font-size: 10px;
  font-family: Montserrat;
  font-weight: 400;
  /* text-decoration: line-through; */
  line-height: 14px;
  word-wrap: break-word;
  & span {
    text-decoration: line-through;
  }
`;

export const CardNewPrice = styled.span`
  color: ${(p) =>
    p.sale ? p.theme.colors.accent_red : p.theme.colors.primary_text};
  font-size: 14px;
  font-family: Montserrat;
  font-weight: 700;
  line-height: 19.6px;
  word-wrap: break-word;
`;

export const CardBuyButton = styled.button`
  background: ${(p) => p.theme.colors.button_buy};
  color: #fff;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  font-size: 14px;
  border: none;
  border-radius: 50px;
  width: auto;
  height: fit-content;

  padding: 12px;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: ${(p) => p.theme.colors.button_buy_hover};
  }
`;
export const BuyButtonImg = styled.img`
  width: 20px;
  height: 20px;
`;
export const AmountGreen = styled.span`
  color: ${(p) => p.theme.colors.accent_green};
  font-size: 10px;
  font-family: Montserrat;
  font-weight: 400;
  line-height: 14px;
  word-wrap: break-word;
`;
export const AmountRed = styled.span`
  color: ${(p) => p.theme.colors.accent_red};
  font-size: 10px;
  font-family: Montserrat;
  font-weight: 400;
  line-height: 14px;
  word-wrap: break-word;
`;
