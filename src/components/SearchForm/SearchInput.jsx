import SearchIcon from "../Icons/SearchIcon";
import CloseCrossIcon from "../Icons/CloseCrossIcon";

const SearchInput = ({value, onChange, onCloseCrossClick}) => {
	return (
		<div className="relative w-full py-6">
			<span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
			   <SearchIcon classes="w-4 h-4"/>
			</span>
			<span className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 cursor-pointer">
			   <CloseCrossIcon
				   classes="w-4 h-4"
				   onClick={onCloseCrossClick}
			   />
			</span>

			<input
				value={value}
				type="text"
				placeholder="Що ви шукаєте?"
				className="pl-10 pr-4 py-4 w-full bg-[#f6f6f6] rounded-[20px] focus:outline-none focus:ring-2 focus:ring-blue-500 h-[48px]"
				onChange={onChange}
			/>
		</div>
	)
}

export default SearchInput