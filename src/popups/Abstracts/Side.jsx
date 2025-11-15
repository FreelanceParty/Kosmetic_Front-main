import React, { useEffect, useState } from "react";

export function Side({ headerText, isOpen, content, onClose }) {
	const [shouldRender, setShouldRender] = useState(isOpen);
	const [isTransitioning, setIsTransitioning] = useState(isOpen);

	const TRANSITION_DURATION = 300;

	useEffect(() => {
		if (isOpen) {
			setShouldRender(true);
			document.body.style.overflow = "hidden";

			const openTimeout = setTimeout(() => {
				setIsTransitioning(true);
			}, 10);

			return () => {
				clearTimeout(openTimeout);
				document.body.style.overflow = "";
			};

		} else {
			setIsTransitioning(false);
			document.body.style.overflow = "";

			const closeTimeout = setTimeout(() => {
				setShouldRender(false);
			}, TRANSITION_DURATION);

			return () => {
				clearTimeout(closeTimeout);
				document.body.style.overflow = "";
			};
		}
	}, [isOpen]);

	if (!shouldRender) {
		return null;
	}

	const handleContentClick = (e) => {
		e.stopPropagation();
	};

	const panelClasses = `
        flex flex-col bg-white w-full max-w-[860px] h-[95vh] shadow-2xl 
        rounded-l-[10px] px-6 pb-[14px] 
        transform transition-transform duration-400 ease-in-out
        ${isTransitioning ? 'translate-x-0' : 'translate-x-full'} 
    `;

	const backdropClasses = `
        fixed inset-0 flex items-center justify-end z-50 overflow-hidden
        transition-opacity duration-300 ease-in-out
        ${isTransitioning ? 'bg-black/50 opacity-100' : 'bg-black/0 opacity-0'}
    `;

	return (
		<div
			className={backdropClasses}
			onClick={onClose}
			style={{pointerEvents: isTransitioning ? 'auto' : 'none'}}
		>
			<div
				className={panelClasses}
				onClick={handleContentClick}
			>
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