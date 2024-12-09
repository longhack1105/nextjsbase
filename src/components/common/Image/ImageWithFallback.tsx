"use client";

import React, { useEffect, useState } from "react";

import Image from "next/legacy/image";
import icons from "~/constants/images/icons";
import styles from "./ImageWithFallback.module.scss";

const ImageWithFallback = (props: any) => {
  const { src, fallbackSrc, alt, ...rest } = props;
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  function checkSrc(srcStr: string) {
    if (
      !`${srcStr}`?.startsWith("blob") &&
      !`${srcStr}`?.startsWith("/") &&
      typeof srcStr == "string" &&
      !srcStr.startsWith("http")
    ) {
      srcStr = process.env.NEXT_PUBLIC_IMAGES + "/" + srcStr;
    }
    return srcStr || "/static/images/noPic.png";
  }
  return (
    <Image
      className={styles.image}
      {...rest}
      src={checkSrc(imgSrc)}
      onError={() => {
        setImgSrc(fallbackSrc || "/static/images/noPic.png");
      }}
      alt={alt || "Image With Fallback"}
    />
  );
};

export default ImageWithFallback;
