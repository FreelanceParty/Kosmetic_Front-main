import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  max-width: 1440px;
  margin-left: auto;
  margin-right: auto;
`;

export const AdminBlock = styled.div`
  padding: 0 20px;
`;

export const StyledTr = styled.tr`
	border:    1px solid black;
	font-size: 18px;
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
	
	&.yellow-row {
		background-color: white;
	}
	
	&.selected-order {
		background-color: #f7c0eb;
	}
`;

export const FilterInput = styled.input`
  border-radius: 50px;
  margin: 10px;

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

export const Table = styled.table`
  width: 100%;
  border: 1px solid black;
  border-radius: 4px;
`;

export const Th = styled.th`
  border: 1px solid black;

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
export const Td = styled.td`
  border: 1px solid black;
  cursor: pointer;
  text-align: center;
  padding: 8px 0;

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

export const TdStatus = styled.td`
  border: 1px solid black;
  cursor: pointer;
  background-color: ${(props) => props.status === "Новий" && "#008000a8"};
  background-color: ${(props) =>
    props.status === "Прийняте в роботу" && "#20b720a8"};
  background-color: ${(props) => props.status === "Збирається" && "#a0be233b"};
  background-color: ${(props) => props.status === "Зібрано" && "#00e3113b"};
  background-color: ${(props) => props.status === "Відправлено" && "#fef0043b"};
  background-color: ${(props) => props.status === "Відміна" && "#ff000057"};
  color: black;

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
  border: 2px solid black;
  cursor: pointer;
  background: transparent;
  border-radius: 50px;
  padding: 5px 10px;
  margin: 10px;
  &.selected-button {
    background-color: gainsboro;
    font-weight: bold;
    border-radius: 15px;
    padding: 14px 10px;
    margin-top: 10px;
    background-color: #ffe9fa;
  }
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

export const NavigateBlock = styled.div`
  display: flex;
  justify-content: center;
`;

export const FeedBackBlock = styled.div`
  display: flex;
  justify-content: center;
  border: 1px solid black;
`;
