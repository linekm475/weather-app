import { NavLink } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(NavLink)`
  color: white;
  margin: 4px 0;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 18px;
  font-weight: 500;
  text-decoration: none;

  &:hover {
    background-color: rgba(0, 0, 0, 0.9);
  }

  &.active {
    background-color: #2B6CB0;
  }
`;
export default StyledLink;
