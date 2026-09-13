import {useState} from "react";
import {useSearchParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import Button from "../../../components/ButtonNew/Button";
import Input from "../../../components/Input/Input";
import Checkbox from "../../../components/Inputs/Checkbox";
import {
	getActiveCabinet,
	getOwnedCabinets,
	getUserCity,
	getUserLink,
	getUserOnlineShop,
	getUserOfflineShop,
	getUserSocialMedia,
} from "../../../redux/auth/selectors";
import {addCabinet, switchCabinet} from "../../../redux/auth/operation";
import {CABINET_TYPES, getCabinetLabel} from "../../../utils/helpers/cabinets";
import {resolveAuthMessage} from "../../../utils/helpers/authErrors";

const Cabinets = () => {
	const dispatch = useDispatch();
	const ownedCabinets = useSelector(getOwnedCabinets) ?? [];
	const activeCabinet = useSelector(getActiveCabinet);

	// Cabinet details are shared per login, so prefill the form with what the
	// account already has; the user only tops up what is missing.
	const accountForm = {
		city:        useSelector(getUserCity) ?? "",
		link:        useSelector(getUserLink) ?? "",
		onlineShop:  Boolean(useSelector(getUserOnlineShop)),
		offlineShop: Boolean(useSelector(getUserOfflineShop)),
		socialMedia: Boolean(useSelector(getUserSocialMedia)),
	};

	const availableTypes = CABINET_TYPES.filter((type) => !ownedCabinets.includes(type));

	const [searchParams] = useSearchParams();
	// Deep link from the cooperation pages: ?create=<type> pre-opens the form.
	const requestedType = searchParams.get("create");
	const presetType = availableTypes.includes(requestedType) ? requestedType : null;

	const [creating, setCreating] = useState(Boolean(presetType));
	const [selectedType, setSelectedType] = useState(presetType ?? availableTypes[0] ?? null);
	const [formData, setFormData] = useState(accountForm);
	const [cityError, setCityError] = useState(null);

	const needsDetails = selectedType === "opt" || selectedType === "drop";

	const startCreating = () => {
		setSelectedType(availableTypes[0] ?? null);
		setFormData(accountForm);
		setCityError(null);
		setCreating(true);
	};

	const submit = () => {
		if (!selectedType) {
			return;
		}
		// City is mandatory for opt/drop, matching the registration forms.
		if (needsDetails && !formData.city.trim()) {
			setCityError("Вкажіть місто");
			toast.error("Вкажіть місто");
			return;
		}

		const payload = {type: selectedType};
		if (needsDetails) {
			payload.city = formData.city.trim();
			if (formData.link.trim()) payload.link = formData.link.trim();
			if (formData.onlineShop) payload.onlineShop = true;
			if (formData.offlineShop) payload.offlineShop = true;
			if (formData.socialMedia) payload.socialMedia = true;
		}

		dispatch(addCabinet(payload)).then((response) => {
			if (response.type === "auth/addCabinet/fulfilled") {
				toast.info(`Кабінет «${getCabinetLabel(selectedType)}» створено`);
				setCreating(false);
			} else {
				toast.error(resolveAuthMessage(response.payload));
			}
		});
	};

	return (
		<div className="flex flex-col">
			<div className="hidden md:flex flex-col gap-4 mb-6">
				<div className="font-semibold text-lg leading-[13px]">МОЇ КАБІНЕТИ</div>
				<div className="border-t border-[#E8E8E8]"/>
			</div>

			<div className="flex flex-col gap-3 mb-8 max-w-[545px]">
				{ownedCabinets.map((type) => (
					<div
						key={type}
						className="flex items-center justify-between px-4 py-3 rounded-md bg-[#f6f6f6]"
					>
						<span className="font-medium">
							{getCabinetLabel(type)}
							{type === activeCabinet && (
								<span className="ml-2 text-[#E667A4] text-sm">активний</span>
							)}
						</span>
						{type !== activeCabinet && (
							<button
								className="text-sm text-[#E667A4] hover:underline"
								onClick={() => dispatch(switchCabinet(type))}
							>
								Перейти
							</button>
						)}
					</div>
				))}
			</div>

			{availableTypes.length === 0 ? (
				<div className="text-sm text-gray-500">У вас створені всі доступні типи кабінетів.</div>
			) : !creating ? (
				<Button
					type="primary"
					text="СТВОРИТИ КАБІНЕТ ІНШОГО ТИПУ"
					classes="h-[53px] w-full max-w-[409px]"
					onClick={startCreating}
				/>
			) : (
				<div className="flex flex-col gap-5 max-w-[545px]">
					<div className="flex flex-col gap-2">
						<div className="text-sm md:text-md font-semibold">Тип кабінету</div>
						<div className="flex gap-3 flex-wrap">
							{availableTypes.map((type) => (
								<button
									key={type}
									onClick={() => setSelectedType(type)}
									className={`px-4 py-2 rounded-md border ${
										selectedType === type
											? "border-[#E667A4] bg-[#FFE8F5]"
											: "border-[#E8E8E8] bg-[#f6f6f6]"
									}`}
								>
									{getCabinetLabel(type)}
								</button>
							))}
						</div>
					</div>

					{needsDetails && (
						<>
							<div className="flex flex-col gap-2">
								<div className="text-sm md:text-md font-semibold">Місто<span className="text-[#E667A4]">*</span></div>
								<Input
									type="text"
									name="city"
									value={formData.city}
									placeholder="Місто"
									inputClasses="h-[53px] !bg-[#f6f6f6]"
									onChange={(e) => {
										setFormData((prev) => ({...prev, city: e.target.value}));
										if (cityError) setCityError(null);
									}}
									errorMessage={cityError}
								/>
							</div>
							<div className="flex flex-col gap-4">
								<div className="font-semibold text-md">Тип вашого магазину</div>
								<Checkbox
									label="Онлайн магазин"
									defaultChecked={formData.onlineShop}
									onChange={(v) => setFormData((prev) => ({...prev, onlineShop: v}))}
								/>
								<Checkbox
									label="Офлайн магазин"
									defaultChecked={formData.offlineShop}
									onChange={(v) => setFormData((prev) => ({...prev, offlineShop: v}))}
								/>
								<Checkbox
									label="Сторінка у соц. мережах"
									defaultChecked={formData.socialMedia}
									onChange={(v) => setFormData((prev) => ({...prev, socialMedia: v}))}
								/>
							</div>
							<div className="flex flex-col gap-2">
								<div className="font-semibold text-md">Посилання на ваш сайт або сторінку</div>
								<Input
									type="text"
									name="link"
									value={formData.link}
									placeholder="MyShop.com"
									inputClasses="h-[53px] !bg-[#f6f6f6]"
									onChange={(e) => setFormData((prev) => ({...prev, link: e.target.value}))}
								/>
							</div>
						</>
					)}

					<div className="flex gap-3">
						<Button
							type="primary"
							text="СТВОРИТИ"
							classes="h-[53px] w-full max-w-[227px]"
							onClick={submit}
						/>
						<Button
							type="secondary"
							text="СКАСУВАТИ"
							classes="h-[53px] w-full max-w-[227px]"
							onClick={() => setCreating(false)}
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default Cabinets;
