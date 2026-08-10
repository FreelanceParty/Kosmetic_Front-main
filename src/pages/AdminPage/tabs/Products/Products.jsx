import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const emptyForm = {
	id:             "",
	name:           "",
	brand:          "",
	article:        "",
	code:           "",
	amount:         "",
	priceOPT:       "",
	priceDrop:      "",
	price:          "",
	country:        "",
	category:       "",
	subCategory:    "",
	subSubCategory: "",
	images:         "",
	description:    "",
	filterTagIds:   "",
	new:            false,
	sale:           false,
};

// поля, які обов'язкові на бекенді (addSchema)
const requiredFields = [
	["name", "Назва"],
	["brand", "Бренд"],
	["article", "Артикул"],
	["code", "Штрих-код"],
	["amount", "Кількість"],
	["priceOPT", "Оптова ціна"],
	["price", "Роздрібна ціна"],
	["country", "Країна"],
	["category", "Категорія"],
	["images", "Посилання на зображення"],
	["description", "Опис"],
];

const numericFields = ["code", "amount", "priceOPT", "priceDrop", "price"];

const inputClass =
	      "bg-[#F8F8F8] border border-[#E8E8E8] rounded-2xl px-4 py-3 outline-none focus:border-[#000E55] w-full";

const Field = ({label, name, value, onChange, type = "text", textarea = false}) => (
	<label className="flex flex-col gap-2">
		<span className="text-sm font-medium text-[#111827]">{label}</span>
		{textarea ? (
			<textarea
				name={name}
				value={value}
				onChange={onChange}
				className={`${inputClass} min-h-[120px] resize-y`}
			/>
		) : (
			<input
				type={type}
				name={name}
				value={value}
				onChange={onChange}
				className={inputClass}
			/>
		)}
	</label>
);

