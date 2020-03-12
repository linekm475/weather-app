import { NavLink } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(NavLink)`
  color: ${props => props.theme.colors.textMain};
  margin: 4px 0;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 18px;
  font-weight: 500;
  text-decoration: none;

  &:hover {
    background-color: ${props => props.theme.colors.hover};
  }

  &.active {
    background-color: ${props => props.theme.colors.blue};
  }
`;
export default StyledLink;
