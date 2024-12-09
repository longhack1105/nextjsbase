// import { PropsState } from "./interfaces";
import { useStyleClass } from "~/common/hooks/usStyleClass";
import styles from "./State.module.scss";
import clsx from "clsx";
import React from "react";

export interface PropsState {
  children: React.ReactNode;
  className?: string;
  style?: any;
  [props: string]: any;
}

function State({ children, className, style, ...props }: PropsState) {
  const styleClass = useStyleClass(props, styles);

  return (
    <span className={clsx(styles.container, styleClass) + " " + className} style={style}>
      {children}
    </span>
  );
}

export default State;
