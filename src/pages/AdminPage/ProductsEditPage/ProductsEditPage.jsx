import React, {useEffect, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";
import ExelUpload from "./temp.jsx";

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

const initialProduct = {
	name:           "",
	article:        "",
	code:           "",
	amount:         null,
	description:    "",
	price:          null,
	priceOld:       null,
	priceOPT:       null,
	priceOldOPT:    null,
	brand:          "",
	images:         "",
	newness:        false,
	sale:           false,
	category:       "",
	subCategory:    "",
	subSubCategory: "",
	country:        "",
	compound:       "",
};

const ProductsEditPage = () => {
	const [products, setProducts] = useState([]);
	const [brands, setBrands] = useState([]);
	const [formData, setFormData] = useState(initialProduct);
	const [editId, setEditId] = useState(null);
	const [mode, setMode] = useState("add"); // режим: add або edit
	const [searchQuery, setSearchQuery] = useState("");

	const fetchProducts = async () => {
		try {
			const res = await axios.get(`${REACT_APP_API_URL}/products?limit=5000`);
			setProducts(res.data.products);
		} catch (err) {
			console.error("Помилка при завантаженні товарів:", err);
		}
	};

	const fetchBrands = async () => {
		try {
			const res = await axios.get(`${REACT_APP_API_URL}/brands`);
			const allBrands = res.data.flatMap((item) => item.brandsName);
			setBrands(allBrands);
		} catch (err) {
			console.error("Помилка при завантаженні брендів:", err);
		}
	};

	useEffect(() => {
		fetchProducts();
		fetchBrands();
	}, []);

	const handleChange = (e) => {
		const {name, value, type, checked} = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formattedData = {
			...formData,
			code:        Number(formData.code),
			amount:      Number(formData.amount),
			price:       Number(formData.price),
			priceOld:    Number(formData.priceOld),
			priceOPT:    Number(formData.priceOPT),
			priceOldOPT: Number(formData.priceOldOPT),
			newness:     Boolean(formData.newness),
			sale:        Boolean(formData.sale),
		};

		try {
			if (editId) {
				await axios.put(`${REACT_APP_API_URL}/products/${editId}`, formattedData);
				toast.success("Товар успішно оновлено!");
			} else {
				await axios.post(`${REACT_APP_API_URL}/products`, formattedData);
				toast.success("Товар успішно додано!");
			}
			setFormData(initialProduct);
			setEditId(null);
			fetchProducts();
		} catch (err) {
			console.error("Помилка при збереженні товару:", err);
			toast.error("Помилка при збереженні товару");
		}
	};

	const handleEdit = (product) => {
		setFormData(product);
		setEditId(product.id);
		setMode("add"); // коли редагуємо — переключити в режим додавання
	};

	const handleDelete = async (id) => {
		try {
			await axios.delete(`${REACT_APP_API_URL}/products/${id}`);
			toast.success("Товар успішно видалено!");
			fetchProducts();
		} catch (err) {
			console.error("Помилка при видаленні товару:", err);
			toast.error("Помилка при видаленні товару");
		}
	};

	const filteredProducts = products.filter(
		(product) =>
			product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			product.code.toString().includes(searchQuery)
	);

	return (
		<div style={{padding: "20px"}}>
			{/* Перемикач режимів */}
			<div style={{marginBottom: "20px"}}>
				<button onClick={() => setMode("add")}>Додати товар</button>
				<button onClick={() => setMode("edit")}>Редагувати товари</button>
			</div>

			{/* Форма додавання або редагування */}
			{mode === "add" && (
				<>
					<h2>{editId ? "Редагувати товар" : "Додати товар"}</h2>
					<ExelUpload/>
					<form onSubmit={handleSubmit}>
						<div>
							<label>Назва</label>
							<input name="name" placeholder="Назва" value={formData.name} onChange={handleChange} required/>
						</div>

						<div>
							<label>Артикул</label>
							<input name="article" placeholder="Артикул" value={formData.article} onChange={handleChange} required/>
						</div>

						<div>
							<label>Код товару</label>
							<input name="code" placeholder="Код товару" value={formData.code} onChange={handleChange} required/>
						</div>

						<div>
							<label>Кількість</label>
							<input name="amount" placeholder="Кількість" value={formData.amount} onChange={handleChange} required/>
						</div>

						<div>
							<label>Ціна</label>
							<input name="price" placeholder="Ціна" value={formData.price} onChange={handleChange} required/>
						</div>

						<div>
							<label>Стара ціна</label>
							<input name="priceOld" placeholder="Стара ціна" value={formData.priceOld} onChange={handleChange}/>
						</div>

						<div>
							<label>Оптова ціна</label>
							<input name="priceOPT" placeholder="Оптова ціна" value={formData.priceOPT} onChange={handleChange}/>
						</div>

						<div>
							<label>Стара оптова ціна</label>
							<input name="priceOldOPT" placeholder="Стара оптова ціна" value={formData.priceOldOPT} onChange={handleChange}/>
						</div>

						<div>
							<label>URL зображення</label>
							<input name="images" placeholder="URL зображення" value={formData.images} onChange={handleChange} required/>
						</div>

						<div>
							<label>Опис</label>
							<textarea name="description" placeholder="Опис" value={formData.description} onChange={handleChange} required/>
						</div>


						{/* Вибір бренду */}
						<select name="brand" value={formData.brand} onChange={handleChange} required>
							<option value="">Оберіть бренд</option>
							{brands.map((brand, index) => (
								<option key={index} value={brand}>
									{brand}
								</option>
							))}
						</select>

						{/* Чекбокси */}
						<div>
							<label>
								Новинка:
								<input type="checkbox" name="newness" checked={formData.newness} onChange={handleChange}/>
							</label>
						</div>
						<div>
							<label>
								Знижка:
								<input type="checkbox" name="sale" checked={formData.sale} onChange={handleChange}/>
							</label>
						</div>

						{/* Інші поля */}
						<input name="category" placeholder="Категорія" value={formData.category} onChange={handleChange}/>
						<input name="subCategory" placeholder="Підкатегорія" value={formData.subCategory} onChange={handleChange}/>
						<input name="subSubCategory" placeholder="Під-підкатегорія" value={formData.subSubCategory} onChange={handleChange}/>
						<input name="country" placeholder="Країна" value={formData.country} onChange={handleChange}/>
						<textarea name="compound" placeholder="Склад" value={formData.compound} onChange={handleChange}/>

						<button type="submit">{editId ? "Оновити" : "Додати"}</button>
					</form>
				</>
			)}

			{/* Список товарів з пошуком */}
			{mode === "edit" && (
				<>
					<h2>Список товарів</h2>
					<input
						type="text"
						placeholder="Пошук за назвою або кодом"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						style={{marginBottom: "20px", width: "100%", padding: "8px"}}
					/>
					<ul>
						{filteredProducts.length ? (
							filteredProducts.map((p) => (
								<li key={p.id}>
									<strong>{p.name}</strong> — {p.price} грн (код: {p.code})
									<button onClick={() => handleEdit(p)}>Редагувати</button>
									<button onClick={() => handleDelete(p.id)}>Видалити</button>
								</li>
							))
						) : (
							<p>Нічого не знайдено...</p>
						)}
					</ul>
				</>
			)}
		</div>
	);
};

export default ProductsEditPage;
