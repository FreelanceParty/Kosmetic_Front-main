import React, {useEffect, useState} from "react";
import RightArrowAltIcon from "../../../../../components/Icons/RightArrowAltIcon";
import SearchIcon from "../../../../../components/Icons/SearchIcon";
import ChevronIcon from "../../../../../components/Icons/ChevronIcon";
import StatusOptions from "./StatusOptions";
import FilterIcon from "../../../../../components/Icons/FilterIcon";
import CloseCrossIcon from "../../../../../components/Icons/CloseCrossIcon";
import Filter from "../../../../../components/Category/_elements/Filter";
import {statusFilters} from "../../../../../utils/helpers/filter"
import DateFilter from "../../../../../components/Category/_elements/DateFilter";
import Button from "../../../../../components/ButtonNew/Button";

const Filters = ({statusFilter, setStatusFilter, isStatusFilterOpen, setStatusFilterOpen, dateFromFilter, setDateFromFilter, dateToFilter, setDateToFilter, setSearchText}) => {
	const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
	const [dateFromMobileFilter, setDateFromMobileFilter] = useState(dateFromFilter);
	const [dateToMobileFilter, setDateToMobileFilter] = useState(dateToFilter);

	const handleSubmit = () => {
		setIsMobileFiltersOpen(false);
		setDateFromFilter(dateFromMobileFilter);
		setDateToFilter(dateToMobileFilter);
	}
	// todo: status for mobile
	useEffect(() => {
		setDateFromMobileFilter(dateFromFilter);
		setDateToMobileFilter(dateToFilter);
	}, [dateFromFilter, dateToFilter]);

	return (
		<div className="flex justify-center items-center gap-4 md:gap-5 mx-auto w-full">
			<div className="relative hidden md:flex justify-between items-center h-9 w-[180px] px-[10px] border rounded-xl cursor-pointer"
				onClick={() => setStatusFilterOpen(!isStatusFilterOpen)}
			>
				<div className={`font-medium text-[13px] leading-[16px] ${!statusFilter && 'opacity-50'}`}>
					{statusFilter ?? 'Статус'}
				</div>
				<ChevronIcon/>
				{isStatusFilterOpen && (
					<StatusOptions setStatus={setStatusFilter} selected={statusFilter} classes="top-[105%]"/>
				)}
			</div>
			<div className="hidden md:flex gap-3 items-center">
				<input
					id="date-from-input"
					type="date"
					onChange={(e) => setDateFromFilter(e.target.value)}
					value={dateFromFilter}
					className="p-2 border border-gray-300 rounded h-9 w-[118px]"
				/>
				<RightArrowAltIcon/>
				<input
					id="date-to-input"
					type="date"
					onChange={(e) => setDateToFilter(e.target.value)}
					value={dateToFilter}
					className="p-2 border border-gray-300 rounded h-9 w-[118px]"
				/>
			</div>
			<div className="relative w-full md:w-[221px]">
				<input
					type="text"
					placeholder="Ім'я чи номер замовлення"
					onChange={(e) => setSearchText(e.target.value)}
					onBlur={(e) => setSearchText(e.target.value)}
					className="!h-9 w-full bg-white rounded-xl font-medium text-[13px] leading-[16px] border pl-8"
				/>
				<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
					<SearchIcon classes="w-3 h-3"/>
				</div>
			</div>
			<div className="flex md:hidden p-2">
				<FilterIcon classes="cursor-pointer h-[18px] w-[18px]" onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}/>
				{isMobileFiltersOpen && (
					<div className="absolute flex flex-col justify-between bg-white top-7 left-0 w-full h-[97vh] z-20">
						<div className="flex flex-col gap-4 px-5 pt-5">
							<div className="flex justify-between">
								<div className="font-semibold text-sm leading-[10px]">ФІЛЬТРИ</div>
								<CloseCrossIcon classes="h-[13px] w-[13px] cursor-pointer" onClick={() => setIsMobileFiltersOpen(false)}/>
							</div>
							<div className="flex flex-col">
								<Filter title="СТАТУС" options={statusFilters}/>
								<DateFilter
									dateFromFilter={dateFromMobileFilter}
									setDateFromFilter={setDateFromMobileFilter}
									dateToFilter={dateToMobileFilter}
									setDateToFilter={setDateToMobileFilter}
								/>
							</div>
						</div>
						<div className="w-full px-5 py-4 border-t">
							<Button
								type="primary"
								text="ЗАСТОСУВАТИ"
								classes="!h-[43px] w-full"
								onClick={handleSubmit}
							/>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
export default Filters;