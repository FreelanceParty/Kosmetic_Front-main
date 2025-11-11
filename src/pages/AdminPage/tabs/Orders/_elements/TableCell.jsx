import React from "react";

const TableCell = ({title, classes}) => {
	return (
		<div className={`flex items-center pl-[14px] h-[42px] text-[13px] ${classes ?? ''}`}>{title}</div>
	)
}

export default TableCell;