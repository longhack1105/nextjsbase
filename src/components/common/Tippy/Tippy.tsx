import { PropsTippy } from "./interfaces";
import styles from "./Tippy.module.scss";

function Tippy({ content, children }: PropsTippy) {
  const handleHover = (e: any) => {};

  return (
    <div className={styles.container} onTouchStart={handleHover}>
      <div className={styles.message}>{content}</div>
      {children}
    </div>
  );
}

export default Tippy;
