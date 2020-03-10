import React from "react";
import styled from "styled-components";
import moment from "moment";

const TimeCard = ({ day }) => (
  <StyledTimeCard>
    <p className="date">{moment(day.dt_txt).format("HH:mm")}</p>
    <img src={`/icons/${day.weather[0].icon}.svg`} alt="icon" />
    <p className="desc">{day.weather[0].description}</p>
    <p className="temp">{Math.round(day.main.temp)}&deg;C</p>
  </StyledTimeCard>
);

const StyledTimeCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.1);
  padding: 10px;
  margin: 4px;
  width: 80px;
  max-width: 80px;
  min-width: 80px;
  text-align: center;

  .date {
    font-size: 12px;
    font-weight: 400;
  }

  img {
    width: 50px;
    max-height: 35px;
    margin: 5px auto;
  }

  .desc {
    font-size: 10px;
    font-weight: 400;
    margin-bottom: 4px;
  }

  .temp {
    font-size: 24px;
    font-weight: 700;
  }
`;

export default TimeCard;