const Products = () => {
	const [query, setQuery] = useState("");
	const [results, setResults] = useState([]);
	const [form, setForm] = useState(emptyForm);
	const [editingId, setEditingId] = useState(null); // числовий id товару, що редагується
	const [saving, setSaving] = useState(false);
	const [deleting, setDeleting] = useState(false);

	const isEditing = editingId !== null;

	const handleChange = (e) => {
		const {name, value, type, checked} = e.target;
		setForm((prev) => ({...prev, [name]: type === "checkbox" ? checked : value}));
	};

	// ---- пошук існуючих товарів ----
	useEffect(() => {
		const q = query.trim();
		if (q === "") {
			setResults([]);
			return;
		}
		const controller = new AbortController();
		const t = setTimeout(async () => {
			try {
				const {data} = await axios.get(`${API_URL}/goods/search`, {
					params: {q, limit: 15},
					signal: controller.signal,
				});
				setResults(Array.isArray(data?.hits) ? data.hits : []);
			} catch (e) {
				if (!axios.isCancel(e)) {
					console.error(e);
				}
			}
		}, 350);
		return () => {
			controller.abort();
			clearTimeout(t);
		};
	}, [query]);

	const resetForm = () => {
		setForm(emptyForm);
		setEditingId(null);
	};

	const loadProduct = async (product) => {
		try {
			// беремо канонічний документ з бази за числовим id
			const {data} = await axios.get(`${API_URL}/goods/${product.id}`);
			const p = data || product;
			setForm({
				id:             p.id ?? "",
				name:           p.name ?? "",
				brand:          p.brand ?? "",
				article:        p.article ?? "",
				code:           p.code ?? "",
				amount:         p.amount ?? "",
				priceOPT:       p.priceOPT ?? "",
				priceDrop:      p.priceDrop ?? "",
				price:          p.price ?? "",
				country:        p.country ?? "",
				category:       p.category ?? "",
				subCategory:    p.subCategory ?? "",
				subSubCategory: p.subSubCategory ?? "",
				images:         p.images ?? "",
				description:    p.description ?? "",
				filterTagIds:   p.filterTagIds ?? "",
				new:            Boolean(p.new),
				sale:           Boolean(p.sale),
			});
			setEditingId(p.id);
			setQuery("");
			setResults([]);
			window.scrollTo({top: 0, behavior: "smooth"});
		} catch (e) {
			console.error(e);
			toast.error("Не вдалося завантажити товар");
		}
	};

	const buildPayload = () => {
		const payload = {
			name:           form.name.trim(),
			brand:          form.brand.trim(),
			article:        form.article.trim(),
			code:           Number(form.code),
			amount:         Number(form.amount),
			priceOPT:       Number(form.priceOPT),
			priceDrop:      form.priceDrop === "" ? 0 : Number(form.priceDrop),
			price:          Number(form.price),
			country:        form.country.trim(),
			category:       form.category.trim(),
			subCategory:    form.subCategory.trim(),
			subSubCategory: form.subSubCategory.trim(),
			images:         form.images.trim(),
			description:    form.description.trim(),
			filterTagIds:   form.filterTagIds.trim(),
			new:            Boolean(form.new),
			sale:           Boolean(form.sale),
		};
		// id: для нового генеруємо унікальний, для редагування лишаємо наявний
		const providedId = String(form.id).trim();
		payload.id = providedId !== "" ? Number(providedId) : Date.now();
		return payload;
	};

	const validate = () => {
		for (const [key, label] of requiredFields) {
			if (String(form[key]).trim() === "") {
				toast.error(`Заповніть поле: ${label}`);
				return false;
			}
		}
		for (const key of numericFields) {
			const raw = String(form[key]).trim();
			if (raw === "") {
				continue; // priceDrop може бути порожнім
			}
			if (!Number.isFinite(Number(raw))) {
				toast.error(`Поле «${key}» має бути числом`);
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
		try {
			const payload = buildPayload();
			if (isEditing) {
				await axios.put(`${API_URL}/goods/${editingId}`, payload);
				toast.success("Товар оновлено");
				setEditingId(payload.id);
				setForm((prev) => ({...prev, id: payload.id}));
			} else {
				await axios.post(`${API_URL}/goods`, payload);
				toast.success("Товар додано");
				resetForm();
			}
		} catch (err) {
			const status = err?.response?.status;
			const msg = err?.response?.data?.message;
			if (status === 401 || status === 403) {
				toast.error("Немає прав. Увійдіть як адміністратор.");
			} else {
				toast.error(msg || "Помилка збереження товару");
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
		if (!window.confirm(`Видалити товар «${form.name}» (id ${editingId})? Дію не можна скасувати.`)) {
			return;
		}
		setDeleting(true);
		try {
			await axios.delete(`${API_URL}/goods/${editingId}`);
			toast.success("Товар видалено");
			resetForm();
		} catch (err) {
			const status = err?.response?.status;
			if (status === 401 || status === 403) {
				toast.error("Немає прав. Увійдіть як адміністратор.");
			} else if (status === 404) {
				toast.error("Товар не знайдено");
			} else {
				toast.error("Помилка видалення товару");
			}
			console.error(err);
		} finally {
			setDeleting(false);
		}
	};

	return (
		<div className="flex flex-col gap-6 px-5">
			<div className="hidden md:flex flex-col gap-4">
				<div className="font-semibold text-lg leading-[13px]">ТОВАРИ</div>
				<div className="border-t border-[#E8E8E8]"/>
			</div>

			{/* Пошук існуючого товару */}
			<div className="flex flex-col gap-2">
				<div className="text-sm font-medium text-[#111827]">Знайти товар для редагування / видалення</div>
				<input
					type="text"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					placeholder="Пошук за назвою, артикулом або штрих-кодом"
					className={inputClass}
				/>
				{results.length > 0 && (
					<ul className="border border-[#E8E8E8] rounded-2xl p-2 bg-white flex flex-col gap-1 max-h-[320px] overflow-y-auto">
						{results.map((r) => (
							<li key={r.id ?? r._id}>
								<button
									type="button"
									onClick={() => loadProduct(r)}
									className="flex items-center gap-3 w-full text-left p-2 rounded-xl hover:bg-[#ffe8f5] transition-colors"
								>
									{r.images && (
										<img src={r.images} alt="" width={40} height={40} className="w-10 h-10 object-contain rounded"/>
									)}
									<span className="flex flex-col">
										<span className="text-sm text-[#111827] line-clamp-1">{r.name}</span>
										<span className="text-xs text-gray-500">
											{r.brand} · арт. {r.article} · id {r.id} · {r.price} грн
										</span>
									</span>
								</button>
							</li>
						))}
					</ul>
				)}
			</div>

			{/* Заголовок режиму + скидання */}
			<div className="flex items-center justify-between gap-3 flex-wrap">
				<div className="font-semibold text-md text-[#000E55]">
					{isEditing ? `Редагування товару (id ${editingId})` : "Новий товар"}
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

			{/* Форма товару */}
			<form onSubmit={handleSubmit} className="flex flex-col gap-4">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<Field label="Назва*" name="name" value={form.name} onChange={handleChange}/>
					<Field label="Бренд*" name="brand" value={form.brand} onChange={handleChange}/>
					<Field label="Артикул*" name="article" value={form.article} onChange={handleChange}/>
					<Field label="Штрих-код (code)*" name="code" value={form.code} onChange={handleChange} type="number"/>
					<Field label="Кількість на складі*" name="amount" value={form.amount} onChange={handleChange} type="number"/>
					<Field label="ID (порожнє — згенерується для нового)" name="id" value={form.id} onChange={handleChange} type="number"/>
					<Field label="Оптова ціна*" name="priceOPT" value={form.priceOPT} onChange={handleChange} type="number"/>
					<Field label="Дроп ціна" name="priceDrop" value={form.priceDrop} onChange={handleChange} type="number"/>
					<Field label="Роздрібна ціна*" name="price" value={form.price} onChange={handleChange} type="number"/>
					<Field label="Країна*" name="country" value={form.country} onChange={handleChange}/>
					<Field label="Категорія*" name="category" value={form.category} onChange={handleChange}/>
					<Field label="Підкатегорія" name="subCategory" value={form.subCategory} onChange={handleChange}/>
					<Field label="Під-підкатегорія" name="subSubCategory" value={form.subSubCategory} onChange={handleChange}/>
					<Field label="ID тегів фільтра" name="filterTagIds" value={form.filterTagIds} onChange={handleChange}/>
				</div>

				<Field label="Посилання на зображення (URL)*" name="images" value={form.images} onChange={handleChange}/>
				{form.images && (
					<img src={form.images} alt="прев'ю" className="w-24 h-24 object-contain border border-[#E8E8E8] rounded-xl"/>
				)}

				<Field label="Опис*" name="description" value={form.description} onChange={handleChange} textarea/>

				<div className="flex gap-6">
					<label className="flex items-center gap-2 cursor-pointer">
						<input type="checkbox" name="new" checked={form.new} onChange={handleChange}/>
						<span className="text-sm font-medium">Новинка</span>
					</label>
					<label className="flex items-center gap-2 cursor-pointer">
						<input type="checkbox" name="sale" checked={form.sale} onChange={handleChange}/>
						<span className="text-sm font-medium">Акція</span>
					</label>
				</div>

				<div className="flex flex-col md:flex-row gap-3 pt-2">
					<button
						type="submit"
						disabled={saving}
						className={`h-[53px] rounded-[30px] px-8 font-medium text-white transition-colors ${
							saving ? "bg-[#000E55] opacity-50 cursor-not-allowed" : "bg-[#000E55] hover:bg-[#E667A4]"
						}`}
					>
						{saving ? "Збереження…" : isEditing ? "Оновити товар" : "Додати товар"}
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
							{deleting ? "Видалення…" : "Видалити товар"}
						</button>
					)}
				</div>
			</form>
		</div>
	);
};

export default Products;
