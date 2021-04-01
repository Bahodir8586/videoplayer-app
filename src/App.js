import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";

import VideoPlayer from "./components/VideoPlayer/VideoPlayer";
import Form from "./components/Form/Form";
import Spinner from "./components/Spinner/Spinner";

import "./App.css";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [enteredCode, setEnteredCode] = useState("");
  const [videoSrc, setVideoSrc] = useState("");

  useEffect(() => {
    setVideoSrc("");
    setIsLoading(false);
    setEnteredCode("");
  }, []);

  const submitFile = useCallback((e) => {
    setIsLoading(true);
    console.log(e);
    // const formData={
    //   File: e,
    //   Code: enteredCode,
    //   Template: 1,
    // };
    const formData = new FormData();
    formData.append("File", e);
    formData.append("Code", enteredCode);
    formData.append("Template", 1);
    axios
      .post("https://dev.gift.routeam.ru/api", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setIsLoading(false);
        console.log(response);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  });
  const checkCode = useCallback((code) => {
    setIsLoading(true);
    axios
      .get(`https://dev.gift.routeam.ru/api/${code}`)
      .then((response) => {
        console.log(response.data.video);
        if (response.data.video) {
          setVideoSrc(response.data.video);
        } else {
          setEnteredCode(code);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  });
  let videoElement = videoSrc ? <VideoPlayer src={videoSrc} /> : null;
  let formElement = enteredCode && (
    <Form
      inputType="file"
      label="Please choose a file"
      onSubmit={(e) => submitFile(e)}
    />
  );

  let page = (
    <>
      {!enteredCode && (
        <Form
          inputType="text"
          label="Please enter a code"
          onSubmit={(code) => checkCode(code)}
        />
      )}
      {videoElement}
      {formElement}
    </>
  );
  if (isLoading) {
    page = <Spinner />;
  }
  return <div className="app">{page}</div>;
}

export default App;
