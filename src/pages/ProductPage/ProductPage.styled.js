import { Link } from "react-router-dom";
import styled from "styled-components";

// breadcrumbs
export const Breadcrumbs = styled.div`
  margin-top: 20px;
  padding: 0 20px;
  @media screen and (min-width: 1024px) {
    margin-top: 36px;
    padding: 0 60px;
  }
`;

export const UlHistoryList = styled.ul`
	display:   flex;
	flex-wrap: wrap;
	gap:       0 2px;
	
	& span {
		font-family:     "Mulish", sans-serif;
		font-weight:     300;
		font-size:       12px;
		line-height:     1.02312;
		color:           #616161;
		text-decoration: none;
		@media screen and (min-width: 1024px) {
			font-size: 15px;
		}
	}
`;

export const LiHistoryItem = styled.li`
  margin: 0;
  padding: 0;
  font-size: 12px;
  display: flex;
  gap: 2px;
  @media screen and (min-width: 1024px) {
    font-size: 15px;
  }
`;

export const LinkHistoryLink = styled(Link)`
  font-family: "Mulish", sans-serif;
  font-weight: 300;
  font-size: 12px;
  line-height: 1.02312;
  color: #616161;
  text-decoration: none;

  &:hover,
  &:focus {
    color: ${(p) => p.theme.colors.hoverAccentColor};
  }
  @media screen and (min-width: 1024px) {
    font-size: 15px;
  }
`;

export const PHistoryName = styled.p`
  font-family: "Mulish", sans-serif;
  font-weight: 300;
  font-size: 12px;
  line-height: 1.02312;
  color: #616161;
  text-decoration: none;
  @media screen and (min-width: 1024px) {
    font-size: 15px;
  }
`;

export const ProductContainer = styled.div`
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (min-width: 768px) {
    padding: 0 20px;
    margin: 32px 0;
    flex-direction: row;
    align-items: flex-start;
    /* gap: 40px; */
  }
  @media screen and (min-width: 1440px) {
    padding: 0 60px;
  }
`;

// image
export const ImageContainer = styled.div`
  position: relative;
  display: inline-block;
  max-width: fit-content;
  max-height: auto;
  padding: 0 20px;
  @media screen and (min-width: 768px) {
    max-width: inherit;
    flex: 1.3;
    padding: 0;
  }
`;

export const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
`;

export const ProductTags = styled.div`
  display: grid;
  justify-content: space-between;
  position: absolute;
  right: 20px;
  top: 10px;
`;
// info
export const InfoContainer = styled.div`
  @media screen and (min-width: 768px) {
    flex: 2;
    margin-left: 90px;
  }
`;

export const ProductNameWrapper = styled.div`
  display: flex;
  border-bottom: 1px solid #aa9e9e;
  margin-bottom: 20px;
  padding: 0 20px;
  @media screen and (min-width: 768px) {
    padding: 0 0 5px;
    margin: 0;
  }
`;

// title
export const ProductName = styled.h2`
  margin: 10px 0;

  font-family: "Mulish", sans-serif;
  font-weight: 700;
  font-size: 20px;
  line-height: 1.02312;
  text-align: center;
  color: #424242;
  @media screen and (min-width: 768px) {
    margin: 0;
    text-align: start;
  }
  @media screen and (min-width: 1024px) {
    font-size: 35px;
  }
`;

export const ProductFeaturesWrapper = styled.div`
  /* display: flex; */

  display: grid;
  margin: 0 auto;
  gap: 10px;
  padding: 0 20px;

  @media screen and (min-width: 768px) {
    display: flex;
    flex-direction: column-reverse;
    padding: 0;
    gap: 0;
    margin: 20px 0 0;
  }
`;

export const ProductInner = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  @media screen and (min-width: 768px) {
    align-items: flex-start;
    margin-top: 20px;
  }
`;

// price
export const ProductPriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  @media screen and (min-width: 768px) {
    padding-left: 10px;
    margin-bottom: 25px;
  }
`;

export const ProductPriceName = styled.p`
  font-family: "Mulish", sans-serif;
  font-weight: 700;
  font-size: 12px;
  line-height: 1.079;
  letter-spacing: 0.1em;
  color: #424242;
  text-align: center;
  @media screen and (min-width: 768px) {
    text-align: start;
  }
  @media screen and (min-width: 1024px) {
    font-size: 16px;
  }
`;

export const ProductPrice = styled.p`
  font-family: "Mulish", sans-serif;
  font-weight: 900;
  font-size: 36px;
  line-height: 1.079;
  letter-spacing: 0.05em;
  color: #424242;
  /* margin: 10px 0; */
  & span {
    margin-left: 5px;
  }
  @media screen and (min-width: 768px) {
    /* margin: 10px 0 25px; */
    & span {
      margin-left: 7px;
    }
  }
  @media screen and (min-width: 1024px) {
    font-size: 44px;
  }
`;
export const ProductPriceSale = styled.p`
  font-family: "Mulish", sans-serif;
  font-weight: 700;
  font-size: 23px;
  line-height: 1.079;
  letter-spacing: 0.1em;
  color: #b2b2b2;
  text-align: center;
  text-decoration: line-through;
  @media screen and (min-width: 768px) {
    text-align: start;
  }
  @media screen and (min-width: 1024px) {
    font-size: 26px;
  }
