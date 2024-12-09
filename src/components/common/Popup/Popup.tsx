import React, { Fragment, memo, useEffect } from "react";

import Portal from "../Portal";
import clsx from "clsx";
import style from "./Popup.module.scss";

/*===========> INTERFACE <==========*/
interface props {
  open: boolean;
  isFull?: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  [props: string]: any;
}

/*===========> MAIN COMPONENT <==========*/
function Overlay({ open, onClose, isFull, children }: props) {
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
          <div className={clsx(style.overlay, "click")} onClick={onClose}></div>
          <div className={clsx(style.main, { [style.isFull]: isFull })}>
            {children}
          </div>
        </Portal>
      )}
    </Fragment>
  );
}

export default memo(Overlay);
