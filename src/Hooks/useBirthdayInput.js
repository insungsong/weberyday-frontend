import { useState } from "react";

export default (defaultValue) => {
  var [year, setYear] = useState(defaultValue);
  var [month, setMonth] = useState(defaultValue);
  var [day, setDay] = useState(defaultValue);
  var [birthday, setBirthday] = useState(defaultValue);

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
  var fakeBirthday = "";

  const deleteBirthday = () => {
    setBirthday("");
  };

  if (parseIntMonth <= 9 && parseIntMonth !== 0) {
    month = "0" + month;
    fakeBirthday = year + month + day;
  }
  if (parseIntDay <= 9 && parseIntMonth !== 0) {
    day = "0" + day;
    fakeBirthday = year + month + day;
  }

  fakeBirthday = year + month + day;

  return {
    year,
    setYear,
    month,
    setMonth,
    day,
    setDay,
    fakeBirthday,
    birthday,
    setBirthday,
    deleteBirthday,
    onChange
  };
};
