import React from "react";

import retinol from '../../assets/images/banner/bestKorean/retinol.png';
import seoul from '../../assets/images/banner/bestKorean/seoul.png';
import axis from '../../assets/images/banner/bestKorean/axis.png';
import retinolMobile from '../../assets/images/banner/bestKorean/retinol_mobile.png';
import axisMobile from '../../assets/images/banner/bestKorean/axis_mobile.png';

import Button from "../ButtonNew/Button";
import {useNavigate} from "react-router-dom";

const BestKoreanProducts = () => {
	const navigate = useNavigate();

	return (
		<div className="overflow-hidden ">
			<div
				className="flex xs:hidden flex-col text-[#000E67] relative gap-[80px] z-0"
				style={{background: "linear-gradient(261.14deg, #F9F5E7 23.18%, #CEC4B3 109.34%)"}}
			>
				<div className="flex flex-col font-montserrat z-1 gap-[38px] pt-[30px] pl-[25px]">
					<div className="flex flex-col gap-1">
						<div className="flex flex-col gap-1">
							<div className="font-bold text-[15px]">НАЙКРАЩІ КОРЕЙСЬКІ ЗАСОБИ</div>
							<div className="font-semibold text-[15px]">вигідно тільки на</div>
						</div>
						<div className="font-semibold text-[33px] ml-[-2px]">
							<span className="text-[#8F49A3]">BEAUTY</span>
							<span className="text-[#DF4DA0]">BLOSSOM</span>
						</div>
					</div>
					<Button
						type="primary"
						text="детальніше"
						classes="!h-[29px] !w-[179px] bg-[#000E67] rounded-full"
						textClasses="!text-[14px]"
						onClick={() => navigate('/novynky')}
					/>
				</div>
				<div
					className="font-extralight text-[9px] px-[4px] pb-[10px] text-justify z-1"
					style={{textAlignLast: 'justify', textJustify: 'inter-word'}}
				>
					AXIS-Y Celimax Medi Peel Dr.Althea Biodance K-Secret Arencia Enough Farmstay
				</div>

				<img className="z-0 absolute w-[240px] h-[240px] -bottom-[10px] right-[0px]" src={retinolMobile} alt="retinol"/>
				<img className="z-0 absolute w-[230px] h-[230px] -bottom-[20px] -right-[60px]" src={axisMobile} alt="axis"/>
				<img className="z-0 absolute w-[155px] h-[155px] bottom-[3px] right-[13px]" src={seoul} alt="seoulm" style={{transform: "rotate(-4deg)"}}/>
			</div>
			<div
				className="hidden xs:flex flex-col text-[#000E67] relative gap-[clamp(50px,8vw,113px)] z-0"
				style={{background: "linear-gradient(261.14deg, #F9F5E7 23.18%, #CEC4B3 109.34%)"}}
			>
				<div className="flex flex-col font-montserrat z-1 gap-[clamp(30px,4vw,63px)] pt-[clamp(32px,7vw,104px)] pl-[clamp(16px,6.5vw,98px)]">
					<div className="flex flex-col gap-1">
						<div className="flex flex-col gap-1">
							<div className="font-bold text-[clamp(18px,3.2vw,30px)]">НАЙКРАЩІ КОРЕЙСЬКІ ЗАСОБИ</div>
							<div className="font-semibold text-[clamp(10px,2.7vw,24px)]">вигідно тільки на</div>
						</div>
						<div className="flex flex-nowrap gap-0 font-semibold text-[clamp(28px,7vw,66px)] ml-[-2px]">
							<div className="text-[#8F49A3]">BEAUTY</div>
							<div className="text-[#DF4DA0]">BLOSSOM</div>
						</div>
					</div>
					<Button
						type="primary"
						text="детальніше"
						classes="!h-[clamp(29px,7vw,65px)] !w-[clamp(180px,35vw,380px)] bg-[#000E67] rounded-full"
						textClasses="text-[clamp(16px,3.5vw,30px)]"
						onClick={() => navigate('/novynky')}
					/>
				</div>
				<div
					className="font-extralight text-[clamp(10px,2.5vw,32px)] px-[clamp(4px,1.5vw,11px)] pb-[clamp(12px,3vw,27px)] text-justify z-1"
					style={{textAlignLast: 'justify', textJustify: 'inter-word'}}
				>
					AXIS-Y Celimax Medi Peel Dr.Althea Biodance K-Secret Arencia Enough Farmstay
				</div>

				<img className="z-0 absolute w-[clamp(240px,35vw,492px)] h-auto right-[clamp(24px,10vw,188px)]" src={retinol} alt="retinol"/>
				<img className="z-0 absolute w-[clamp(230px,30vw,461px)] h-auto bottom-0 right-0" src={axis} alt="axis"/>
				<img className="z-0 absolute w-[clamp(160px,30vw,448px)] h-auto bottom-0 right-[clamp(24px,8vw,120px)]" src={seoul} alt="seoul"/>
			</div>
		</div>
	);

};

export default BestKoreanProducts;