import styled from "styled-components";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { fetchSearchResults } from "../../redux/search/searchSlice";
import { setFilter } from "../../redux/filter/slice";

const SearchContainer = styled.div`
	position:   absolute;
	top:        150px; /* або висота хедера */
	left:       0;
	width:      100%;
	background: white;
	padding:    16px 24px;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	transform:  ${({$isSearchOpen}) =>
			$isSearchOpen ? "translateY(0%)" : "translateY(-120%)"};
	transition: transform 0.3s ease-in-out;
	z-index:    1;
	@media screen and (min-width: 768px) {
		top: 170px;
	}
`;

const Input = styled.input`
  width: 100%;
  padding: 14px 18px;
  font-size: 16px;
  border-radius: 6px;
  border: 1px solid #ccc;
  outline: none;
`;

const SlidingSearchForm = ({ isSearchOpen }) => {
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

  return (
    <SearchContainer $isSearchOpen={isSearchOpen}>
      <form onSubmit={handleSearch}>
        <Input
          type="text"
          placeholder="Що ви шукаєте?"
          value={searchQuery}
          onChange={handleInputChange}
        />
      </form>
    </SearchContainer>
  );
};

export default SlidingSearchForm;
