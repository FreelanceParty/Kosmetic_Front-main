import {useEffect} from "react";

export function Side({headerText, isOpen, content, onClose}) {
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
		<div className="fixed inset-0 flex items-center justify-end bg-black/50 z-50 overflow-hidden" onClick={onClose}>
			<div className="flex flex-col bg-white w-full max-w-[860px] h-[95vh] shadow-2xl animate-slide-in rounded-l-[10px] px-6 pb-[14px]" onClick={handleContentClick}>
				<div className="flex items-center h-[46px] border-b border-[#64759B]">
					<div className="font-bold text-[13px] leading-[9px]">{headerText}</div>
				</div>
				<div className="overflow-y-auto flex-grow pt-6">
					{content}
				</div>
			</div>
		</div>
	);
}
