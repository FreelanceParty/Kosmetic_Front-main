import React from "react";

import celimax from '../../assets/images/banner/celimax/celimax.png';
import woman from '../../assets/images/banner/celimax/woman.png';
import womanmobile from '../../assets/images/banner/celimax/woman_mobile.png';
import logo from '../../assets/images/banner/celimax/logo.png';
import logomobile from '../../assets/images/banner/celimax/logo_mobile.png';
import productBorder from '../../assets/images/banner/celimax/product_border.svg';
import product1 from '../../assets/images/banner/celimax/product_1.png';
import product1cut from '../../assets/images/banner/celimax/product_1_cut.png';
import product1mobile from '../../assets/images/banner/celimax/product_1_mobile.png';
import product2 from '../../assets/images/banner/celimax/product_2.png';
import product2cut from '../../assets/images/banner/celimax/product_2_cut.png';
import product2mobile from '../../assets/images/banner/celimax/product_2_mobile.png';
import product3 from '../../assets/images/banner/celimax/product_3.png';
import product3cut from '../../assets/images/banner/celimax/product_3_cut.png';
import product3mobile from '../../assets/images/banner/celimax/product_3_mobile.png';
import product4 from '../../assets/images/banner/celimax/product_4.png';
import product4cut from '../../assets/images/banner/celimax/product_4_cut.png';
import product5 from '../../assets/images/banner/celimax/product_5.png';
import product5cut from '../../assets/images/banner/celimax/product_5_cut.png';
import product6 from '../../assets/images/banner/celimax/product_6.png';
import product6cut from '../../assets/images/banner/celimax/product_6_cut.png';
import Button from "../ButtonNew/Button";
import {useNavigate} from "react-router-dom";

