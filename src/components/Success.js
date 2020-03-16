import styled from "styled-components";

const Success = styled.div`
  align-self: start;
  background-color: ${props => props.theme.colors.success};
  color: ${props => props.theme.colors.textMain};
  padding: 10px 16px;
  border-radius: 4px;
  width: 275px;
  margin: 20px auto;
  text-align: center;
`;

export default Success;
