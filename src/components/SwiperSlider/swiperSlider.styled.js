import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  max-width: 1440px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 20px;
`;
export const TitleLine = styled.div`
	display: none;
	@media screen and (min-width: 1310px) {
		display:    inline-block;
		width:      100%;
		height:     1px;
		background: #aa9e9e;
		margin-top: 70px;
	}
`;

export const SwiperList = styled.div`
  margin-left: 40px;
`;
export const Title = styled.h2`
  font-weight: 700;
  font-size: 28px;
  line-height: 1.09;
  text-align: center;
  color: #616161;
  margin-top: 40px;
`;

export const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
  margin-top: 30px;
  justify-content: center;
`;

export const ButtonWrap = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: space-between;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  right: 0;
  padding: 0 40px;
`;
export const Button = styled.button`
  background-color: transparent;
  border: none;
  cursor: ${(p) => (p.disabled ? "not-allowed" : "pointer")};
  padding: 10px0;

  svg {
    width: 22px;
    height: 21px;
    filter: grayscale(1);
    transition: filter 0.3s;

    @media screen and (min-width: 768px) {
      width: 30px;
      height: 30px;
    }

    .icon-disabled {
      filter: grayscale(1);
      cursor: not-allowed;
    }

    &:hover {
      filter: grayscale(0);
      fill: ${(p) =>
        p.disabled ? "#1010104d" : p.theme.colors.hoverAccentColor};
    }
  }
`;
