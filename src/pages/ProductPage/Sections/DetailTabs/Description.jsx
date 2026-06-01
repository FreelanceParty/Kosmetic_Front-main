const Description = ({product}) => {
	const normalizeText = (value) => {
		let s = String(value ?? "");
		s = s.replace(/\r\n/g, "\n");
		s = s.replace(/\\r\\n/g, "\n");
		s = s.replace(/\\n/g, "\n");
		s = s.replace(/\\r/g, "\n");
		s = s.replace(/\\t/g, "\t");
		s = s.replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
		s = s.replace(/\\x([0-9a-fA-F]{2})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
		s = s.replace(/\\\\/g, "\\");
		return s;
	};
	const text = normalizeText(product?.description);
	return (
		<div className="whitespace-pre-line">
			{text}
		</div>
	);
}

export default Description;
