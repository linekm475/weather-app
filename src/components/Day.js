import styled from "styled-components";

const Day = styled.div`
  display: flex;
  align-items: center;
  background-color: ${props =>
    props.active ? props.theme.colors.gray[7] : props.theme.colors.gray[8]};
  border-right: 2px solid
    ${props => (props.active ? "none" : props.theme.colors.gray[5])};
  border-bottom: 2px solid ${props => props.theme.colors.gray[5]};
  padding: 5px 15px 0 15px;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.theme.colors.gray[5]};
  }

  &.active {
    border-right: 2px solid ${props => props.theme.colors.gray[5]};
  }

  .left h2 {
    margin: 10px 0 0 10px;
  }

  .temp {
    text-align: right;
    align-self: flex-end;
    margin-bottom: 25px;
    font-size: 30px;
    font-weight: 700;
    width: 100%;
  }
`;

export default Day;
