import { useState } from "react";

export default (defaultValue) => {
  var [year, setYear] = useState(defaultValue);
  var [month, setMonth] = useState(defaultValue);
  var [day, setDay] = useState(defaultValue);

  const onChange = (e) => {
    if (e.target.id === "year") {
      const {
        target: { value: year }
      } = e;
      setYear(year);
    }
    if (e.target.id === "month") {
      const {
        target: { value: month }
      } = e;
      setMonth(month);
    }
    if (e.target.id === "day") {
      const {
        target: { value: day }
      } = e;
      setDay(day);
    }
  };

  var parseIntMonth = parseInt(month);
  var parseIntDay = parseInt(day);
  var birthday = "";

  if (parseIntMonth <= 9 && parseIntMonth !== 0) {
    month = "0" + month;
    birthday = year + month + day;
  }
  if (parseIntDay <= 9 && parseIntMonth !== 0) {
    day = "0" + day;
    birthday = year + month + day;
  }

  const deleteBirthday = () => {
    birthday = "";
    setYear("");
    setMonth("");
    setDay("");
  };

  const updateBirthday = () => {
    birthday = "";
    setYear("0");
    setMonth("0");
    setDay("0");
  };

  birthday = year + month + day;

  return {
    year,
    setYear,
    month,
    setMonth,
    day,
    setDay,
    birthday,
    deleteBirthday,
    updateBirthday,
    onChange
  };
};
