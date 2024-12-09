import i18n from "~/locale/i18n";
import { PropsLoading } from "./interfaces";
import styles from "./Loading.module.scss";

function Loading({}: PropsLoading) {
  return (
    <div className={styles.container}>
      <div className={styles.ldsSpinner}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <h3 className={styles.text}>{"Đang tải"} . . .</h3>
      <p>Vui lòng chờ, đang tải dữ liệu!</p>
    </div>
  );
}

export default Loading;
