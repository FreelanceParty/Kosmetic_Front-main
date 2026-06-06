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
		<div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 overflow-y-auto overflow-x-hidden p-3 md:p-6" onClick={onClose}>
			<div className="bg-white max-w-fit max-h-[calc(100vh-24px)] md:max-h-[calc(100vh-48px)] overflow-y-auto" onClick={handleContentClick}>
				{content}
			</div>
		</div>
	);
}
