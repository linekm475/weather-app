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
  width: 50px;
  height: 50px;
  background-color: rgba(0, 0, 0, 0);
  border-radius: 50%;
  border: 6px solid gray;
  border-top: 6px solid blue;
  animation: 0.8s infinite ${spin} ease-in-out;
`;

export default Loading;
