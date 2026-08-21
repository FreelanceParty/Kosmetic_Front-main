import {useRef, useState} from "react";
import {toast} from "react-toastify";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const FIELD_LABELS = {
	name:              "Назва",
	article:           "Артикул",
	code:              "Штрих-код",
	amount:            "Кількість",
	description:       "Опис",
	priceOPT:          "Оптова ціна",
	priceOldOPT:       "Стара оптова ціна",
	price:             "Роздрібна ціна",
	priceOld:          "Стара роздрібна ціна",
	priceDrop:         "Дроп ціна",
	priceOldDrop:      "Стара дроп ціна",
	brand:             "Бренд",
	images:            "Зображення",
	new:               "Новинка",
	sale:              "Акція",
	category:          "Категорія",
	subCategory:       "Підкатегорія",
	subSubCategory:    "Під-підкатегорія",
	country:           "Країна",
	compound:          "Склад",
	filterTagIds:      "Теги фільтра",
	usageInstructions: "Спосіб застосування",
};

const fmtVal = (v) => {
	if (v === true) {
		return "так";
	}
	if (v === false) {
		return "ні";
	}
	if (v === "" || v === null || v === undefined) {
		return "—";
	}
	const s = String(v);
	return s.length > 60 ? `${s.slice(0, 60)}…` : s;
};

const Chip = ({label, value, color}) => (
	<div className={`flex flex-col items-center justify-center rounded-2xl px-3 py-2 min-w-[92px] ${color}`}>
		<span className="text-xl font-semibold leading-none">{value}</span>
		<span className="text-[11px] mt-1 text-center leading-tight">{label}</span>
	</div>
);

const ListBlock = ({title, count, truncated, color, children}) => {
	if (!count) {
		return null;
	}
	return (
		<div className="flex flex-col gap-2">
			<div className={`text-sm font-semibold ${color}`}>{title} · {count}</div>
			<ul className="flex flex-col gap-1 max-h-[260px] overflow-y-auto pr-1">
				{children}
			</ul>
			{truncated > 0 && (
				<div className="text-xs text-gray-500">…та ще {truncated}</div>
			)}
		</div>
	);
};

