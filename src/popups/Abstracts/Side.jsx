import React, {cloneElement, useEffect, useState} from "react";
import EditIcon from "../../components/Icons/EditIcon";
import AcceptIcon from "../../components/Icons/AcceptIcon";
import DeclineIcon from "../../components/Icons/DeclineIcon";
import CloseCrossIcon from "../../components/Icons/CloseCrossIcon";

export function Side({headerText, isOpen, content, onClose}) {
	const [shouldRender, setShouldRender] = useState(isOpen);
	const [isTransitioning, setIsTransitioning] = useState(isOpen);
	const [isEdit, setIsEdit] = useState(false);
	const [onAccept, setAccept] = useState(() => () => {
	});
	const [onDecline, setDecline] = useState(() => () => {
	});

	const TRANSITION_DURATION = 300;

	function handleAccept() {
		onAccept();
		setIsEdit(false);
	}

	function handleDecline() {
		onDecline();
		setIsEdit(false);
	}

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
        flex flex-col bg-white w-full max-w-[860px] h-full sm:h-[95vh] shadow-2xl 
        sm:rounded-l-[10px]
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
				<div className="flex items-center justify-between h-[46px] border-b border-[#64759B] mx-6 max-w-[736px]">
					<div className="font-bold text-[13px] leading-[9px]">{headerText}</div>
					{isEdit ? (
						<div className="flex gap-[10px]">
							<AcceptIcon classes={"cursor-pointer"} onClick={handleAccept}/>
							<DeclineIcon classes={"cursor-pointer"} onClick={handleDecline}/>
						</div>
					) : (
						<div className="flex gap-[10px]">
							<EditIcon classes="h-4 w-4 hover:text-pink-500 cursor-pointer mx-[7px]" onClick={() => setIsEdit(true)}/>
							<CloseCrossIcon classes="cursor-pointer" onClick={onClose}/>
						</div>
					)}
				</div>
				<div className="overflow-y-auto flex-grow pt-6">
					{content && cloneElement(content, {
						isEdit,
						setIsEdit,
						setOnAccept:  setAccept,
						setOnDecline: setDecline,
					})}
				</div>
			</div>
		</div>
	);
}