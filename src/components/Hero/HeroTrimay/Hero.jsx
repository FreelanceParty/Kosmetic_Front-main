import {useDispatch} from "react-redux";
import {useMedia} from "../../../utils/hooks/useMedia";

import bannerMob from "../../../assets/images/hero/new-mobile-banner.png";
import bannerDesk from "../../../assets/images/hero/desk-banner.png";
import iconName from "../../../assets/icon/hero/name.svg";
import iconDesk from "../../../assets/icon/hero/desc.svg";
import iconBtn from "../../../assets/icon/hero/btn.svg";

import {
	Banner,
	DescImg,
	DescWrap,
	LinkBtn,
	LinkImg,
	TitleContainer,
	WrapBanner,
} from "./Hero.styled";

const Hero = () => {
	const {isMobileScreen} = useMedia();
	const dispatch = useDispatch();

	const handleClick = (e) => {
		const name = e.currentTarget.name;
		// dispatch()
	};
	return (
		<WrapBanner>
			<Banner src={isMobileScreen ? bannerMob : bannerDesk} alt="banner"/>

			<TitleContainer>
				<img id="name" src={iconName} alt="Trimay"/>
				<DescWrap>
					<DescImg id="desc" src={iconDesk} alt="Trimay"/>

					<LinkBtn to="/brands/trimay" name="trimay" onClick={handleClick}>
						<LinkImg id="link" src={iconBtn} alt="перейти до покупок"/>
					</LinkBtn>
				</DescWrap>
			</TitleContainer>
		</WrapBanner>
	);
};

export default Hero;
