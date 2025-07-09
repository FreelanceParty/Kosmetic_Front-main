import {createSelector} from "@reduxjs/toolkit";

// Функція для створення унікального ключа за параметрами
const getKey = (params) => JSON.stringify(params);

// Базові селектори
const selectLists = (state) => state.products.lists;
const selectPagination = (state) => state.products.pagination;
const selectLoading = (state) => state.products.loading;
const selectError = (state) => state.products.error;

// Створюємо мемоізовані селектори
export const selectProductsByParams = createSelector(
	[selectLists, (_, params) => getKey(params)],
	(lists, key) => lists[key] || []
);

export const selectPaginationByParams = createSelector(
	[selectPagination, (_, params) => getKey(params)],
	(pagination, key) => pagination[key] || {totalPages: 1, currentPage: 1}
);

export const selectLoadingByParams = createSelector(
	[selectLoading, (_, params) => getKey(params)],
	(loading, key) => loading[key] || false
);

export const selectErrorByParams = createSelector(
	[selectError, (_, params) => getKey(params)],
	(error, key) => error[key] || null
);
