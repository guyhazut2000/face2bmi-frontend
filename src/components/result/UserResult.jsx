import React, { useContext, useEffect, useState } from "react";
import "./userResult.css";
import { useSelector, useDispatch } from "react-redux";
import { resetResult } from "../../redux/ResultRedux";

const UserResult = () => {
  const result = useSelector((state) => state.result.data);
  console.log(result);

  const dispatch = useDispatch();
  const handleClick = (e) => {
    e.preventDefault();
    dispatch(resetResult());
    window.location.replace("/");
  };
  return (
    <>
      <div className="result-container">
        <div className="result-title">Prediction Results</div>
        <div className="result age">age: {result?.age}</div>
        <div className="result bmi">bmi: {result?.bmi}</div>
        <div className="result sex">sex: {result?.sex}</div>
      </div>
      <button onClick={handleClick} className="go-back-btn">
        Go Back
      </button>
    </>
  );
};

export default UserResult;
