import React, { useState } from "react";
import { Link } from "react-router-dom";

const AddQuestion = () => {
    const [questionInfo,setInfo] = useState({
        question:"",
        optoin1:"",
        optoin2:"",
        optoin3:"",
        correct:"",
    });
    const handleSubmit = (e)=>{
        e.preventDefault();
        const {question,optoin1,optoin2,optoin3,correct} = questionInfo;
        if(question && optoin1 && optoin2 && optoin3 && correct)
        {
            const data = {question,options:[optoin1,optoin2,optoin3,correct],correct};
            fetch("https://exam-prpr.onrender.com/api/v1/add",{
                method:"POST",
                headers:{
                  'Content-type':"application/json",
                },
                body:JSON.stringify(data),
            }).then((val)=>{
               return val.json();
            }).then((val)=>{
              if(val.succes)alert("Question Added Succes");
            }).catch(err=>{
              console.log(err);
            })

        }
        else
        {
            alert("Some Empty Field");
        }
    }
    function handleChange(e)
    {
        setInfo({...questionInfo,[e.target.name]:e.target.value});
    }
  return (
    <div className="front-end">
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input name="question" onChange={handleChange} placeholder="Enter Question" />
        <input name="optoin1" onChange={handleChange} className="bg-red" placeholder="Enter Option 1" />
        <input name="optoin2" onChange={handleChange} className="bg-red" placeholder="Enter Option 2" />
        <input name="optoin3" onChange={handleChange} className="bg-red" placeholder="Enter Option 3" />
        <input name="correct" onChange={handleChange} className="bg-green" placeholder="Enter Option 4" />
        <button>Submit</button>
        <Link to={'/'}>Home</Link>
      </form>
    </div>
  );
};

export default AddQuestion;
