import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Search = ({ handleSubmit, updateSearch, search }) => (
  <StyledForm onSubmit={handleSubmit}>
    <input
      type="text"
      placeholder="Plats..."
      onChange={updateSearch}
      onBlur={updateSearch}
      value={search}
    />
    <button type="submit">
      <FontAwesomeIcon icon={faSearch} />
    </button>
  </StyledForm>
);

const StyledForm = styled.form`
  display: flex;
  align-items: center;
  input {
    background-color: ${props => props.theme.colors.gray[8]};
    color: white;
    border: 2px solid ${props => props.theme.colors.gray[8]};
    border-radius: 4px 0 0 4px;
    font-size: 16px;
    padding: 8px;
    outline: none;

    &:focus {
      border: 2px solid ${props => props.theme.colors.gray[5]};
      border-right: none;
    }

    &:focus + button {
      border: 2px solid ${props => props.theme.colors.gray[5]};
      border-left: none;
    }
  }

  button {
    background-color: black;
    border: 2px solid black;
    border-radius: 0 3px 3px 0;
    color: white;
    font-size: 14px;
    font-weight: 700;
    padding: 9px 25px;
    cursor: pointer;
    height: 100%;
  }
`;

export default Search;
