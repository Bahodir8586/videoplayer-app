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
  const [showFirstForm, setShowFirstForm] = useState(true);
  const [showSecondForm, setShowSecondForm] = useState(false);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);

  const submitFile = useCallback((e) => {
    setIsLoading(true);
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
        setShowSecondForm(false);
        setShowVideoPlayer(true);
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
        if (response.data.video) {
          setVideoSrc(response.data.video);
          setShowVideoPlayer(true);
        } else {
          setEnteredCode(code);
          setShowSecondForm(true);
        }
        setShowFirstForm(false);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  });

  const closePlayer = () => {
    setShowVideoPlayer(false);
    setShowFirstForm(true);
    setShowSecondForm(false);
  };

  const videoElement = <VideoPlayer src={videoSrc} closePlayer={closePlayer} />;
  const formElement2 = (
    <Form
      inputType="file"
      label="Please choose a file"
      onSubmit={(e) => submitFile(e)}
    />
  );
  const formElement1 = (
    <Form
      inputType="text"
      label="Please enter a code"
      onSubmit={(code) => checkCode(code)}
    />
  );

  let page = (
    <>
      {showFirstForm && formElement1}
      {showVideoPlayer && videoElement}
      {showSecondForm && formElement2}
    </>
  );
  if (isLoading) {
    page = <Spinner />;
  }
  return <div className="app">{page}</div>;
}

export default App;
