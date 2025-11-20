const statuses = [
	"Новий",
	"Прийняте в роботу",
	"Збирається",
	"Зібрано",
	"Відправлено",
	"Відміна",
];

const StatusOptions = ({selected, classes, setStatus, withNoSelected = true}) => {
	return (
		<div className={`absolute top-[90%] left-0 bg-white w-full py-4 text-sm leading-[14px] z-10 rounded-lg shadow-2xl ${classes ?? ''}`}>
			{statuses.map((status, index) => (
				<div key={index}
					className={`px-4 py-1.5 cursor-pointer ${selected && selected === status ? "bg-[#FFE8F5]" : ""}`}
					onClick={setStatus ? () => setStatus(status === selected ? (withNoSelected ? null : status) : status) : null}
				>
					{status}
				</div>
			))}
		</div>
	)
}

export default StatusOptions