import { PropsProgress } from "./interfaces";
import styles from "./Progress.module.scss";

function Progress({ progress }: PropsProgress) {
  return (
    <div className={styles.container}>
      <div className={styles.progress}>
        <div
          className={styles.line}
          style={{
            width: `${progress >= 100 ? 100 : progress}%`,
            backgroundColor: "#141414",
          }}
        ></div>
      </div>
    </div>
  );
}

export default Progress;
