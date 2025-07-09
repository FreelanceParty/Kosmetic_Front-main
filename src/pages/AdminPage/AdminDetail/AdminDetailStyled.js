import styled from "styled-components";

export const ProductBlock = styled.td`
	display: flex;
	border:  none;
	@media (max-width: 767px) {
		font-size: 12px;
	}
	@media (min-width: 768px) and (max-width: 1023px) {
		font-size: 14px;
	}
	@media (min-width: 1024px) and (max-width: 1439px) {
		font-size: 16px;
	}
	@media (min-width: 1440px) {
		font-size: 18px;
	}
`;
export const ProductImage = styled.img`
  max-width: 80px;
  width: 100%;
  height: 100%;
  @media (max-width: 767px) {
    max-width: 20px;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    max-width: 40px;
  }
  @media (min-width: 1024px) and (max-width: 1439px) {
    max-width: 60px;
  }
  @media (min-width: 1440px) {
    max-width: 80px;
  }
`;

export const InfoBlock = styled.div`
  /* display: flex; */
`;

export const Table = styled.table`
  border: 1px solid grey;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: flex-start;
  justify-content: flex-end;
`;

export const TableItems = styled.td`
  border: 1px solid grey;
  
  @media (max-width: 767px) {
    font-size: 12px;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    font-size: 14px;
  }
  @media (min-width: 1024px) and (max-width: 1439px) {
    font-size: 16px;
  }
  @media (min-width: 1440px) {
    font-size: 18px;
  }
`;
export const TableTrBlock = styled.tr`
  border: 1px solid grey;
  height: 50px;
  @media (max-width: 767px) {
    font-size: 12px;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    font-size: 14px;
  }
  @media (min-width: 1024px) and (max-width: 1439px) {
    font-size: 16px;
  }
  @media (min-width: 1440px) {
    font-size: 18px;
  }
`;

export const Button = styled.button`
  font-weight: bold;
  border-radius: 15px;
  padding: 14px 10px;
  margin-top: 10px;
  background-color: #ffe9fa;
`;
export const ButtonCancel = styled.button`
  font-weight: bold;
  border-radius: 15px;
  padding: 14px 10px;
  margin-top: 10px;
  background-color: #ffe9e9;
`;

export const LilistItem = styled.li`
  padding: 4px 0;
`;
