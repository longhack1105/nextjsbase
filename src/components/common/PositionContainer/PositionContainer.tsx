import { Fragment, useEffect, useRef, useState } from "react";

import { PropsPositionContainer } from "./interfaces";
import ReactDOM from "react-dom";
import clsx from "clsx";
import styles from "./PositionContainer.module.scss";

function PositionContainer({
  children,
  open,
  onClose,
  disableOverlay,
  idParent,
  classStyle,
}: PropsPositionContainer) {
  const ref = useRef<any>(null);
  const [isReady, setIsReady] = useState(false);
  const [on, setOn] = useState(false);
  useEffect(() => {
    if (!!document && open) {
      setIsReady(true);
      const id = setTimeout(() => setOn(true), 50);
      return () => clearTimeout(id);
    } else {
      setOn(false);
      const id = setTimeout(() => setIsReady(false), 200);
      return () => clearTimeout(id);
    }
  }, [open]);

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

  useEffect(() => {
    if (disableOverlay) {
      const handleClick = (e: any) => {
        const container = e.target.closest(".click");

        if (
          ref.current &&
          !ref.current.contains(e.target) &&
          !container &&
          !container?.classList?.contains("click")
        ) {
          onClose();
        }
      };
      document.addEventListener("mouseup", handleClick);
      return () => document.removeEventListener("mouseup", handleClick);
    }
  }, [disableOverlay, onClose, ref]);

  return (
    <Fragment>
      {isReady ? (
        <Portal idParent={idParent}>
          <div className={styles.wrapper}>
            {!disableOverlay ? (
              <div
                className={clsx({ [styles.overlay]: on })}
                onClick={onClose}
                style={{
                  zIndex: classStyle?.main ? "-1" : "1000",
                }}
              ></div>
            ) : null}
            <div
              ref={ref}
              className={clsx(
                styles.container,
                { [styles.image_open]: classStyle?.main == "image" },
                classStyle?.main,
                {
                  [styles.open]: on,
                  [`${classStyle?.open}`]: on,
                }
              )}
            >
              {children}
            </div>
          </div>
        </Portal>
      ) : null}
    </Fragment>
  );
}

function Portal({ children, idParent }: any) {
  const portal = useRef(document.createElement("div"));

  useEffect(() => {
    if (!!idParent) {
      const el: any = document.getElementById(idParent);
      el.appendChild(portal.current);
      return () => {
        el.removeChild(portal.current);
      };
    } else {
      document.body.appendChild(portal.current);
      return () => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        document.body.removeChild(portal.current);
      };
    }
  }, [idParent]);

  return portal.current
    ? ReactDOM.createPortal(children, portal.current)
    : null;
}

export default PositionContainer;
