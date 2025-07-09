import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const Container = styled.div`
  position: relative;
  max-width: 1440px;
  margin-left: auto;
  margin-right: auto;
`;

export const BrandPageContainer = styled.ul`
	margin:     20px 0;
	display:    grid;
	/* gap: 20px; */
	list-style: none;
	padding:    0 20px;
	@media screen and (min-width: 600px) {
		grid-template-columns: repeat(2, 1fr);
	}
	@media screen and (min-width: 768px) {
		grid-template-columns: repeat(3, 1fr);
	}
	@media screen and (min-width: 1024px) {
		grid-template-columns: repeat(3, 1fr);
		padding:               0 40px;
		margin:                60px 0;
	}
	@media screen and (min-width: 1440px) {
		grid-template-columns: repeat(4, 1fr);
	}
`;

export const BrandItem = styled.li`
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 20px;
  padding: 10px 0;

  @media screen and (min-width: 600px) {
    padding: 20px;
    &:nth-child(2n)::after {
      position: absolute;
      bottom: 0;
      right: 50%;

      content: "";
      display: block;
      width: 110%;
      height: 1px;
      background-color: #9a9a9a;
      margin: 10px 0;
    }
    &:last-child:after {
      display: none;
    }
  }

  @media screen and (min-width: 768px) {
    padding: 20px 0;
    &:nth-child(2n)::after {
      display: none;
    }
    &:nth-child(3n)::after {
      position: absolute;
      bottom: 0;
      right: 50%;
      content: "";
      display: block;
      width: 220%;
      height: 1px;
      background-color: #9a9a9a;
      margin: 10px 0;
    }
    &:last-child:after {
      display: none;
    }
  }

  @media screen and (min-width: 1440px) {
    gap: 30px;
    &:nth-child(3n)::after {
      display: none;
    }
    &:nth-child(4n)::after {
      position: absolute;
      bottom: 0;
      right: 50%;
      content: "";
      display: block;
      width: 310%;
      height: 1px;
      background-color: #9a9a9a;
      margin: 10px 0;
    }
    &:last-child:after {
      display: none;
    }
  }
`;

export const Title = styled.h3`
  font-family: "Mulish", sans-serif;
  font-weight: 700;
  font-size: 20px;
  line-height: 1.02312;
  text-transform: uppercase;
  text-align: center;
  color: #ff63b8;
  min-width: 20px;

  @media screen and (min-width: 1024px) {
    min-width: 35px;
    font-size: 40px;
  }
`;

export const BrandCard = styled.div`
  margin-top: 5px;
  @media screen and (min-width: 1024px) {
    margin-top: 20px;
  }
`;

export const BrandName = styled(NavLink)`
  font-family: "Mulish", sans-serif;
  font-weight: 700;
  font-size: 12px;
  line-height: 1.02312;
  text-transform: uppercase;
  text-align: center;
  color: #616161;

  margin: 0;
  display: flex;
  text-align: start;
  text-decoration: none;
  padding: 4px 0;

  &:hover,
  &:focus {
    color: #ff63b8;
  }
  @media screen and (min-width: 1024px) {
    font-size: 14px;
  }
`;
