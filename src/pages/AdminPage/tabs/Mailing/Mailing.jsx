import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import axios from "axios";

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

const Mailing = () => {
	const [files, setFiles] = useState([]);
	const [title, setTitle] = useState("");
	const [text, setText] = useState("");
	const [subject, setSubject] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [filter, setFilter] = useState("");
	const [copiedContacts, setCopiedContacts] = useState([]);
	const [toEmails, setToEmails] = useState([]);

	const handleFileChange = (e) => {
		setFiles([...files, ...e.target.files]);
	};
	const handleClick = (e) => {
		const newMail = filter;
		const validateEmail = (email) => {
			// Регулярний вираз для перевірки валідності email
			const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

			// Перевірка email за допомогою регулярного виразу
			return emailPattern.test(email);
		};

		if (validateEmail(newMail)) {
			// Перевірка, чи пошта вже не існує у списку toEmails
			if (!toEmails.includes(newMail)) {
				setToEmails([...toEmails, newMail]);
				return;
			} else {
				toast.error("Пошта вже додана!");
				return;
			}
		}
		toast.error("Пошта не валідна!");
	};

	const handleTextChange = (e) => {
		setText(e.target.value);
	};

	const handleSubjectChange = (e) => {
		setSubject(e.target.value);
	};

	const handleFilterChange = (e) => {
		setFilter(e.target.value);
	};

	// const handleSubmit = async (e) => {
	// `${REACT_APP_API_URL}/email/sendemail`,

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (toEmails.length === 0) {
			toast.error("Список одержувачів порожній");
			return;
		}

		try {
			const formData = new FormData();

			files.forEach((file) => {
				formData.append("file", file);
			});

			formData.append("title", title);
			formData.append("text", text);
			formData.append("subject", subject);

			// Якщо один email – передаємо просто рядок, інакше – масив
			if (toEmails.length === 1) {
				formData.append("to", toEmails[0]);
			} else {
				toEmails.forEach((email) => {
					formData.append("to", email); // Кожен окремо
				});
			}

			await axios.post(
				`${REACT_APP_API_URL}/email/sendemail`,
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);

			toast.info("Пошта успішно відправлена");
		} catch (error) {
			console.error("Помилка:", error);
			toast.error("Сталася помилка під час відправлення пошти");
		} finally {
			setCopiedContacts([]);
			setToEmails([]);
			setFiles([]);
			setSubject("");
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.post(
					`${REACT_APP_API_URL}/searchUser`,
					{
						filter,
					}
				);
				setSearchResults(response.data);
			} catch (error) {
				console.error("Помилка при отриманні результатів:", error);
			}
		};

		if (filter.trim() !== "") {
			fetchData();
		} else {
			setSearchResults([]);
		}
	}, [filter]);

	const handleCopyContact = (firstName, lastName, email, number) => {
		const copiedContact = `${firstName} ${lastName}, ${email}, ${number}`;
		if (!copiedContacts.find((contact) => contact === copiedContact)) {
			setCopiedContacts([...copiedContacts, copiedContact]);
			setToEmails([...toEmails, email]);
		}
	};

	const handleDeleteContact = (index) => {
		const updatedContacts = [...copiedContacts];
		updatedContacts.splice(index, 1);
		setCopiedContacts(updatedContacts);

		const updatedToEmails = [...toEmails];
		updatedToEmails.splice(index, 1);
		setToEmails(updatedToEmails);
	};

	return (
		<div className="flex flex-col gap-4 px-5">
			<div className="hidden md:flex flex-col gap-4">
				<div className="font-semibold text-lg leading-[13px]">ПОШТОВА РОЗСИЛКА</div>
				<div className="border-t border-[#E8E8E8]"/>
			</div>

			<form onSubmit={handleSubmit} className="flex flex-col gap-3">
				<input
					type="text"
					name="subject"
					value={subject}
					onChange={handleSubjectChange}
					placeholder="Тема листа"
					className="bg-[#F8F8F8] border border-[#E8E8E8] rounded-2xl px-4 py-3 outline-none"
				/>
				<input
					type="text"
					name="title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder="Привітання"
					className="bg-[#F8F8F8] border border-[#E8E8E8] rounded-2xl px-4 py-3 outline-none"
				/>
				<textarea
					name="text"
					value={text}
					onChange={handleTextChange}
					placeholder="Введіть текст для листа"
					className="bg-[#F8F8F8] border border-[#E8E8E8] rounded-2xl px-4 py-4 outline-none min-h-[200px] resize-y"
				/>

				<div className="flex flex-col md:flex-row md:items-center gap-3">
					<input
						type="file"
						onChange={handleFileChange}
						multiple
						className="bg-white border border-[#E8E8E8] rounded-2xl px-4 py-3"
					/>
					<button
						type="submit"
						disabled={toEmails.length === 0}
						className={`h-[53px] rounded-[30px] px-6 font-medium transition-colors ${
							toEmails.length === 0
								? "bg-[#000E55] text-white opacity-50 cursor-not-allowed"
								: "bg-[#000E55] text-white hover:bg-[#E667A4]"
						}`}
					>
						Відправити
					</button>
				</div>
			</form>

			<div className="flex flex-col md:flex-row gap-3 md:items-center">
				<input
					type="text"
					value={filter}
					onChange={handleFilterChange}
					placeholder="Фільтр за ім'ям, прізвищем, email, номером"
					className="bg-[#F8F8F8] border border-[#E8E8E8] rounded-2xl px-4 py-3 outline-none w-full"
				/>

				<button
					type="button"
					onClick={handleClick}
					className="h-[53px] rounded-[30px] px-5 font-medium bg-white text-[#000E55] border border-[#000E55] hover:bg-[#E667A4] hover:text-white hover:border-[#E667A4] transition-colors w-full md:w-auto"
				>
					Додати незареєстровану пошту
				</button>
			</div>

			{filter.trim() !== "" && (
				<ul className="border border-[#E8E8E8] rounded-2xl p-3 bg-white flex flex-col gap-2">
					{searchResults
						.filter(
							(result) =>
								result.firstName.toLowerCase().includes(filter.toLowerCase()) ||
								result.lastName.toLowerCase().includes(filter.toLowerCase()) ||
								result.email.toLowerCase().includes(filter.toLowerCase()) ||
								result.number.toString().includes(filter)
						)
						.slice(0, 10)
						.map((result) => (
							<li
								key={result._id}
								className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 p-3 rounded-xl border border-[#E8E8E8]"
							>
								<div className="text-sm text-[#111827]">
									{result.firstName} {result.lastName}, {result.email}, {result.number}
								</div>
								<button
									type="button"
									onClick={() =>
										handleCopyContact(
											result.firstName,
											result.lastName,
											result.email,
											result.number
										)
									}
									className="h-[40px] rounded-[30px] px-4 font-medium bg-white text-[#000E55] border border-[#000E55] hover:bg-[#000E55] hover:text-white transition-colors w-fit"
								>
									Додати
								</button>
							</li>
						))}
				</ul>
			)}

			{toEmails.length > 0 && (
				<div className="flex flex-col gap-3">
					<div className="font-semibold text-sm md:text-md text-[#111827]">
						Список контактів до відправки:
					</div>
					<ul className="border border-[#E8E8E8] rounded-2xl p-3 bg-white flex flex-col gap-2">
						{toEmails.map((contact, index) => (
							<li
								key={index}
								className="flex items-center justify-between gap-3 p-3 rounded-xl border border-[#E8E8E8]"
							>
								<div className="text-sm text-[#111827] break-all">{contact}</div>
								<button
									type="button"
									onClick={() => handleDeleteContact(index)}
									className="h-[40px] rounded-[30px] px-4 font-medium bg-white text-[#000E55] border border-[#000E55] hover:bg-[#000E55] hover:text-white transition-colors"
								>
									Видалити
								</button>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};
export default Mailing;