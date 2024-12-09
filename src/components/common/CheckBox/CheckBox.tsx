import { Fragment } from "react";
import { PropsCheckBox } from "./interfaces";
import clsx from "clsx";
import styles from "./CheckBox.module.scss";

function CheckBox(props: PropsCheckBox) {
  return (
    <Fragment>
      {!!props.onClick ? (
        <div
          onClick={props.onClick}
          className={clsx(styles.checkmarkClick, {
            [styles.checked]: props.checked,
          })}
        ></div>
      ) : (
        <label className={styles.container}>
          <input
            type="checkbox"
            onChange={props.onChange}
            checked={props.checked}
          />
          <span className={styles.checkmark}></span>
        </label>
      )}
    </Fragment>
  );
}

export default CheckBox;
