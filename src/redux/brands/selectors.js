import {createSelector} from "@reduxjs/toolkit";

const selectBrandsState = (state) => state.brands;

export const selectedBrand = createSelector(
	[selectBrandsState],
	(brands) => brands
);

export const selectBrandsItems = createSelector(
	[selectBrandsState],
	(brands) => brands.items
);

export const selectBrandsLoading = createSelector(
	[selectBrandsState],
	(brands) => brands.loading
);

export const selectBrandsError = createSelector(
	[selectBrandsState],
	(brands) => brands.error
);
