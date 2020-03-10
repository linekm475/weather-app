import React from "react";
import moment from "moment";

import Day from "./Day";

function DayList({ day }) {
  // formatera till ett mer användarvänligt format på datumet
  let date = moment(day.dt_txt).format("dddd");
  return (
    <Day>
      <h2>{date}</h2>
    </Day>
  );
}

export default DayList;
