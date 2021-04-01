import React from "react";
import styles from "./VideoPlayer.module.css";

const VideoPlayer = (props) => {
  return (
    <div className={styles.video}>
      <video controls autoPlay src={props.src} />
    </div>
  );
};

export default VideoPlayer;
