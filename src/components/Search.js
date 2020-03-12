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
    background-color: ${props => props.theme.colors.bgSecondary};
    color: ${props => props.theme.colors.textMain};
    border: 2px solid ${props => props.theme.colors.bgSecondary};
    border-radius: 4px 0 0 4px;
    font-size: 17px;
    padding: 8px;
    height: 40px;
    outline: none;

    &:focus {
      border: 2px solid ${props => props.theme.colors.blue};
      border-right: none;
    }

    &:focus + button {
      border: 2px solid ${props => props.theme.colors.blue};
      border-left: none;
    }
  }

  button {
    background-color: ${props => props.theme.colors.bgSecondary};
    border: 2px solid ${props => props.theme.colors.bgSecondary};
    border-radius: 0 3px 3px 0;
    color: ${props => props.theme.colors.textMain};
    font-size: 14px;
    font-weight: 700;
    padding: 9px 25px;
    cursor: pointer;
    height: 40px;
    outline: none;

    &:hover {
      background-color: ${props => props.theme.colors.hover};
      border: 2px solid ${props => props.theme.colors.hover};
    }
  }
`;

export default Search;
