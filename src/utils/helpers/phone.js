import {isValidPhoneNumber} from "libphonenumber-js";

export const isValidPhone = (raw) => {
	const value = String(raw ?? "").trim();
	return /^\+\d+$/.test(value) && isValidPhoneNumber(value);
};
