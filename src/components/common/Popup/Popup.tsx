import React, { Fragment, memo, useEffect } from "react";

import Portal from "../Portal";
import clsx from "clsx";
import styles from "./Popup.module.scss";
import { useStyleClass } from "~/common/hooks/usStyleClass";

/*===========> INTERFACE <==========*/
interface props {
  open: boolean;
  isFull?: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  [props: string]: any;
}

/*===========> MAIN COMPONENT <==========*/
function Overlay({ open, onClose, isFull, children, ...props }: props) {
  const styleClass = useStyleClass(props, styles);

  useEffect(() => {
    if (open) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "overlay";
    }

    return () => {
      document.body.style.overflowY = "overlay";
    };
  }, [open]);

  return (
    <Fragment>
      {open && (
        <Portal>
          <div className={clsx(styles.overlay, "click")} onClick={onClose}></div>
          <div className={clsx(styles.main, styles, "global-color", { [styles.isFull]: isFull })}>{children}</div>
        </Portal>
      )}
    </Fragment>
  );
}

export default memo(Overlay);
