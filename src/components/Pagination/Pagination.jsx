import React from "react";
import ReactPaginate from "react-paginate";
import {AiOutlineLeft, AiOutlineRight} from "react-icons/ai";

const Pagination = ({totalPages, currentPage, onPageChange}) => (
	<ReactPaginate
		previousLabel={<AiOutlineLeft/>}
		nextLabel={<AiOutlineRight/>}
		pageCount={totalPages}
		forcePage={currentPage - 1}
		onPageChange={onPageChange}
		containerClassName="Pagination"
		activeClassName="Pagination__active"
		pageClassName="Pagination__page"
		pageLinkClassName="Pagination__page-link"
		previousLinkClassName="Pagination__prev-link"
		nextLinkClassName="Pagination__next-link"
		breakLabel="..."
		breakClassName="Pagination__break"
	/>
);

export default Pagination;
