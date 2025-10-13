import {useState} from "react";

const BrandDescription = ({title, text}) => {
	const [expanded, setExpanded] = useState(false);

	return (
		<div className="relative w-full max-w-3xl">
			<div
				className={`relative transition-all duration-500 ${
					expanded ? "max-h-none" : "max-h-20 overflow-hidden"
				}`}
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
