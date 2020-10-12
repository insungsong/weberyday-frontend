import React from "react";
import styled from "styled-components";

const Container = styled.input`
  width: 90%;
  padding: 10px;
  margin-bottom: 20px;
  border: solid 1px #eef1f4;
`;

const NumberInputContainer = styled.input.attrs({ type: "number" })`
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  width: 90%;
  padding: 10px;
  margin-bottom: 20px;
  border: solid 1px #eef1f4;
`;

const DescriptionContainer = styled.input`
  width: 90%;
  padding: 10px;
  border: solid 1px #eef1f4;
  margin-bottom: 12px;
`;

const MeInputContainer = styled.input`
  width: 90%;
  padding: 10px;
  border: solid 1px #eef1f4;
  margin-bottom: 12px;
  display: block;
  margin-top: 10px;
`;

const Input = ({
  id,
  placeholder,
  focus = false,
  value,
  onChange,
  type = "text",
  readOnly,
  selectInput = "container",
  onFocus
}) => {
  return (
    <>
      {selectInput === "number" && (
        <NumberInputContainer
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          type={type}
          autoFocus={focus}
          readOnly={readOnly}
        />
      )}
      {selectInput === "container" && (
        <Container
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          type={type}
          autoFocus={focus}
          readOnly={readOnly}
          onFocus={onFocus}
        />
      )}
      {selectInput === "description" && (
        <DescriptionContainer
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          type={type}
          autoFocus={focus}
          readOnly={readOnly}
        />
      )}

      {selectInput === "meInput" && (
        <MeInputContainer
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          type={type}
          autoFocus={focus}
          readOnly={readOnly}
        />
      )}
    </>
  );
};

export default Input;
