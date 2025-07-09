import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;
export const Message = styled.p`
  font-size: 24px;
  margin-bottom: 20px;
`;
export const StyleLink = styled(Link)`
	color:           ${(p) => p.theme.colors.textColor};
	text-decoration: none;
	
	&:hover,
	&:focus {
		color: ${(p) => p.theme.colors.accentColor};
	}
`;
