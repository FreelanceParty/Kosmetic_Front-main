import {useEffect, useRef, useState} from "react";

const BrandDescription = ({title, text}) => {
	const contentRef = useRef(null);
	const [maxH, setMaxH] = useState(80);
	const [expanded, setExpanded] = useState(false);

	useEffect(() => {
		const el = contentRef.current;
		if (!el) {
			return;
		}
		if (expanded) {
			setMaxH(el.scrollHeight);
		} else {
			setMaxH(80);
		}
	}, [expanded, title, text]);

	return (
		<div className="relative w-full max-w-3xl">
			<div
				ref={contentRef}
				style={{maxHeight: `${maxH}px`}}
				className={`relative overflow-hidden transition-[max-height] duration-500 ease-in-out`}
			>
				<p className="text-[#000E55]/90 leading-relaxed">
					<span className="font-bold">{title} </span>
					{text}
				</p>

				{!expanded && (
					<div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-white to-transparent pointer-events-none"/>
				)}
			</div>

			<div
				className="underline text-center md:text-right mt-2 cursor-pointer select-none"
				onClick={() => setExpanded(!expanded)}
			>
				{expanded ? "Сховати" : "Читати все"}
			</div>
		</div>
	);
};

export default BrandDescription;
