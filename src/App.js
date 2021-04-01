import React, { useState, useCallback, useEffect } from "react";
import axios from "./axios";

import VideoPlayer from "./components/VideoPlayer/VideoPlayer";
import Form from "./components/Form/Form";
import Spinner from "./components/Spinner/Spinner";
import Modal from "./components/Modal/Modal";

import "./App.css";
import strings from "./constants/strings";

function App() {
  // The most important information
  const [enteredCode, setEnteredCode] = useState("");
  const [videoSrc, setVideoSrc] = useState("");
  // Conditional rendering the content
  const [isLoading, setIsLoading] = useState(false);
  const [showFirstForm, setShowFirstForm] = useState(true);
  const [showSecondForm, setShowSecondForm] = useState(false);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const submitFile = useCallback((file) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("File", file);
    formData.append("Code", enteredCode);
    formData.append("Template", 1);
    axios
      .post("/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        axios
          .get(`/${enteredCode}`)
          .then((response) => {
            setVideoSrc(response.data.video);
            setShowVideoPlayer(true);
            setShowSecondForm(false);
            setIsLoading(false);
          })
          .catch((error) => {
            setShowErrorMessage(true);
            initialState();
          });
      })
      .catch((error) => {
        setShowErrorMessage(true);
        initialState();
      });
  });
  const checkCode = useCallback((code) => {
    setIsLoading(true);
    axios
      .get(`/${code}`)
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
        setShowErrorMessage(true);
        initialState();
      });
  });

  const initialState = () => {
    setShowFirstForm(true);
    setShowSecondForm(false);
    setShowVideoPlayer(false);
    setIsLoading(false);
    setVideoSrc("");
    setEnteredCode("");
  };

  const videoElement = (
    <VideoPlayer src={videoSrc} closePlayer={initialState} />
  );
  const formElement2 = (
    <Form
      inputType="file"
      label={strings.chooseFile}
      onSubmit={(file) => submitFile(file)}
    />
  );
  const formElement1 = (
    <Form
      inputType="text"
      label={strings.enterCode}
      onSubmit={(code) => checkCode(code)}
    />
  );
  const errorElement = (
    <Modal
      show={showErrorMessage}
      modalClosed={() => setShowErrorMessage(false)}
    >
      {strings.errorMessage}
    </Modal>
  );

  let page = (
    <>
      {showFirstForm && formElement1}
      {showVideoPlayer && videoElement}
      {showSecondForm && formElement2}
      {showErrorMessage && errorElement}
    </>
  );
  if (isLoading) {
    page = <Spinner />;
  }
  return <div className="app">{page}</div>;
}

export default App;
