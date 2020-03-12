import React from "react";
import styled from "styled-components";

const Error = ({ error }) => {
  let message = "";
  if (
    error.data &&
    error.data.message &&
    error.data.message === "city not found"
  ) {
    message = "Kunde inte hitta ort, var god och försök igen.";
  } else {
    message = "Något gick fel. Försök igen senare.";
  }
  return (
    <StyledError>
      <p>{message}</p>
    </StyledError>
  )
}

const StyledError = styled.div`
  background-color: ${props => props.theme.colors.error};
  color: ${props => props.theme.colors.textMain};
  padding: 10px 16px;
  border-radius: 4px;
  width: 275px;
  margin: 20px auto;
  align-self: start;
  text-align: center;
`;

export default Error;
