"use client";

import ImageWithFallback from "../Image/ImageWithFallback";
import clsx from "clsx";
import styles from "./ImageFill.module.scss";
import { useStyleClass } from "~/common/hooks/usStyleClass";

function ImageFill({
  src,
  className,
  ...props
}: {
  src: any;
  className?: string;
  [props: string]: any;
}) {
  const styleClass = useStyleClass(props, styles);
  return (
    <div className={styles.container}>
      <div className={clsx(styles.main, className, styleClass)}>
        <ImageWithFallback
          src={src}
          layout="fill"
          alt={props.alt || "error"}
          {...props}
        />
      </div>
    </div>
  );
}

export default ImageFill;
