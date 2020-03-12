import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`;

const Loading = styled.div`
  width: 70px;
  height: 70px;
  background-color: ${props => props.theme.colors.transparent};
  margin: auto 0;
  border-radius: 50%;
  border: 8px solid ${props => props.theme.colors.bgSecondary};
  border-top: 8px solid ${props => props.theme.colors.blue};
  animation: 0.8s infinite ${spin} ease-in-out;
`;

export default Loading;
