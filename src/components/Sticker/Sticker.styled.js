import styled, { css } from "styled-components";

export const Elips = styled.div`
  width: 59px;
  height: 59px;
  border-radius: 50%;
  border: 1.5px solid #8a8a8a;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  ${(p) =>
    p.slider &&
    css`
	    width:  37px;
	    height: 37px;
	    @media screen and (min-width: 768px) {
		    width:  59px;
		    height: 59px;
	    }
    `}
  ${(p) =>
    p.product &&
    css`
      width: 70px;
      height: 70px;
      @media screen and (min-width: 450px) and (max-width: 768px) {
        width: 100px;
        height: 100px;
      }
    `}
  @media screen and (min-width: 1440px) {
    width: 80px;
    height: 80px;
    border-radius: 80px;
    border: 2px solid #8a8a8a;
  }
`;

export const TitleSale = styled.p`
  font-weight: 600;
  font-size: 17px;
  line-height: 1.079;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: #ff96cf;
  -webkit-text-stroke-width: 0.4px;
  -webkit-text-stroke-color: #616161;
  ${(p) =>
    p.slider &&
    css`
      font-size: 11px;
      @media screen and (min-width: 768px) {
        font-size: 17px;
      }
    `}
  ${(p) =>
    p.product &&
    css`
      font-size: 22px;
      @media screen and (min-width: 450px) and (max-width: 768px) {
        font-size: 30px;
      }
    `}
  @media screen and (min-width: 1440px) {
    font-size: 24px;
    -webkit-text-stroke-width: 1px;
  }
`;
export const TitleNew = styled.p`
  font-weight: 600;
  font-size: 17px;
  line-height: 1.079;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: #00cc08;
  -webkit-text-stroke-width: 0.4px;
  -webkit-text-stroke-color: #616161;
  ${(p) =>
    p.slider &&
    css`
      font-size: 11px;
      @media screen and (min-width: 768px) {
        font-size: 17px;
      }
    `}
  ${(p) =>
    p.product &&
    css`
      font-size: 22px;
      @media screen and (min-width: 450px) and (max-width: 768px) {
        font-size: 30px;
      }
    `}
  @media screen and (min-width: 1440px) {
    font-size: 24px;
    -webkit-text-stroke-width: 1px;
  }
`;
