import React, { useState } from "react";

import styles from "./Form.module.css";

const Form = (props) => {
  const [inputValue, setinputValue] = useState("");

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
          //   value={inputValue}
          onChange={inputHandler}
          className={classes.input}
          autoComplete="off"
        />
      </div>
      <div>
        <button onClick={() => props.onSubmit(inputValue)}>Submit</button>
      </div>
    </div>
  );
};

export default Form;
