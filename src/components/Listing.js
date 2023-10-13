import { useState, useEffect } from "react";

function Listing() {
  const [toDo, setToDo] = useState("");
  const [toggle, setToggle] = useState(false);
  const [dataSet, setDataSet] = useState([]);

  function setLocalStorage(setDataLS) {
    window.localStorage.setItem("todo_list_data", JSON.stringify(setDataLS));
  }

  const clearLocalStorage = () => {
    window.localStorage.removeItem("todo_list_data");
    setDataSet([]); // Clear the data in the state
  };

  function handleAddData() {
    const time = getTime();
    const date = getDate();
    const day = getDay();
    const dataToUpdate = dataSet;
    dataToUpdate.push({
      id: Date.now(),
      value: toDo,
      isSelected: false,
      isDeleted: false,
      time: time,
      day: day,
      date: date,
    });
    setDataSet(dataToUpdate);
    setToDo("");
    setLocalStorage(dataToUpdate);
    console.log(dataToUpdate);
  }

  const toggler = () => {
    toggle ? setToggle(false) : setToggle(true);
  };

  const handleClick = (index) => {
    const delData = dataSet.map((data, ind) => {
      const dltDataValue = data;
      if (index === ind && !dltDataValue.isDeleted)
        dltDataValue.isDeleted = true;
      else if (index === ind && dltDataValue.isDeleted)
        dltDataValue.isDeleted = false;
      return { ...dltDataValue };
    });
    setDataSet(delData);
    setLocalStorage(delData);
  };

  const handleActiveClick = (index) => {
    const updatedData = dataSet.map((data, ind) => {
      const dataSetValue = data;
      if (index === ind && !dataSetValue.isSelected)
        dataSetValue.isSelected = true;
      else if (index === ind && dataSetValue.isSelected)
        dataSetValue.isSelected = false;
      return { ...dataSetValue };
    });
    setDataSet(updatedData);
    setLocalStorage(updatedData);
  };

  useEffect(() => {
    const toDoListItems =
      JSON.parse(localStorage.getItem("todo_list_data")) || [];
    setDataSet(toDoListItems);
  }, []);

  // to get current time in '12hour' format

  const getTime = () => {
    const currDate = new Date();
    const hour = currDate.getHours();
    const minute = currDate.getMinutes();
    const AMorPM = hour >= 12 ? "PM" : "AM";

    // convert 24hour into 12hour

    let hour_12 = hour % 12;
    if (hour_12 === 0) hour_12 = 12;
    // convert hour numbers less than 10 into 2 digit number (eg: 5 ==> 05)
    let minute_00 = minute.toString();
    if (minute < 10) minute_00 = `0${minute}`;

    return `${hour_12}:${minute_00} ${AMorPM}`;
  };

  // to get current 'day' of the week

  const getDay = () => {
    const currDate = new Date();
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const day = dayNames[currDate.getDay()];

    return { day };
  };

  // to get current date in 'MMM DD, YYYY' format

  const getDate = () => {
    const currDate = new Date();
    // to split into month, dayNum, year array
    const dateSplit = currDate.toString().slice(4, 15).split(" ");

    return `${dateSplit[0]} ${dateSplit[1]}, ${dateSplit[2]}`;
  };

  return (
    <div className="listing-wrap">
      <div className="add-list">
        <div className="list-input-btn">
          <i onClick={toggler} className="fa-solid fa-plus"></i>
          <span>add list</span>
        </div>
        {toggle && (
          <div className="form-input-row">
            <input
              value={toDo}
              onChange={(e) => setToDo(e.target.value)}
              type="text"
              placeholder="Type here.."
            />
            <i
              onClick={toDo === "" ? null : handleAddData}
              className="fa-solid fa-circle-plus"
            ></i>
          </div>
        )}
      </div>
      <div className="list-item">
        <ul className="listTodo">
          {dataSet.map(({ value, isSelected, isDeleted }, index) => {
            return (
              <li
                className={
                  isDeleted
                    ? "toDo dltToDo"
                    : "toDo" && isSelected
                    ? "toDo actToDo"
                    : "toDo"
                }
                key={index}
              >
                <div className={isSelected ? "input selected" : "input"}>
                  <input
                    value={value}
                    type="checkbox"
                    name="todoCheck"
                    id={index}
                  />
                  <label
                    id={index}
                    htmlFor={index}
                    onClick={() => handleActiveClick(index)}
                  ></label>
                </div>
                <p>{value}</p>
                <div className="dlt-btn">
                  <i
                    className={
                      isDeleted
                        ? "fa-solid fa-rotate-left"
                        : "fa-solid fa-trash-can"
                    }
                    onClick={() => handleClick(index)}
                  ></i>
                </div>
              </li>
            );
          })}
        </ul>
        {dataSet.length > 0 && (
          <div className="clear-button">
            <button onClick={clearLocalStorage}> Clear </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Listing;
