import {useCallback, useEffect, useMemo, useState} from "react";
import {toast} from "react-toastify";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const emptyForm = {
	name:        "",
	logo:        "",
	title:       "",
	description: "",
};

const requiredFields = [
	["name", "Назва"],
	["logo", "Логотип (посилання)"],
	["title", "Заголовок"],
	["description", "Опис"],
];

const inputClass =
	      "bg-[#F8F8F8] border border-[#E8E8E8] rounded-2xl px-4 py-3 outline-none focus:border-[#000E55] w-full";

const Field = ({label, name, value, onChange, textarea = false}) => (
	<label className="flex flex-col gap-2">
		<span className="text-sm font-medium text-[#111827]">{label}</span>
		{textarea ? (
			<textarea name={name} value={value} onChange={onChange} className={`${inputClass} min-h-[120px] resize-y`}/>
		) : (
			<input type="text" name={name} value={value} onChange={onChange} className={inputClass}/>
		)}
	</label>
);

const Brands = () => {
	const [brands, setBrands] = useState([]);
	const [loadingList, setLoadingList] = useState(false);
	const [query, setQuery] = useState("");
	const [form, setForm] = useState(emptyForm);
	const [editingId, setEditingId] = useState(null); // _id бренду
	const [saving, setSaving] = useState(false);
	const [deleting, setDeleting] = useState(false);

	const isEditing = editingId !== null;

	const fetchBrands = useCallback(async () => {
		setLoadingList(true);
		try {
			const {data} = await axios.get(`${API_URL}/brands`);
			const list = Array.isArray(data) ? data : [];
			list.sort((a, b) => String(a.name || "").localeCompare(String(b.name || "")));
			setBrands(list);
		} catch (e) {
			console.error(e);
			toast.error("Не вдалося завантажити бренди");
		} finally {
			setLoadingList(false);
		}
	}, []);

	useEffect(() => {
		fetchBrands();
	}, [fetchBrands]);

	const filtered = useMemo(() => {
		const q = query.trim().toLowerCase();
		if (!q) {
			return brands;
		}
		return brands.filter((b) => String(b.name || "").toLowerCase().includes(q));
	}, [brands, query]);

	const handleChange = (e) => {
		const {name, value} = e.target;
		setForm((prev) => ({...prev, [name]: value}));
	};

	const resetForm = () => {
		setForm(emptyForm);
		setEditingId(null);
	};

	const loadBrand = (brand) => {
		setForm({
			name:        brand.name ?? "",
			logo:        brand.logo ?? "",
			title:       brand.title ?? "",
			description: brand.description ?? "",
		});
		setEditingId(brand._id);
		window.scrollTo({top: 0, behavior: "smooth"});
	};

	const validate = () => {
		for (const [key, label] of requiredFields) {
			if (String(form[key]).trim() === "") {
				toast.error(`Заповніть поле: ${label}`);
				return false;
			}
		}
		return true;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!validate()) {
			return;
		}
		setSaving(true);
		const payload = {
			name:        form.name.trim(),
			logo:        form.logo.trim(),
			title:       form.title.trim(),
			description: form.description.trim(),
		};
		try {
			if (isEditing) {
				await axios.put(`${API_URL}/brands/${editingId}`, payload);
				toast.success("Бренд оновлено");
			} else {
				await axios.post(`${API_URL}/brands`, payload);
				toast.success("Бренд додано");
				resetForm();
			}
			await fetchBrands();
		} catch (err) {
			const status = err?.response?.status;
			const msg = err?.response?.data?.message;
			if (status === 401 || status === 403) {
				toast.error("Немає прав. Увійдіть як адміністратор.");
			} else if (status === 409) {
				toast.error(msg || "Бренд з такою назвою вже існує");
			} else {
				toast.error(msg || "Помилка збереження бренду");
			}
			console.error(err);
		} finally {
			setSaving(false);
		}
	};

	const handleDelete = async () => {
		if (!isEditing) {
			return;
		}
		if (!window.confirm(`Видалити бренд «${form.name}»? Дію не можна скасувати.`)) {
			return;
		}
		setDeleting(true);
		try {
			await axios.delete(`${API_URL}/brands/${editingId}`);
			toast.success("Бренд видалено");
			resetForm();
			await fetchBrands();
		} catch (err) {
			const status = err?.response?.status;
			if (status === 401 || status === 403) {
				toast.error("Немає прав. Увійдіть як адміністратор.");
			} else if (status === 404) {
				toast.error("Бренд не знайдено");
			} else {
				toast.error("Помилка видалення бренду");
			}
			console.error(err);
		} finally {
			setDeleting(false);
		}
	};

	return (
		<div className="flex flex-col gap-6 px-5">
			<div className="hidden md:flex flex-col gap-4">
				<div className="font-semibold text-lg leading-[13px]">БРЕНДИ</div>
				<div className="border-t border-[#E8E8E8]"/>
			</div>

			{/* Заголовок режиму + скидання */}
			<div className="flex items-center justify-between gap-3 flex-wrap">
				<div className="font-semibold text-md text-[#000E55]">
					{isEditing ? "Редагування бренду" : "Новий бренд"}
				</div>
				{isEditing && (
					<button
						type="button"
						onClick={resetForm}
						className="h-[40px] rounded-[30px] px-4 font-medium bg-white text-[#000E55] border border-[#000E55] hover:bg-[#000E55] hover:text-white transition-colors"
					>
						+ Створити новий замість цього
					</button>
				)}
			</div>

			{/* Форма бренду */}
			<form onSubmit={handleSubmit} className="flex flex-col gap-4">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<Field label="Назва*" name="name" value={form.name} onChange={handleChange}/>
					<Field label="Заголовок (title)*" name="title" value={form.title} onChange={handleChange}/>
				</div>
				<Field label="Логотип — посилання (URL)*" name="logo" value={form.logo} onChange={handleChange}/>
				{form.logo && (
					<img src={form.logo} alt="лого" className="w-24 h-24 object-contain border border-[#E8E8E8] rounded-xl"/>
				)}
				<Field label="Опис*" name="description" value={form.description} onChange={handleChange} textarea/>

				<div className="flex flex-col md:flex-row gap-3 pt-2">
					<button
						type="submit"
						disabled={saving}
						className={`h-[53px] rounded-[30px] px-8 font-medium text-white transition-colors ${
							saving ? "bg-[#000E55] opacity-50 cursor-not-allowed" : "bg-[#000E55] hover:bg-[#E667A4]"
						}`}
					>
						{saving ? "Збереження…" : isEditing ? "Оновити бренд" : "Додати бренд"}
					</button>

					{isEditing && (
						<button
							type="button"
							onClick={handleDelete}
							disabled={deleting}
							className={`h-[53px] rounded-[30px] px-8 font-medium text-white transition-colors ${
								deleting ? "bg-[#B90003] opacity-50 cursor-not-allowed" : "bg-[#B90003] hover:opacity-80"
							}`}
						>
							{deleting ? "Видалення…" : "Видалити бренд"}
						</button>
					)}
				</div>
			</form>

			{/* Список брендів */}
			<div className="flex flex-col gap-3">
				<div className="flex items-center justify-between gap-3 flex-wrap">
					<div className="font-semibold text-md text-[#000E55]">Усі бренди ({brands.length})</div>
					<input
						type="text"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						placeholder="Пошук за назвою"
						className={`${inputClass} md:w-[320px]`}
					/>
				</div>

				{loadingList ? (
					<div className="text-sm text-gray-500">Завантаження…</div>
				) : (
					<ul className="border border-[#E8E8E8] rounded-2xl p-2 bg-white flex flex-col gap-1 max-h-[420px] overflow-y-auto">
						{filtered.length === 0 && (
							<li className="text-sm text-gray-500 p-2">Нічого не знайдено</li>
						)}
						{filtered.map((b) => (
							<li key={b._id}>
								<button
									type="button"
									onClick={() => loadBrand(b)}
									className={`flex items-center gap-3 w-full text-left p-2 rounded-xl transition-colors ${
										editingId === b._id ? "bg-[#ffe8f5]" : "hover:bg-[#f6f6f6]"
									}`}
								>
									{b.logo && (
										<img src={b.logo} alt="" width={40} height={40} className="w-10 h-10 object-contain rounded"/>
									)}
									<span className="flex flex-col">
										<span className="text-sm font-medium text-[#111827]">{b.name}</span>
										<span className="text-xs text-gray-500 line-clamp-1">{b.title}</span>
									</span>
								</button>
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
};

export default Brands;
