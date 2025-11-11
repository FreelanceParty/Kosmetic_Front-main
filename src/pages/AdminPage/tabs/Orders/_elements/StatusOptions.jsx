const statuses = [
	"Новий",
	"Прийняте в роботу",
	"Збирається",
	"Зібрано",
	"Відправлено",
	"Відміна",
];

const StatusOptions = ({selected, classes, setStatus}) => {
	return (
		<div className={`absolute top-[90%] left-0 bg-white w-full py-4 text-sm leading-[10px] z-10 rounded-lg shadow-2xl ${classes ?? ''}`}>
			{statuses.map((status, index) => (
				<div key={index}
					className={`px-4 py-2 cursor-pointer ${selected && selected === status ? "bg-[#FFE8F5]" : ""}`}
					onClick={setStatus ? () => setStatus(status === selected ? null : status) : null}
				>
					{status}
				</div>
			))}
		</div>
	)
}

export default StatusOptions