import styled from "styled-components";

const Overlay = styled.div`
  display: block;
  visibility: hidden;
  position: absolute;
  left 0; //184px;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.8);
  opacity: 0;
  transition: 0.3s;

  @media ${props => props.theme.breakpoints.md} {
    visibility: ${props => props.isOpen ? "visible" : "hidden"};
    opacity: ${props => props.isOpen ? 1 : 0};
  }
`;

export default Overlay;
