import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Textarea = styled.textarea`
	width:         100%;
	min-height:    200px;
	border-radius: 15px;
	padding:       6px 10px;
	margin-top:    10px;
`;

export const Input = styled.input`
  border-radius: 15px;
  padding: 3px 10px;
  margin-top: 10px;
`;

export const DivFilterInputContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
`;

export const SearcInput = styled.input`
  border-radius: 15px;
  padding: 16px 175px 16px 10px;
  margin-top: 10px;
  width: 100%;
  margin-right: 8px;
`;
export const AddDefaultEmailButton = styled.button`
  border-radius: 15px;
  padding: 5px 8px;
  margin-top: 10px;
  background-color: #ffe9fa;

  right: 0;
  width: 165px;
  font-size: 16px;
`;

export const Button = styled.button`
  border-radius: 15px;
  padding: 14px 10px;
  margin-top: 10px;
  background-color: #ffe9fa;
`;

export const Li = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 4px;
  border-bottom: 1px solid #9797a5;
  padding: 2px;
`;

export const Ul = styled.ul`
  margin-top: 10px;
  border: 1px solid #9797a5;
  padding: 5px;
  border-radius: 20px;
`;

export const DeleteButton = styled.button`
  border-radius: 15px;
  padding: 8px 14px;
`;
