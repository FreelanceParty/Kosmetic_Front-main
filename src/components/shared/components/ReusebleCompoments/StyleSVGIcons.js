import styled from "styled-components";
// import { ReactComponent as userIcon } from "../../../images/newUser.svg";
// import { ReactComponent as corzinaIcon } from "../../../images/newCorzina.svg";
import { IoCartOutline } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";
export const UserIcon = styled(IoPersonOutline)`
  width: 28px;
  height: 28px;
  fill: #616161;
  color: #616161;
  &:hover {
    fill: #ff96cf;
  }
`;
export const CorzinaIcon = styled(IoCartOutline)`
	width:  28px;
	height: 28px;
		/* fill: ${(p) => p.theme.colors.textColor}; */
	color:  #616161;
	/* fill: #616161; */
	
	&:hover {
		fill: ${(p) => p.theme.colors.accentColor};
	}
`;
