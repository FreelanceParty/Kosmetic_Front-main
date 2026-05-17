import {useEffect, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";
import {Loader} from "../../../../components/Loader/Loader";

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

const Feedbacks = () => {
	const [feedbacks, setFeedbacks] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchFeedbacks = async () => {
			try {
				setLoading(true);
				const response = await axios.get(`${REACT_APP_API_URL}/feedback`);
				const receivedFeedbacks = Array.isArray(response.data) ? response.data : [];
				setFeedbacks(receivedFeedbacks);
			} catch (error) {
				toast.error("Помилка отримання даних про відгуки");
			} finally {
				setLoading(false);
			}
		};

		fetchFeedbacks();
	}, []);

	return (
		<div className="flex flex-col gap-6 md:gap-8 px-5">
			<div className="hidden md:flex flex-col gap-4">
				<div className="font-semibold text-lg leading-[13px]">ВІДГУКИ ТА ПРОПОЗИЦІЇ</div>
				<div className="border-t border-[#E8E8E8]"/>
			</div>

			{loading ? (
				<div className="flex justify-center w-full py-10">
					<Loader/>
				</div>
			) : feedbacks.length === 0 ? (
				<div className="py-10 text-center text-gray-500 font-medium">
					Поки що немає відгуків.
				</div>
			) : (
				<div className="grid grid-cols-1 gap-3 md:gap-4">
					{feedbacks.map((feedback) => {
						const owner = feedback?.owner;
						const ownerName = owner ? `${owner.firstName ?? ""} ${owner.lastName ?? ""}`.trim() : "";
						const feedbackText = (feedback?.feedbacks ?? "")
							.replace(/\\n/g, "\n")
							.replace(/\\t/g, "\t");

						return (
							<div
								key={feedback?._id ?? JSON.stringify(feedback)}
								className="bg-white border border-[#E8E8E8] rounded-2xl p-4 md:p-5"
							>
								<div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between mb-3">
									<div className="text-sm font-semibold text-[#111827]">
										{ownerName || owner?.email || "Користувач"}
									</div>
									<div className="text-xs text-gray-500">
										{owner?.email ? <span className="mr-2">{owner.email}</span> : null}
										{owner?.number ? <span>{owner.number}</span> : null}
									</div>
								</div>

								<div className="text-sm md:text-md leading-[22px] text-[#111827] whitespace-pre-wrap">
									{feedbackText}
								</div>

								{feedback?.createdAt && (
									<div className="mt-3 text-xs text-gray-500">
										{new Date(feedback.createdAt).toLocaleString()}
									</div>
								)}
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
};
export default Feedbacks;