import "./App.css";
import styled from "styled-components";
import { useState } from "react";
import axios from "axios";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
  padding: 20px;
  /* border: 10px green solid; */
  margin: auto 0;
  padding: 10px;
  color: white;
`;
const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: white;
`;
const ResultTitle = styled.h1`
  font-size: 1em;
  color: black;
`;

const Header = styled.h1`
  font-size: 3.5em;
  margin-bottom: 5px;
  text-align: center;
  color: white;
`;
const ResultHeader = styled.h1`
  font-size: 2em;
  margin-bottom: 5px;
  text-align: center;
  color: black;
`;

const InputWrapper = styled.div`
  margin-top: 100px;
  padding: 0 100px;
  flex-direction: column;
  /* border: 2px solid red; */
`;

const HeightWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeightInput = styled.input`
  width: 200px;
`;

const HeightSelect = styled.select`
  margin-left: 15px;
`;

const Results = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 1px 2px 0px 14px rgba(64, 212, 255, 0);
  background-color: white;
  color: black;
  padding: 10px;
  margin: auto;
`;

const BMIButton = styled.button`
  margin: auto;
  margin-top: 50px;
  font-size: xx-large;
  padding: 10px 30px;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  &:hover {
    color: rgb(67, 175, 218);
  }
`;
const Loading = styled.div`
  margin: auto;
  margin-top: 50px;
  font-size: xx-large;
  padding: 10px 30px;
`;

const Image = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [result, setResult] = useState({});
  const [loading, setLoading] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("file", selectedImage, selectedImage.name);

    try {
      // const config = { responseType: "blob" };
      // const config = {
      // headers: {
      //   "Access-Control-Allow-Origin": "*",
      //   "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      // },
      // };
      setLoading(true);
      const res = await axios.post(
        "http://127.0.0.1:8000/upload",
        // "https://81lpku.deta.dev/upload",
        formData
        // config
        // config
      );
      console.log(res);
      // check if image contain face
      if (res.data.containFace === true) {
        setResult({
          age: res.data.age,
          bmi: res.data.bmi,
          sex: res.data.sex,
          containFace: true,
        });
      } else {
        setResult({
          age: null,
          bmi: null,
          sex: null,
          containFace: false,
        });
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Container>
        <Header>Face 2 BMI</Header>
        <Title> Inferring BMI from Face Data.</Title>
        {!result.containFace && (
          <InputWrapper>
            <h3>Upload Image</h3>
            <Image>
              {selectedImage && (
                <div>
                  <img
                    id="image"
                    alt="not fount"
                    width={"250px"}
                    src={URL.createObjectURL(selectedImage)}
                  />
                  <br />
                  <button
                    onClick={() => {
                      setSelectedImage(null);
                      setResult({ ...result, containFace: false });
                    }}
                  >
                    Remove
                  </button>
                  <br />
                  <br />
                </div>
              )}
            </Image>

            {!selectedImage && (
              <input
                type="file"
                name="myImage"
                accept=".jpeg, .png, .jpg"
                onChange={(event) => {
                  // console.log(event.target.files[0]);
                  setSelectedImage(event.target.files[0]);
                }}
              />
            )}
            <br />
            <br />
            {/* <HeightInput
            type="number"
            placeholder="Enter Your Height"
            min="0"
            max="250"
          />
          <HeightSelect>
            <option value="0">CM</option>
            <option value="1">Feet</option>
          </HeightSelect> */}
          </InputWrapper>
        )}
        {result.containFace && (
          <>
            <Results className="predictions">
              <ResultHeader>Prediction results:</ResultHeader>
              <ResultTitle>age: {result.age}</ResultTitle>
              <ResultTitle>bmi: {result.bmi}</ResultTitle>
              <ResultTitle>sex: {result.sex}</ResultTitle>
            </Results>
            <BMIButton onClick={(e) => window.location.reload()}>
              Refresh
            </BMIButton>
          </>
        )}
        {loading && <Loading>Processing request...</Loading>}
        {!result.containFace && (
          <BMIButton onClick={(e) => handleClick(e)}>Calculate BMI</BMIButton>
        )}{" "}
      </Container>
    </>
  );
}

export default App;
