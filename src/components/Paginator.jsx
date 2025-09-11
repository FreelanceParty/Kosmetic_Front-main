import GoToLastIcon from "./Icons/GoToLastIcon";
import ChevronRightIcon from "./Icons/ChevronRightIcon";
import ChevronLeftIcon from "./Icons/ChevronLeftIcon";
import {useState} from "react";

const Paginator = ({currentPage, totalPages, onChange}) => {
	const [_page, setPage] = useState(currentPage);

	function handleClick(page) {
		if (page < 1 || page > totalPages) return;
		setPage(page);
		onChange?.(page);
	}

	return (
		<>
			<div className="flex cursor-pointer w-fit">
				<div className="flex items-center justify-center h-[33px] w-[33px] hover:bg-gray-200">
					<ChevronLeftIcon onClick={() => handleClick(_page - 1)}/>
				</div>
				{Array.from({length: totalPages}, (_, index) => {
					const page = index + 1;
					const isActive = _page === page;

					return (
						<div
							key={page}
							className={`flex items-center justify-center h-[33px] w-[33px] transition-colors ${isActive ? "bg-[#000E55] text-white" : "hover:bg-gray-200"}`}
							onClick={() => handleClick(page)}
						>
				          <span className="font-medium text-md text-center w-full h-full flex items-center justify-center">
				            {page}
				          </span>
						</div>
					);
				})}
				<div className="flex items-center justify-center h-[33px] w-[33px] hover:bg-gray-200">
					<ChevronRightIcon onClick={() => handleClick(_page + 1)}/>
				</div>
				<div className="flex items-center justify-center h-[33px] w-[33px] hover:bg-gray-200">
					<GoToLastIcon onClick={() => handleClick(totalPages)}/>
				</div>
			</div>
		</>
	)
}

export default Paginator