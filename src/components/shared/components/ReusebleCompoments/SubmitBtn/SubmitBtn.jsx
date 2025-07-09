import React from 'react';
import {SubmitBTN} from './SubmitBtnStyled';

const SubmitBtn = ({onClick, text}) => {
	const handleSubmit = (e) => {
		e.preventDefault();
		if (onClick) {
			onClick(e);
		}
	};

	return (
		<SubmitBTN type="submit" onClick={handleSubmit}>
			{text}
		</SubmitBTN>
	);
};

export default SubmitBtn;