`;

export const AboutProductWrapper = styled.div`
  display: none;

  @media screen and (min-width: 768px) {
    justify-content: flex-start;
    display: flex;
    gap: 50px;
    /* border-bottom: 1px solid #aa9e9e; */

    padding: 0 0 20px 10px;
  }
`;
export const AboutProductWrapperMobile = styled.div`
  display: flex;
  justify-content: center;
  margin: 15px 0px;
  gap: 50px;

  @media screen and (min-width: 768px) {
    display: none;
  }
`;

export const AboutProductText = styled.p`
  font-family: "Mulish", sans-serif;
  font-weight: 300;
  font-size: 14px;
  line-height: 1.02312;

  color: #616161;
  &:not(:first-child) {
    margin-top: 5px;
  }
`;

export const ProductBuyWrapper = styled.div`
  display: grid;
  margin: 0 auto;
  gap: 10px;
  padding: 0 20px;

  @media screen and (min-width: 768px) {
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0;
    gap: 15px;
  }
`;

export const CounterBlock = styled.div`
  position: relative;
  width: 140px;
  min-height: 27px;

  display: flex;
  border-radius: 20px;
  border: 1px solid ${(p) => p.theme.colors.textColor};
  align-items: center;

  justify-content: center;
  margin: 0 auto;

  &:hover {
    color: ${(p) => p.theme.colors.accentColor};
  }
  @media screen and (min-width: 768px) {
    margin: 0;
  }
  @media screen and (min-width: 1024px) {
    min-height: 37px;
    max-height: 40px;
    width: 180px;
  }
`;

export const ButtonIncDec = styled.span`
  position: relative;
  display: inline-block;
  vertical-align: top;
  cursor: pointer;

  border: 0;
  padding: 0;
  background: transparent;

  font-family: "Mulish", sans-serif;
  font-weight: 400;
  font-size: 15px;
  line-height: 1.02312;

  color: #616161;
  &:hover {
    color: ${(p) => p.theme.colors.accentColor};
  }
  @media screen and (min-width: 768px) {
    font-size: ${(p) => p.theme.fontSizes.l}px;
  }
`;

export const InputIncDec = styled.input`
  width: 60px;
  text-align: center;

  outline: none;

  border: 0;
  padding: 0;
  background-color: transparent;

  font-family: "Mulish", sans-serif;
  font-weight: 400;
  font-size: 15px;
  line-height: 1.02312;

  color: #616161;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &[type="number"] {
    -moz-appearance: textfield;
  }
  @media screen and (min-width: 768px) {
    font-size: ${(p) => p.theme.fontSizes.m}px;
  }
  @media screen and (min-width: 1024px) {
    font-size: ${(p) => p.theme.fontSizes.l}px;
  }
`;

export const ProductAdminForm = styled.form`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  gap: 10px;
  & div {
    margin: 0;
  }
  @media screen and (min-width: 768px) {
    gap: 20px;
    margin-top: 30px;
  }
`;

// _______________description_________________
export const ProductDescriptionWrap = styled.div`
  display: flex;
  justify-content: center;
  gap: 50px;
  padding: 0 20px;

  @media screen and (min-width: 768px) {
    padding: 20px 0 0;
    /* border-bottom: 1px solid #616161; */
  }
`;
export const ProductDescriptionTitle = styled.h3`
  font-family: "Monserrat", sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 1.079;
  letter-spacing: 0.05em;
  color: #616161;
  padding: 40px 0 20px;
  text-align: center;
  cursor: pointer;
  &:hover,
  &:focus {
    color: ${(p) => p.theme.colors.accentColor};
  }
  &.active {
    color: ${(p) => p.theme.colors.accentColor};
  }
  @media screen and (min-width: 768px) {
    font-family: "Monserrat", sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 1.02312;
    text-transform: lowercase;
    color: #616161;

    padding: 0 30px 10px;
    border-bottom: 2px solid #616161;
    transition: all 250ms linear;

    &.active {
      border-bottom: 2px solid ${(p) => p.theme.colors.accentColor};
    }
    &:hover,
    &:focus {
      border-bottom: 2px solid ${(p) => p.theme.colors.accentColor};
    }
  }
  @media screen and (min-width: 1024px) {
    font-size: 20px;
  }
  @media screen and (min-width: 1440px) {
    padding: 0 70px 10px;
  }
`;

export const ProductDescriptionList = styled.ul`
  padding: 0 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 3px;
  @media screen and (min-width: 768px) {
    margin-top: 30px;
  }
`;
export const ProductDescriptionItem = styled.li`
  & p {
    text-indent: 10px;

    font-family: "Mulish", sans-serif;
    font-weight: 300;
    font-size: 12px;
    line-height: 1.01;

    text-align: justify;
    color: #616161;
    @media screen and (min-width: 768px) {
      font-size: ${(p) => p.theme.fontSizes.sm}px;
    }
  }
`;
// wtf

export const DivAvableProduct = styled.div`
  margin-left: auto;

  @media screen and (min-width: 768px) {
    margin-left: 0;
  }
`;