const CelimaxBanner = () => {
	const navigate = useNavigate();

	return (
		<div className="overflow-hidden font-stolzl">
			<div
				className="flex flex-col items-center justify-center gap-4 sm:hidden text-[#FFFFFF] relative z-[0] h-[262px] max-h-[262px] w-full"
				style={{
					background: `
				      radial-gradient(70% 100% at 50% 90%,
				        rgba(255,255,255,1) 0%,
				        rgba(255,255,255,0.20) 50%,
				        rgba(255,255,255,0.0) 70%
				      ),
				      #5D6874
				    `,
				}}
			>
				<img
					src={womanmobile}
					alt=""
					className="opacity-[0.9] blur-[1px] absolute w-full h-[262px] max-h-[262px] object-cover scale-[130%] origin-bottom bottom-0 z-[-1]"
				/>
				<div className="flex flex-col items-center justify-center gap-2 w-full h-full max-w-[335px]">
					<div className="self-end font-medium text-[8px] leading-[10px] text-right"><span className="text-xs">7 лінійок</span><br/>доглядових засобів,<br/>дієві компоненти<br/>та якісний
						склад
					</div>
					<div className="relative">
						<img
							src={celimax}
							alt=""
							className="max-h-[91px] overflow-hidden scale-[155%]"
						/>
						<img
							src={logomobile}
							alt=""
							className="absolute bottom-1.5 left-1.5"
							width={31}
							height={12}
						/>
						<img
							src={product1mobile}
							alt=""
							className="absolute -top-[65px] left-[30px]"
							width={105}
							height={233}
						/>
						<img
							src={product3mobile}
							alt=""
							className="absolute -top-[50px] left-[95px]"
							width={98}
							height={165}
						/>
						<img
							src={product2mobile}
							alt=""
							className="absolute -top-[63px] left-[60px]"
							width={113}
							height={211}
						/>

					</div>
					<div className="flex gap-[22px]">
						<div className="font-medium text-sm leading-[16px]">УНІКАЛЬНИЙ<br/>КОРЕЙСЬКИЙ БРЕНД<br/>ДОГЛЯДОВОЇ КОСМЕТИКИ</div>
						<Button
							type="primary"
							text="переглянути продукти"
							classes="!h-[41px] !w-full max-w-[91px] bg-[#57647499] rounded-full opacity-[0.9] border !border-gray-400 "
							textClasses="!text-[9px] !font-medium leading-[9px] "
							onClick={() => navigate('/brands/celimax')}
						/>
					</div>
				</div>
			</div>

			<div
				className="relative hidden sm:flex justify-between text-white relative z-[0] px-[clamp(10px,4vw,120px)] py-[clamp(5px,2vw,55px)]"
				style={{
					background: `
      radial-gradient(70% 100% at 50% 90%,
        rgba(255,255,255,1) 0%,
        rgba(255,255,255,0.20) 50%,
        rgba(255,255,255,0.0) 70%
      ),
      #5D6874
    `,
				}}
			>
				<div className="flex flex-col">
					<img
						src={celimax}
						alt=""
						className="max-h-[130px] md:max-h-[150px] overflow-hidden scale-[110%]"
					/>
					<div className="flex flex-col gap-[18px]">
						<div className="font-medium text-[20px] xl:text-[24px] leading-[22px] xl:leading-[27px] max-w-[355px]">УНІКАЛЬНИЙ КОРЕЙСЬКИЙ <br/>БРЕНД ДОГЛЯДОВОЇ <br/>КОСМЕТИКИ</div>
						<div className="font-normal text-xs xl:text-md leading-[14px] xl:leading-[18px] max-w-[250px]">7 лінійок <br/>доглядових засобів, <br/>дієві компоненти <br/>та якісний склад
						</div>
					</div>
				</div>
				<img className="absolute bottom-0 left-[5%] md:left-[15%] lg:left-[27%] z-[2] w-[470px] xl:w-[611px]" src={woman} height={526} alt={'img'}/>
				<img className="absolute bottom-0 left-[19%] md:left-[26%] lg:left-[36%] xl:left-[37%] 2xl:left-[36%] z-[2]" src={logo} width={84} height={33} alt={'img'}/>
				<div className="flex flex-col gap-4">
					<div className="hidden xl:grid grid-cols-3 gap-[14px]">
						<div className="relative flex justify-center">
							<img src={productBorder} alt="" className="w-[120px] h-[132px] z-[1]"/>
							<img src={product1cut} alt="" className="absolute -top-[20px] left-[30px] z-[1]" width={70} height={123}/>
							<img src={product1} alt="" className="absolute -top-[19px] left-[25px] z-[0]" width={75} height={148}/>
							<div className="absolute bottom-[8px] font-normal text-[8px] leading-[6px] z-[1]">Сироватка з ретинолом</div>
						</div>
						<div className="relative flex justify-center">
							<img src={productBorder} alt="" className="w-[120px] h-[132px] z-[1]"/>
							<img src={product2cut} alt="" className="absolute -top-[19px] left-[14px] z-[1]" width={103} height={122}/>
							<img src={product2} alt="" className="absolute -top-[19px] left-[14px] z-[0]" width={103} height={152}/>
							<div className="absolute bottom-[8px] font-normal text-[8px] leading-[6px] z-[1]">Освітлюючий крем</div>
						</div>
						<div className="relative flex justify-center">
							<img src={productBorder} alt="" className="w-[120px] h-[132px] z-[1]"/>
							<img src={product3cut} alt="" className="absolute top-[2px] left-[10px] z-[1]" width={109} height={105}/>
							<img src={product3} alt="" className="absolute top-[0px] left-[1px] z-[0]" width={118} height={105}/>
							<div className="absolute bottom-[8px] font-normal text-[8px] leading-[6px] z-[1]">Тонер-педи</div>
						</div>
						<div className="relative flex justify-center">
							<img src={productBorder} alt="" className="w-[120px] h-[132px] z-[1]"/>
							<img src={product4cut} alt="" className="absolute -top-[20px] left-[14px] z-[1]" width={102} height={120}/>
							<img src={product4} alt="" className="absolute -top-[19px] left-[15px] z-[0]" width={107} height={152}/>
							<div className="absolute bottom-[8px] font-normal text-[8px] leading-[6px] z-[1]">Сонцезахисний крем</div>
						</div>
						<div className="relative flex justify-center">
							<img src={productBorder} alt="" className="w-[120px] h-[132px] z-[1]"/>
							<img src={product5cut} alt="" className="absolute -top-[18px] left-[3px] z-[1]" width={115} height={120}/>
							<img src={product5} alt="" className="absolute -top-[18px] left-[0px] z-[0]" width={118} height={152}/>
							<div className="absolute bottom-[8px] font-normal text-[8px] leading-[6px] z-[1]">Освітлююча маска</div>
						</div>
						<div className="relative flex justify-center">
							<img src={productBorder} alt="" className="w-[120px] h-[132px] z-[1]"/>
							<img src={product6cut} alt="" className="absolute -top-[24px] left-[12px] z-[1]" width={105} height={131}/>
							<img src={product6} alt="" className="absolute -top-[24px] left-[5px] z-[0]" width={112} height={163}/>
							<div className="absolute bottom-[8px] font-normal text-[8px] leading-[6px] z-[1]">Живильна ампула</div>
						</div>
					</div>


					<div className="xl:hidden grid grid-cols-3 gap-[14px]">
						<div className="relative flex justify-center">
							<img src={productBorder} alt="" className="w-[80px] h-[88px] z-[1]"/>
							<img src={product1cut} alt="" className="absolute -top-[19px] left-[19px] z-[1]" width={50} height={111}/>
							<img src={product1} alt="" className="absolute -top-[19px] left-[15px] z-[0]" width={54} height={111}/>
							<div className="absolute bottom-[4px] font-normal text-[6px] leading-[6px] z-[1]">Сироватка з ретинолом</div>
						</div>
						<div className="relative flex justify-center">
							<img src={productBorder} alt="" className="w-[80px] h-[88px] z-[1]"/>
							<img src={product2cut} alt="" className="absolute -top-[13px] left-[8px] z-[1]" width={68} height={114}/>
							<img src={product2} alt="" className="absolute -top-[13px] left-[8px] z-[0]" width={68} height={114}/>
							<div className="absolute bottom-[4px] font-normal text-[6px] leading-[6px] z-[1]">Освітлюючий крем</div>
						</div>
						<div className="relative flex justify-center">
							<img src={productBorder} alt="" className="w-[80px] h-[88px] z-[1]"/>
							<img src={product3cut} alt="" className="absolute top-[2px] left-[8px] z-[1]" width={72} height={79}/>
							<img src={product3} alt="" className="absolute top-[0px] left-[1px] z-[0]" width={78} height={79}/>
							<div className="absolute bottom-[4px] font-normal text-[6px] leading-[6px] z-[1]">Тонер-педи</div>
						</div>
						<div className="relative flex justify-center">
							<img src={productBorder} alt="" className="w-[80px] h-[88px] z-[1]"/>
							<img src={product4cut} alt="" className="absolute -top-[11px] left-[8px] z-[1]" width={66} height={114}/>
							<img src={product4} alt="" className="absolute -top-[11px] left-[8px] z-[0]" width={70} height={114}/>
							<div className="absolute bottom-[4px] font-normal text-[6px] leading-[6px] z-[1]">Сонцезахисний крем</div>
						</div>
						<div className="relative flex justify-center">
							<img src={productBorder} alt="" className="w-[80px] h-[88px] z-[1]"/>
							<img src={product5cut} alt="" className="absolute -top-[12px] left-[3px] z-[1]" width={76} height={114}/>
							<img src={product5} alt="" className="absolute -top-[12px] left-[1px] z-[0]" width={78} height={114}/>
							<div className="absolute bottom-[4px] font-normal text-[6px] leading-[6px] z-[1]">Освітлююча маска</div>
						</div>
						<div className="relative flex justify-center">
							<img src={productBorder} alt="" className="w-[80px] h-[88px] z-[1]"/>
							<img src={product6cut} alt="" className="absolute -top-[20px] left-[11px] z-[1]" width={72} height={120}/>
							<img src={product6} alt="" className="absolute -top-[20px] left-[7px] z-[0]" width={76} height={120}/>
							<div className="absolute bottom-[4px] font-normal text-[6px] leading-[6px] z-[1]">Живильна ампула</div>
						</div>
					</div>
					<Button
						type="primary"
						text="переглянути продукти"
						classes="!h-[50px] !w-full max-w-[388px] bg-[#57647499] rounded-full z-[3]"
						textClasses="!text-[14px]"
						onClick={() => navigate('/brands/celimax')}
					/>
				</div>
			</div>
		</div>
	);

};

export default CelimaxBanner;