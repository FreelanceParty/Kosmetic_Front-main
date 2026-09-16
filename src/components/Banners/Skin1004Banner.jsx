import React from "react";
import {Link} from "react-router-dom";

import woman1 from '../../assets/images/banner/skin1004/woman_1.png';
import woman2 from '../../assets/images/banner/skin1004/woman_2.png';
import woman3 from '../../assets/images/banner/skin1004/woman_3.png';
import woman4 from '../../assets/images/banner/skin1004/woman_4.png';
import background from '../../assets/images/banner/skin1004/background.png';

const BRAND_ROUTE = "/brands/skin1004";

const Skin1004Banner = () => {
	return (
		<Link to={BRAND_ROUTE} className="block overflow-hidden">
			{/* ===================== MOBILE ===================== */}
			<div
				className="sm:hidden relative w-full aspect-[375/262] overflow-hidden bg-cover bg-center bg-no-repeat"
				style={{backgroundImage: `url(${background})`}}
			>
				{/* logo + texts */}
				<div className="absolute left-[4.5vw] top-[4vw] right-[3vw] z-[3]">
					<div className="font-roboto font-normal tracking-[0.12em] text-[2.4vw] leading-none text-[#E79AA2]">
						SKIN1004
					</div>
					<div className="mt-[1.8vw] font-anton uppercase text-[#EC7080] text-[11.3vw] leading-none whitespace-nowrap">
						CALM. REPAIR. GLOW.
					</div>
					<div className="mt-[3vw] font-roboto font-normal text-[#EC7080] text-[3.6vw] leading-[4.2vw] max-w-[66vw]">
						Цієї осені твоя шкіра потребує особливого догляду!
					</div>
				</div>

				{/* women images — independent absolute positioning (left + width) */}
				<img src={woman1} alt="" className="absolute bottom-0 left-[2%] w-[42%] h-auto object-contain z-[4]"/>
				<img src={woman2} alt="" className="absolute bottom-0 left-[24%] w-[37.5%] h-auto object-contain z-[2]"/>
				<img src={woman3} alt="" className="absolute bottom-0 left-[52%] w-[31%] bottom-[2%] h-auto object-contain z-[3]"/>
				<img src={woman4} alt="" className="absolute bottom-0 left-[52%] w-[43%] h-auto object-contain z-[2]"/>
			</div>

			{/* ===================== DESKTOP ===================== */}
			<div
				className="hidden sm:block relative w-full aspect-[1440/432] overflow-hidden bg-cover bg-center bg-no-repeat"
				style={{backgroundImage: `url(${background})`}}
			>
				{/* left pink block — solid #FAB1B9 (Frame 1171274943) */}
				<div className="absolute inset-y-0 left-0 w-[49.7%] bg-[#FAB1B9] z-[1]"/>
				{/* waves over the pink block via multiply (Frame 1171274946) */}
				<img
					src={background}
					alt=""
					aria-hidden="true"
					className="absolute inset-y-0 left-0 w-[49.7%] h-full object-cover mix-blend-multiply z-[2] pointer-events-none select-none"
				/>

				{/* logo — 25px right of the pink block, 23px from top (scales with the banner) */}
				<div className="absolute left-[calc(49.7%+1.74vw)] top-[1.6vw] z-[5] font-roboto font-normal tracking-[0.02em] text-[1.11vw] leading-none text-[#E79AA2] opacity-[0.66] select-none">
					SKIN1004
				</div>

				{/* text block inside the pink area */}
				<div className="absolute inset-y-0 left-[4.17vw] z-[5] flex flex-col justify-center text-white">
					<div className="font-anton uppercase leading-none">
						{/* three separate blocks — together ~353 x 316 at 1440px */}
						<div className="h-[8.33vw] flex items-center text-[7.92vw]">CALM.</div>
						<div className="h-[8.33vw] flex items-center text-[7.92vw]">REPAIR.</div>
						<div className="h-[8.33vw] flex items-center gap-[1.67vw]">
							<span className="text-[7.92vw]">GLOW.</span>
							{/* second text — aligned in height to the GLOW block */}
							<span className="w-[18.4vw] font-roboto font-normal normal-case tracking-normal text-[1.88vw] leading-[2.01vw]">
								Цієї осені твоя шкіра потребує особливого догляду!
							</span>
						</div>
					</div>
				</div>
				{/* soft ground shadow — Rectangle 9: 744x21 @ 702/370, blur 50 */}
				<div className="absolute left-[48.75%] top-[85.65%] w-[51.67%] h-[4.86%] z-[1] bg-[rgba(205,205,205,0.3)] blur-[50px]"/>

				{/* women images */}
				<img src={woman1} alt="" className="absolute bottom-0 left-[42.1%] w-[26.5%] h-auto object-contain z-[4]"/>
				<img src={woman2} alt="" className="absolute bottom-0 left-[55.7%] w-[23.8%] h-auto object-contain z-[2]"/>
				<img src={woman3} alt="" className="absolute bottom-0 left-[73.4%] w-[19.5%] bottom-[3%] h-auto object-contain z-[3]"/>
				<img src={woman4} alt="" className="absolute bottom-0 left-[73.3%] w-[27%] h-auto object-contain z-[2]"/>
			</div>
		</Link>
	);
};

export default Skin1004Banner;
