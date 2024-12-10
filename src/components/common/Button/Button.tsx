//"use client";

import Link from "next/link";
import clsx from "clsx";
import styles from "./Button.module.scss";
import { useStyleClass } from "~/common/hooks/usStyleClass";

interface props {
  onClick?: () => void;
  children?: React.ReactNode;
  href?: any;
  div?: boolean;
  [props: string]: any;
}

function Button({ children, onClick, href, className, target, div, ...props }: props): any {
  const styleClass = useStyleClass(props, styles);

  let onClickHandler: any = null;

  let Wapper: any = onClick ? "div" : "button";
  let Comp: any = "div";

  if (href) {
    Wapper = Link;
    Comp = "div";
  }

  const handleClick = (e: any) => {
    if (props.disable) {
      e.preventDefault();
    }

    if (!props.disable && onClick) {
      onClick();
    }
  };

  if (!href) {
    onClickHandler = {
      onClick: handleClick,
    };
  }

  return (
    <Wapper
      className={clsx(styles.container, {
        [styles.maxContent]: props.maxContent,
        [styles.maxHeight]: props.maxHeight,
        [styles.onClick]: !!onClick,
      })}
      href={href as string}
      {...onClickHandler}
    >
      <Comp className={clsx(styleClass, styles.btn, className)}>
        <div className={styles.text}>{children}</div>
      </Comp>
    </Wapper>
  );
}

export default Button;
