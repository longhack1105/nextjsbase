import { PropsWrapperContainer } from "./interfaces";
import React from "react";
import clsx from "clsx";
import styles from "./WrapperContainer.module.scss";

function WrapperContainer({
  children,
  margin = true,
  bg = true,
  padding = true,
}: PropsWrapperContainer) {
  return (
    <div
      className={clsx(styles.container, {
        [styles.margin]: margin,
        [styles.bg]: bg,
        [styles.padding]: padding,
      })}
    >
      {children}
    </div>
  );
}

export default WrapperContainer;
