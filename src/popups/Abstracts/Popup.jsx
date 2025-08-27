import {useEffect} from "react";

export function Popup({isOpen, content, onClose}) {
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
		return () => {
			document.body.style.overflow = "";
		};
	}, [isOpen]);

	if (!isOpen) {
		return null;
	}

	const handleContentClick = (e) => {
		e.stopPropagation();
	};

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 overflow-hidden p-3 md:p-0" onClick={onClose}>
			<div className="bg-white max-w-fit" onClick={handleContentClick}>
				{content}
			</div>
		</div>
	);
}
