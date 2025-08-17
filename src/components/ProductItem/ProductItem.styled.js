import styled, { css } from "styled-components";

import { Link } from "react-router-dom";

export const ItemStyle = styled.li`
	position:   relative;
	min-width:  140px;
	max-width:  260px;
	padding:    5px 15px 15px;
	border:     1px solid ${(p) => p.theme.colors.borderCard};
	transition: all 250ms linear;
	list-style: none;
	
	&:hover,
	&:focus {
		box-shadow: 0 7px 15px rgba(59, 55, 43, 0.25);
	}
	
	&.unavailable {
		opacity: 0.5;
	}
	
	@media screen and (min-width: 768px) {
		max-width: 220px;
		padding:   5px 15px 15px;
	}
	@media screen and (min-width: 1024px) {
		max-width: 300px;
	}
	@media screen and (min-width: 1440px) {
		max-width: 320px;
		padding:   5px 25px 25px;
	}
`;

// export const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: space-around;
//   transition: transform 0.2s;
//   position: relative;
//   height: 100%;
//   border-radius: 0;
//   /* border: 1px solid ${(p) => p.theme.colors.borderCard}; */
//   background: ${(p) => p.theme.colors.white};
//   &:hover {
//     transform: translateY(-4px);

//     .buy-button {
//       visibility: visible;
//     }
//   }
// `;

export const LinkStyle = styled(Link)`
  text-decoration: none;
  color: ${(p) => p.theme.colors.textColor};
  display: flex;
  flex-direction: column;
  align-items: start;
`;

export const ProductTags = styled.div`
  display: grid;
  justify-content: space-between;
  position: absolute;
  top: 10px;
  right: 15px;
`;

export const ImageWrap = styled.div`
  position: relative;
  width: fit-content;
  height: 220px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  ${(p) =>
    p.slider === true &&
    css`
      height: 130px;
    `}
  @media screen and (min-width: 768px) {
    height: 250px;
  }
  @media screen and (min-width: 1024px) {
    height: 280px;
  }
`;

export const Image = styled.img`
  max-height: 100%;
  max-width: 100%;
  height: auto;
  width: auto;
`;

export const Content = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 10px;
  @media screen and (min-width: 768px) {
    gap: 20px;
  }
  @media screen and (min-width: 1024px) {
    margin-top: 20px;
  }
`;
export const BrandName = styled.p`
  font-weight: 700;
  font-size: 10px;
  line-height: 1.079;
  letter-spacing: 0.1em;
  color: #000;

  ${(p) =>
    p.slider &&
    css`
      font-size: 6px;
      @media screen and (min-width: 768px) {
        font-size: 10px;
      }
    `}

  @media screen and (min-width: 1024px) {
    font-size: ${(p) => p.theme.fontSizes.sm}px;
  }
`;

export const Name = styled.p`
  font-weight: 400;
  font-size: 10px;
  line-height: 1.079;
  letter-spacing: 0.1em;
  color: #616161;
  text-align: start;

  ${(p) =>
    p.slider &&
    css`
      font-size: 6px;
      overflow: hidden;
      text-overflow: ellipsis;
      height: 4.5em;
      @media screen and (min-width: 768px) {
        font-size: 10px;
      }
    `}

  @media screen and (min-width: 600px) {
    overflow: hidden;
    text-overflow: ellipsis;
    height: 4.5em;
  }
  @media screen and (min-width: 1024px) {
    font-size: ${(p) => p.theme.fontSizes.s}px;
  }
`;

export const PriceWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: start;
`;

export const PriceName = styled.p`
  font-weight: 700;
  font-size: 10px;
  line-height: 1.079;
  letter-spacing: 0.05em;
  text-align: start;
  color: #616161;
  /* margin-top: 8px; */

  ${(p) =>
    p.slider &&
    css`
      font-size: 6px;
      @media screen and (min-width: 768px) {
        font-size: 10px;
      }
    `}
  @media screen and (min-width: 1024px) {
    font-size: ${(p) => p.theme.fontSizes.s}px;
  }
`;

export const Available = styled.p`
  font-weight: 400;
  font-size: 10px;
  line-height: 1.09;
  text-align: start;
  color: #008205;
  margin-top: 3px;
  ${(p) =>
    p.slider &&
    css`
      font-size: 6px;
      @media screen and (min-width: 768px) {
        font-size: 10px;
      }
    `}
  @media screen and (min-width: 1024px) {
    font-size: ${(p) => p.theme.fontSizes.s}px;
    margin-top: 8px;
  }
`;

export const Price = styled.p`
  font-weight: 900;
  font-size: ${(p) => p.theme.fontSizes.sm}px;
  line-height: 1.079;
  letter-spacing: 0.05em;
  color: #616161;
  & span {
    margin-left: 3px;
  }
  ${(p) =>
    p.slider &&
    css`
      font-size: 11px;
      @media screen and (min-width: 768px) {
        font-size: 16px;
      }
    `}

  @media screen and (min-width: 1024px) {
    font-size: ${(p) => p.theme.fontSizes.xl}px;
    & span {
      margin-left: 5px;
    }
  }
`;
export const PriceSale = styled.p`
  font-weight: 700;
  font-size: 8px;
  line-height: 1.079;
  letter-spacing: 0.1em;
  color: #b2b2b2;

  text-decoration: line-through;
  text-decoration-color: #7f7f7f;
  text-align: end;

  ${(p) =>
    p.slider &&
    css`
      font-size: 8px;
      @media screen and (min-width: 768px) {
        font-size: 12px;
      }
    `}
  @media screen and (min-width: 768px) {
    font-size: 12px;
  }
  @media screen and (min-width: 1024px) {
    font-size: 19px;
  }
`;

export const ButtonWrap = styled.div`
  margin: 10px auto 0;
  @media screen and (min-width: 1024px) {
    margin: 20px auto 0;
  }
`;
export const ButtonIncDec = styled.span`
  position: relative;
  display: inline-block;
  vertical-align: top;
  cursor: pointer;
  color: ${(p) => p.theme.colors.textColor};
  border: 0;
  padding: 0;
  background: transparent;
  font-size: ${(p) => p.theme.fontSizes.m}px;
  &:hover {
    color: ${(p) => p.theme.colors.accentColor};
  }
  @media screen and (min-width: 768px) {
    font-size: ${(p) => p.theme.fontSizes.l}px;
  }
`;

export const CounterBlock = styled.div`
  position: relative;
  width: 75px;
  height: 30px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 4px;
  border: 1px solid ${(p) => p.theme.colors.textColor};
  align-items: center;
  font-size: ${(p) => p.theme.fontSizes.s}px;
  margin-bottom: 10px;
  &:hover {
    color: ${(p) => p.theme.colors.accentColor};
    cursor: pointer;
  }
  @media screen and (min-width: 768px) {
    font-size: ${(p) => p.theme.fontSizes.m}px;
    width: 85px;
  }
`;
export const InputIncDec = styled.input`
  text-align: center;
  outline: none;
  color: ${(p) => p.theme.colors.textColor};
  border: 0;
  padding: 0;
  background-color: transparent;
  font-size: ${(p) => p.theme.fontSizes.xs}px;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type="number"] {
    -moz-appearance: textfield;
  }
  @media screen and (min-width: 768px) {
    font-size: ${(p) => p.theme.fontSizes.s}px;
  }
`;
