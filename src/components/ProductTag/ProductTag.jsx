import React, {useEffect, useState} from "react";
import axios from "axios";
import {FilterWrapper, FilterTitle, FilterLabel} from "./productTag.styled";

const ProductTag = ({selectedTags, onChange}) => {
	const [groupedTags, setGroupedTags] = useState({});

	useEffect(() => {
		const fetchTags = async () => {
			try {
				const res = await axios.get("/filter-tags/group-tag");
				setGroupedTags(res.data);
			} catch (error) {
				console.error("Failed to fetch tags:", error);
			}
		};

		fetchTags();
	}, []);

	const toggleTag = (id) => {
		onChange((prev) =>
			prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
		);
	};

	return (
		<FilterWrapper>
			{Object.entries(groupedTags).map(([type, tags]) => (
				<div key={type} style={{display: "flex", flexDirection: "column"}}>
					<FilterTitle>{type}</FilterTitle>
					{tags.map(({id, value}) => (
						<FilterLabel key={id}>
							<input
								type="checkbox"
								checked={selectedTags.includes(id)}
								onChange={() => toggleTag(id)}
							/>{" "}
							{value}
						</FilterLabel>
					))}
				</div>
			))}
		</FilterWrapper>
	);
};

export default ProductTag;
