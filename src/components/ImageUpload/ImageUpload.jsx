import React, { createContext } from "react";
import { useState } from "react";
import "./imageUpload.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import {
  getResultStart,
  getResultSuccess,
  getResultFailure,
  resetResult,
} from "../../redux/ResultRedux";

export default function ImageUpload() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageName, setImageName] = useState("");
  const [result, setResult] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("file", selectedImage, selectedImage.name);

    try {
      setLoading(true);
      dispatch(getResultStart());
      const res = await axios.post("http://5.29.21.28:8000/upload", formData);
      console.log(res);
      // check if image contain face
      if (res.data.containFace === true) {
        setResult({
          age: res.data.age,
          bmi: res.data.bmi,
          sex: res.data.sex,
          containFace: true,
        });
        // disptach result
        dispatch(getResultSuccess(res.data));
        // go to result url
        window.location.replace("/result");
      } else {
        setResult({
          age: null,
          bmi: null,
          sex: null,
          containFace: false,
        });
        dispatch(getResultFailure());
        setError(true);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="image-container">
      <h3 className="image-title">Upload Image</h3>
      {selectedImage && (
        <div className="image-data">
          <img
            className="image-upload"
            id="image"
            alt="not fount"
            width={"250px"}
            title={imageName}
            src={URL.createObjectURL(selectedImage)}
          />
          <p>{imageName}</p>
          {error && (
            <p className="error">
              The picture does not contain a face, please upload a valid
              picture.
            </p>
          )}
          {!loading ? (
            <div className="btn">
              <button
                className="btn remove"
                onClick={() => {
                  setSelectedImage(null);
                  setError(false);
                }}
              >
                Remove
              </button>
              <p>OR</p>
              <button className="btn submit" onClick={handleSubmit}>
                Calculate BMI
              </button>
            </div>
          ) : (
            <p className="processing">processing...</p>
          )}
        </div>
      )}

      {!selectedImage && (
        <div className="image">
          <input
            className="image-input"
            id="image-input"
            type="file"
            name="file"
            accept=".jpeg, .png, .jpg"
            onChange={(event) => {
              console.log(event.target.files[0]);
              setImageName(event.target.files[0].name);
              setSelectedImage(event.target.files[0]);
            }}
          />
          <label htmlFor="image-input" className="image-label">
            <FontAwesomeIcon className="icon" icon={faUpload} />
          </label>
        </div>
      )}
    </div>
  );
}
