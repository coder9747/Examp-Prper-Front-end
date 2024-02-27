import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Question = () => {
  const [data, setData] = useState(null);
  const [answer, setAnswer] = useState({});
  const [isSubmit, setSubmit] = useState(false);
  const [correct, setCorrect] = useState(0);
  useEffect(() => {
    fetch("https://exam-prpr.onrender.com/api/v1/getall", {
      method: "GET",
    })
      .then((val) => val.json())
      .then((val) => {
        setData(val.data);
      }).catch((err)=>console.log(err))
  }, []);
  function handleChange(value, idx) {
    setAnswer({ ...answer, [idx]: value }); //clever technique
  }
  function handleCheck() {
    setSubmit(true);
    let count = 0;
    for(const [key,value] of Object.entries(answer))
    {
      if(data[key].correct.toLowerCase()==value.toLowerCase())count++;
    }
    setCorrect(count);
    
  }
  function handleClick()
  {
    setAnswer({});
    setSubmit(false);
    setCorrect(0);
  }
  return (
    <div className="flex">
      <h1>Exam Prep</h1>
    { isSubmit &&   <div className="result">
        <div>Attemps {Object.keys(answer).length}</div>
        <div>Correct {correct}</div>
        <div>Wrong {Object.keys(answer).length - correct}</div>
      </div>}
      {data &&
        data.map((item, idx) => {
          return (
            <div className="content" key={idx}>
              <p>{item.question}</p>
              <select onChange={(e) => handleChange(e.target.value, idx)}>
                <option defaultChecked value={"none"}>
                  Choose Option
                </option>
                {item.options.map((o, idx) => (
                  <option value={o} key={idx}>
                    {o}
                  </option>
                ))}
              </select>
              {isSubmit && (
                <p style={{ color: "green" }}>Correct Option: {item.correct}</p>
              )}
            </div>
          );
        })}
      <button className="btn" onClick={handleCheck}>
        Submit
      </button>
      <button onClick={handleClick} style={{backgroundColor:"red"}} className="btn">Reset </button>
      <Link to={'/add'}>Add Question</Link>
    </div>
  );
};

export default Question;
