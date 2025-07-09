import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {SearchFormContainer, SearchInput} from "./searchForm.styled";
import {fetchSearchResults} from "../../redux/search/searchSlice";
import {setFilter} from "../../redux/filter/slice";

const SearchForm = ({isSearchOpen}) => {
	const [searchQuery, setSearchQuery] = useState("");

	const navigate = useNavigate();
	// const dispatch = useDispatch();

	const handleInputChange = (e) => {
		setSearchQuery(e.target.value);
	};

	const handleSearch = (e) => {
		e.preventDefault();
		if (searchQuery.trim() === "") {
			toast.error("Введіть пошуковий запит");
			setSearchQuery("");
			return;
		}

		navigate(`/search?query=${encodeURIComponent(searchQuery)}&page=1`);
		setSearchQuery("");
	};

	// const handleSearch = (e) => {
	//   e.preventDefault();
	//   if (searchQuery.trim() === "") {
	//     toast.error("Введіть пошуковий запит");
	//     setSearchQuery("");
	//     return;
	//   }

	//   setSearchQuery(e.target.value);
	//   dispatch(setFilter(searchQuery));
	//   // dispatch(fetchSearchResults({ query: searchQuery, limit: 2, page: 1 }));

	//   navigate(`/search?query=${searchQuery}`);
	//   setSearchQuery("");
	// };
	return (
		<SearchFormContainer $isSearchOpen={isSearchOpen}>
			<form onSubmit={handleSearch}>
				<SearchInput
					type="text"
					placeholder="Пошук"
					value={searchQuery}
					onChange={handleInputChange}
				/>
				{/* <button type="submit">
        <BsSearch />
      </button> */}
			</form>
		</SearchFormContainer>
	);
};

export default SearchForm;