const ProductsImport = () => {
	const [file, setFile] = useState(null);
	const [report, setReport] = useState(null); // {applied, summary, added, updated, deleted, errors, truncated}
	const [previewing, setPreviewing] = useState(false);
	const [applying, setApplying] = useState(false);
	const inputRef = useRef(null);

	const applied = report?.applied === true;

	const resetAll = () => {
		setFile(null);
		setReport(null);
		if (inputRef.current) {
			inputRef.current.value = "";
		}
	};

	const handleFileChange = (e) => {
		const f = e.target.files?.[0] ?? null;
		setFile(f);
		setReport(null);
	};

	const send = async (endpoint) => {
		const formData = new FormData();
		formData.append("file", file);
		const {data} = await axios.post(`${API_URL}/goods/import/${endpoint}`, formData);
		return data;
	};

	const errorToast = (err) => {
		const status = err?.response?.status;
		const msg = err?.response?.data?.message;
		if (status === 401 || status === 403) {
			toast.error("Немає прав. Увійдіть як адміністратор.");
		} else {
			toast.error(msg || "Помилка обробки файлу");
		}
		console.error(err);
	};

	const handlePreview = async () => {
		if (!file) {
			toast.error("Спочатку оберіть файл .xlsx");
			return;
		}
		setPreviewing(true);
		try {
			const data = await send("preview");
			setReport(data);
		} catch (err) {
			errorToast(err);
		} finally {
			setPreviewing(false);
		}
	};

	const handleApply = async () => {
		if (!file || !report || applied) {
			return;
		}
		const {added, updated, deleted} = report.summary;
		const confirmMsg =
			`Застосувати зміни?\n\n` +
			`Додасться: ${added}\n` +
			`Оновиться: ${updated}\n` +
			`Видалиться НАЗАВЖДИ: ${deleted}\n\n` +
			`Видалення товарів незворотне.`;
		if (!window.confirm(confirmMsg)) {
			return;
		}
		setApplying(true);
		try {
			const data = await send("apply");
			setReport(data);
			toast.success("Зміни застосовано");
		} catch (err) {
			errorToast(err);
		} finally {
			setApplying(false);
		}
	};

	const s = report?.summary;

	return (
		<div className="flex flex-col gap-4">
			<div className="font-semibold text-md text-[#000E55]">Оновлення товарів з файлу (.xlsx)</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
				<div className="flex flex-col gap-4 border border-[#E8E8E8] rounded-2xl p-4 bg-white">
					<div className="text-sm text-gray-600">
						Завантажте прайс у форматі .xlsx. Зіставлення — за полем <b>id</b>.
						Товари з файлу оновлюються або додаються, а відсутні у файлі — видаляються.
						Спочатку натисніть «Перевірити файл», щоб побачити зміни без застосування.
					</div>

					<label className="flex flex-col gap-2">
						<span className="text-sm font-medium text-[#111827]">Файл прайсу (.xlsx)</span>
						<input
							ref={inputRef}
							type="file"
							accept=".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
							onChange={handleFileChange}
							className="bg-[#F8F8F8] border border-[#E8E8E8] rounded-2xl px-4 py-3 outline-none w-full file:mr-3 file:rounded-full file:border-0 file:bg-[#000E55] file:text-white file:px-4 file:py-2 file:cursor-pointer"
						/>
					</label>

					{file && (
						<div className="text-xs text-gray-500">
							Обрано: <b>{file.name}</b> ({(file.size / 1024).toFixed(0)} КБ)
						</div>
					)}

					<div className="flex flex-col md:flex-row gap-3 pt-1">
						<button
							type="button"
							onClick={handlePreview}
							disabled={!file || previewing}
							className={`h-[48px] rounded-[30px] px-6 font-medium text-white transition-colors ${
								!file || previewing
									? "bg-[#000E55] opacity-50 cursor-not-allowed"
									: "bg-[#000E55] hover:bg-[#E667A4]"
							}`}
						>
							{previewing ? "Перевірка…" : "Перевірити файл"}
						</button>

						{report && !applied && (
							<button
								type="button"
								onClick={handleApply}
								disabled={applying}
								className={`h-[48px] rounded-[30px] px-6 font-medium text-white transition-colors ${
									applying ? "bg-[#B90003] opacity-50 cursor-not-allowed" : "bg-[#B90003] hover:opacity-80"
								}`}
							>
								{applying ? "Застосування…" : "Застосувати зміни"}
							</button>
						)}

						{(file || report) && (
							<button
								type="button"
								onClick={resetAll}
								className="h-[48px] rounded-[30px] px-6 font-medium bg-white text-[#000E55] border border-[#000E55] hover:bg-[#000E55] hover:text-white transition-colors"
							>
								Скинути
							</button>
						)}
					</div>
				</div>

				<div className="flex flex-col gap-4 border border-[#E8E8E8] rounded-2xl p-4 bg-white min-h-[120px]">
					{!report ? (
						<div className="text-sm text-gray-400 flex items-center justify-center h-full py-6 text-center">
							Тут з'явиться перелік товарів, які оновляться / додадуться / видаляться.
						</div>
					) : (
						<>
							<div className={`text-sm font-semibold ${applied ? "text-green-700" : "text-[#000E55]"}`}>
								{applied ? "✓ Зміни застосовано" : "Попередній перегляд (ще не застосовано)"}
							</div>

							<div className="flex flex-wrap gap-2">
								<Chip label="У файлі" value={s.totalInFile} color="bg-gray-100 text-gray-700"/>
								<Chip label="Додати" value={s.added} color="bg-green-100 text-green-700"/>
								<Chip label="Оновити" value={s.updated} color="bg-blue-100 text-blue-700"/>
								<Chip label="Видалити" value={s.deleted} color="bg-red-100 text-red-700"/>
								<Chip label="Без змін" value={s.unchanged} color="bg-gray-100 text-gray-500"/>
								{s.errors > 0 && (
									<Chip label="Помилки" value={s.errors} color="bg-amber-100 text-amber-700"/>
								)}
							</div>

							{!applied && s.deleted > 0 && (
								<div className="text-xs text-red-600 bg-red-50 rounded-xl px-3 py-2">
									Увага: {s.deleted} товар(ів) буде <b>видалено назавжди</b> при застосуванні.
								</div>
							)}

							<div className="flex flex-col gap-4">
								<ListBlock
									title={applied ? "Додано" : "Додаються"}
									count={s.added}
									truncated={report.truncated?.added}
									color="text-green-700"
								>
									{report.added.map((item) => (
										<li key={`a-${item.id}`} className="text-sm text-[#111827]">
											<span className="text-gray-400">#{item.id}</span> {item.name}
											<span className="text-xs text-gray-500"> · {item.brand} · {fmtVal(item.price)} грн</span>
										</li>
									))}
								</ListBlock>

								<ListBlock
									title={applied ? "Оновлено" : "Оновлюються"}
									count={s.updated}
									truncated={report.truncated?.updated}
									color="text-blue-700"
								>
									{report.updated.map((item) => (
										<li key={`u-${item.id}`} className="text-sm text-[#111827] border-b border-[#F0F0F0] pb-1">
											<div>
												<span className="text-gray-400">#{item.id}</span> {item.name}
											</div>
											<div className="flex flex-col gap-0.5 mt-0.5">
												{item.changes.map((c) => (
													<div key={c.field} className="text-xs text-gray-600">
														<b>{FIELD_LABELS[c.field] || c.field}:</b>{" "}
														<span className="text-gray-400 line-through">{fmtVal(c.from)}</span>{" → "}
														<span className="text-blue-700">{fmtVal(c.to)}</span>
													</div>
												))}
											</div>
										</li>
									))}
								</ListBlock>

								<ListBlock
									title={applied ? "Видалено" : "Видаляються"}
									count={s.deleted}
									truncated={report.truncated?.deleted}
									color="text-red-700"
								>
									{report.deleted.map((item, idx) => (
										<li key={`d-${item.id ?? idx}`} className="text-sm text-[#111827]">
											<span className="text-gray-400">#{item.id ?? "—"}</span> {item.name}
											<span className="text-xs text-gray-500"> · {item.brand}</span>
										</li>
									))}
								</ListBlock>

								<ListBlock
									title="Помилки / пропущені рядки"
									count={s.errors}
									truncated={report.truncated?.errors}
									color="text-amber-700"
								>
									{report.errors.map((err, idx) => (
										<li key={`e-${idx}`} className="text-xs text-amber-700">
											Рядок {err.row}: {err.message}
										</li>
									))}
								</ListBlock>
							</div>
						</>
					)}
				</div>
			</div>

			<div className="border-t border-[#E8E8E8]"/>
		</div>
	);
};

export default ProductsImport;
