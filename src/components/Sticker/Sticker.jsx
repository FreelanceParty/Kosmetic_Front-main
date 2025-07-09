import React from "react";
import {Elips, TitleNew, TitleSale} from "./Sticker.styled";

const Sticker = ({text, sale, slider, product}) => {
	return (
		<Elips slider={slider} product={product}>
			{sale ? (
				<TitleSale slider={slider} product={product}>
					{text}
				</TitleSale>
			) : (
				<TitleNew slider={slider} product={product}>
					{text}
				</TitleNew>
			)}
		</Elips>
	);
};

export default Sticker;
