import React, { useState } from "react";

import styles from "./Form.module.css";

const Form = (props) => {
  const [enteredCode, setEnteredCode] = useState("");

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
    setEnteredCode(e.target.value);
  };
  return (
    <div className={styles.form}>
      <div>
        <label htmlFor="input" className={classes.label}>
          {props.label}
        </label>
      </div>

      <div>
        <input
          type={props.inputType}
          id="input"
          value={enteredCode}
          onChange={inputHandler}
          className={classes.input}
        />
      </div>
      <div>
        <button onClick={() => props.onSubmit(enteredCode)}>Submit</button>
      </div>
    </div>
  );
};

export default Form;
