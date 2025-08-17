import styled from "styled-components";

export const CoopWrapper = styled.section`
	padding-top:     32px;
	justify-content: center;
	align-items:     center;
	gap:             20px;
	display:         flex;
	flex-direction:  column;
	background:      #FFFFFF;
`;
export const CoopTitle = styled.h2`
	color:          ${(p) => p.theme.colors.primary_text};
	font-size:      18px;
	font-weight:    600;
	text-transform: uppercase;
	line-height:    25.2px;
	word-wrap:      break-word;
	text-align:     center;
	padding:        10px;
	border-bottom:  1px solid ${(p) => p.theme.colors.neutural_ligth_gray};
	width:          90%;
`;

export const CoopContent = styled.div`
	/* flex: 1 1 0;
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 20px; */
	width:           100%;
	height:          100%;
	padding-left:    20px;
	padding-right:   20px;
	padding-top:     30px;
	padding-bottom:  30px;
	background:      var(--neutural--ligth-gray, #F6F6F6);
	flex-direction:  column;
	justify-content: center;
	align-items:     center;
	gap:             24px;
	display:         inline-flex;
`;

export const CoopSubtitle = styled.div`
	color:          #000E55;
	font-size:      16px;
	font-weight:    700;
	text-transform: uppercase;
	line-height:    22.4px;
	word-wrap:      break-word;
	text-align:     center;
`;

export const CoopList = styled.ul`
	list-style:     none;
	padding:        0;
	margin:         0 0 16px 0;
	display:        flex;
	flex-direction: column;
	gap:            12px;
`;

export const CoopListItem = styled.li`
	display:         flex;
	align-items:     center;
	gap:             12px;
	justify-content: flex-start;
`;

export const CoopIcon = styled.img`
	width:       10px;
	height:      10px;
	flex-shrink: 0;
`;

export const CoopText = styled.span`
	color:          #000E55;
	font-size:      16px;
	font-weight:    500;
	text-transform: uppercase;
	line-height:    22.4px;
	word-wrap:      break-word;
`;

export const CoopButton = styled.a`
	padding:         20px 30px;
	background:      ${(p) => p.theme.colors.primary_text};
	border-radius:   30px;
	justify-content: center;
	align-items:     center;
	display:         flex;
	color:           ${(p) => p.theme.colors.white};
	font-size:       18px;
	font-weight:     500;
	text-transform:  uppercase;
	line-height:     25.2px;
	word-wrap:       break-word;
	text-decoration: none;
	
	&:hover {
		background: ${(p) => p.theme.colors.button_buy};
	}
`;

export const CoopImageBlock = styled.div`
	flex:                  1 1 0;
	display:               grid;
	grid-template-columns: repeat(2, 1fr);
	gap:                   17px;
	max-width:             600px;
	margin:                0 auto;
	padding:               0 16px;
`;

export const CoopImage = styled.img`
	width:         100%;
	height:        100%;
	object-fit:    cover;
	display:       block;
	border-radius: 3px;
`;
