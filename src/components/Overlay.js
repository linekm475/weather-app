import styled from "styled-components";

const Overlay = styled.div`
  display: block;
  visibility: hidden;
  position: absolute;
  left 0;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: ${props => props.theme.colors.overlay};
  opacity: 0;
  transition: 0.3s;

  @media ${props => props.theme.breakpoints.md} {
    visibility: ${props => props.isOpen ? "visible" : "hidden"};
    opacity: ${props => props.isOpen ? 1 : 0};
  }
`;

export default Overlay;
