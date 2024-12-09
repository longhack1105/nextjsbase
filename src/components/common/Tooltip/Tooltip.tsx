// import { PropsAvatar } from "./interfaces";
import clsx from "clsx";
import styles from "./Tooltip.module.scss";
import TippyHeadless from "@tippyjs/react/headless";
import { ReactNode, useState } from "react";

function Tooltip({ html, className, children }: { children: ReactNode; html: ReactNode; className?: any }) {
  const [show, setShow] = useState<boolean>(false);

  return (
    <div className={clsx(styles.container, className)}>
      <TippyHeadless
        maxWidth={"100%"}
        interactive
        visible={!!show}
        onClickOutside={() => setShow(false)}
        placement="bottom-start"
        render={(attrs) => <div className={styles.popup}>{html}</div>}
      >
        <div className={styles.children} onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
          {children}
        </div>
      </TippyHeadless>
    </div>
  );
}

export default Tooltip;
