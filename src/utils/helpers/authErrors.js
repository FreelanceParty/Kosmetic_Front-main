// Default message shown when the backend error is not marked as custom.
export const DEFAULT_AUTH_ERROR = "Сталась помилка, спробуйте ще раз";

// Extracts field-level validation errors from a rejected thunk payload.
// Backend shape: { message, isValidation: true, isCustom: true, errors: { field: ukMessage } }
export const extractFieldErrors = (payload) => {
	if (payload && typeof payload === "object" && payload.errors) {
		return payload.errors;
	}
	return {};
};

// Resolves the message to show to the user.
// Priority: validation field message -> custom backend message -> generic fallback.
export const resolveAuthMessage = (payload, fallback = DEFAULT_AUTH_ERROR) => {
	if (payload && typeof payload === "object") {
		if (payload.isValidation) {
			const firstFieldMessage = payload.errors ? Object.values(payload.errors)[0] : null;
			return firstFieldMessage || payload.message || fallback;
		}
		if (payload.isCustom && payload.message) {
			return payload.message;
		}
	}
	return fallback;
};
