const NumberInput = ({limit, number, setNumber}) => {

	return (
		<div className="flex items-center justify-between w-[130px] border rounded-md text-center h-[45px]">
			<div className="cursor-pointer w-1/3" onClick={() => setNumber(number > 1 ? number - 1 : 1)}>-</div>
			<div>{number}</div>
			<div className="cursor-pointer w-1/3" onClick={() => setNumber(number < limit ? number + 1 : number)}>+</div>
		</div>
	)
}

export default NumberInput