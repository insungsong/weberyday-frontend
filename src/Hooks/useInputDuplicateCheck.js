import { useState } from "react";

export default (defaultValue) => {
  let fakeArr = [];
  const [value, setValue] = useState(defaultValue);
  const [arr, setArr] = useState(fakeArr);
  const [filter, setFilter] = useState("Yes");

  const onChange = (e) => {
    const {
      target: { checked }
    } = e;

    if (checked) {
      if (!arr.includes(e.target.id)) {
        arr.push(e.target.id);
        fakeArr = arr;
        setArr(fakeArr);
        arr.sort();
      }
    }
    if (!checked) {
      arr.splice(arr.indexOf(e.target.id), 1);
      fakeArr = arr;
      setArr(fakeArr);
      arr.sort();

      //체크를 여러개 했다가 마지막 남은 체크하나를 해지했을때 배열의 반응이 느려서 넣어줌 버그부분
      if (arr.length === 0) {
        setArr([]);
      }
    }
  };

  return { value, setValue, onChange, arr, setArr, filter, setFilter };
};
