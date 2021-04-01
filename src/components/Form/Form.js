import React, { useState, useEffect } from "react";

import styles from "./Form.module.css";
import strings from "../../constants/strings";

const Form = (props) => {
  const [inputValue, setinputValue] = useState("");
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (inputValue) {
      setDisabled(false);
      return;
    }
    setDisabled(true);
  }, [inputValue]);

  let classNames = [
    {
      label: styles.labelForText,
      input: styles.inputForText,
    },
    {
      label: styles.labelForFile,
      input: styles.inputForFile,
    },
  ];
  let classes = classNames[0];
  if (props.inputType === "file") {
    classes = classNames[1];
  }

  const inputHandler = (e) => {
    if (props.inputType === "file") {
      setinputValue(e.target.files[0]);
      return;
    }
    setinputValue(e.target.value);
  };
  const submitHandler = () => {
    if (!inputValue) {
      return;
    }
    props.onSubmit(inputValue);
  };
  return (
    <div className={styles.form}>
      <div>
        <label htmlFor="input" className={classes.label}>
          {props.label}
        </label>
      </div>
      {props.inputType === "file" && (
        <div>
          <span>{inputValue.name}</span>
        </div>
      )}

      <div>
        <input
          type={props.inputType}
          id="input"
          onChange={inputHandler}
          className={classes.input}
          autoComplete="off"
        />
      </div>
      <div>
        <button
          className={disabled ? styles.disabled : " "}
          onClick={submitHandler}
        >
          {strings.submit}
        </button>
      </div>
    </div>
  );
};

export default Form;
