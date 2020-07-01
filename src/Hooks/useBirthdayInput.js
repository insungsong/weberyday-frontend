import { useState } from "react";

export default (defaultValue) => {
  var [year, setYear] = useState(defaultValue);
  var [month, setMonth] = useState(defaultValue);
  var [day, setDay] = useState(defaultValue);
  let fBirthday = "";
  let fYear = "";
  let fMonth = "";
  let fDay = "";
  const onChange = (e) => {
    if (e.target.id === "year") {
      const {
        target: { value: year }
      } = e;
      fYear = year;
      setYear(year);
    }
    if (e.target.id === "month") {
      const {
        target: { value: month }
      } = e;
      fMonth = month;
      setMonth(month);
    }
    if (e.target.id === "day") {
      const {
        target: { value: day }
      } = e;
      fDay = day;
      setDay(day);
    }
  };

  var parseIntMonth = parseInt(month);
  var parseIntDay = parseInt(day);
  var birthday = "";
  if (parseIntMonth <= 9) {
    month = "0" + month;
    birthday = year + month + day;
    fBirthday = year + month + day;
  }
  if (parseIntDay <= 9) {
    day = "0" + day;
    birthday = year + month + day;
    fBirthday = year + month + day;
  }
  birthday = year + month + day;
  fBirthday = year + month + day;
  return {
    year,
    setYear,
    month,
    setMonth,
    day,
    setDay,
    birthday,
    onChange
  };
};
