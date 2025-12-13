const NumberInput = ({limit = 9999, number, setNumber, withNegative = false, min = 1}) => {

	return (
		<div className="flex w-[130px] border items-center justify-between rounded-md text-center h-[45px]">
			<div className="cursor-pointer w-1/3" onClick={() => setNumber(number > 1 ? number - 1 : 1)}>-</div>
			<input
				onChange={(e) => {
					const value = e.target.value
					if (withNegative) {
						if (/^-?\d*$/.test(value)) {
							setNumber(Number.parseInt(value))
						}
					} else {
						if (/^\d*$/.test(value)) {
							setNumber(Number.parseInt(value))
						}
					}
					if (value < min && value !== '') {
						setNumber(Number.parseInt(min))
					}
				}}
				className="h-full w-[50px] outline-none bg-transparent text-center" value={number}
				maxLength={4}
			/>
			<div className="cursor-pointer w-1/3" onClick={() => setNumber(number < limit ? number + 1 : number)}>+</div>
		</div>
	)
}

export default NumberInput