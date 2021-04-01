import React from "react";
import styles from "./VideoPlayer.module.css";

const VideoPlayer = (props) => {
  return (
    <div className={styles.video}>
      <button onClick={props.closePlayer}>Close</button>
      <video controls autoPlay src={props.src} width="800" height="450" />
    </div>
  );
};

export default VideoPlayer;
