import GoToLastIcon from "./Icons/GoToLastIcon";
import ChevronRightIcon from "./Icons/ChevronRightIcon";
import ChevronLeftIcon from "./Icons/ChevronLeftIcon";
import {useState, useEffect} from "react";

const Paginator = ({currentPage = 1, totalPages = 1, onChange}) => {
	const [_page, setPage] = useState(currentPage);

	useEffect(() => {
		setPage(currentPage);
	}, [currentPage]);

	function handleClick(page) {
		if (page === "..." || page < 1 || page > totalPages) {
			return;
		}
		if (page === _page) {
			return;
		}
		setPage(page);
		onChange?.(page);
	}

	function getVisiblePages() {
		const pages = [];

		if (totalPages <= 7) {
			for (let i = 1; i <= totalPages; i++) pages.push(i);
			return pages;
		}

		pages.push(1);

		if (_page <= 4) {
			pages.push(2, 3, 4);
			pages.push("...");
		} else if (_page >= totalPages - 3) {
			pages.push("...");
			for (let i = totalPages - 3; i <= totalPages - 1; i++) pages.push(i);
		} else {
			pages.push("...");
			pages.push(_page - 1, _page, _page + 1);
			pages.push("...");
		}

		pages.push(totalPages);

		const uniq = [];
		for (const p of pages) {
			if (uniq.length === 0 || uniq[uniq.length - 1] !== p) {
				uniq.push(p);
			}
		}

		return uniq;
	}

	const visiblePages = getVisiblePages();

	return (
		<div className="flex cursor-pointer w-fit">
			<div
				className="flex items-center justify-center h-[33px] w-[33px] hover:bg-gray-200"
				onClick={() => handleClick(_page - 1)}
			>
				<ChevronLeftIcon/>
			</div>

			{visiblePages.map((page, idx) => {
				if (page === "...") {
					return (
						<div
							key={`dots-${idx}`}
							className="flex items-center justify-center h-[33px] w-[33px] text-[#000E55]"
						>
							<span>...</span>
						</div>
					);
				}

				const isActive = _page === page;
				return (
					<div
						key={page}
						className={`flex items-center justify-center h-[33px] w-[33px] transition-colors ${
							isActive ? "bg-[#000E55] text-white" : "hover:bg-gray-200"
						}`}
						onClick={() => handleClick(page)}
					>
						<span className="font-medium text-md text-center w-full h-full flex items-center justify-center">
							{page}
						</span>
					</div>
				);
			})}

			<div
				className="flex items-center justify-center h-[33px] w-[33px] hover:bg-gray-200"
				onClick={() => handleClick(_page + 1)}
			>
				<ChevronRightIcon/>
			</div>

			<div
				className="flex items-center justify-center h-[33px] w-[33px] hover:bg-gray-200"
				onClick={() => handleClick(totalPages)}
			>
				<GoToLastIcon/>
			</div>
		</div>
	);
};

export default Paginator;
