import { useMemo, useState } from "react";

import Image from "next/image";
import { PropsImageCustom } from "./interfaces";
import styles from "./ImageCustom.module.scss";
import icons from "~/constants/images/icons";

function ImageCustom({
  alt = "error images",
  src,
  fill = true,
  ...props
}: PropsImageCustom) {
  const [isError, setIsError] = useState(false);

  const checkSrc = useMemo(() => {
    if (
      !`${src}`?.startsWith("blob") &&
      !`${src}`?.startsWith("/") &&
      typeof src == "string" &&
      !src.startsWith("http")
    ) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      src = process.env.NEXT_PUBLIC_API_MEDIA + "/" + src;
    }
    return src || icons.placeholder;
  }, [src]);

  return (
    <Image
      alt={alt}
      src={isError ? icons.placeholder : checkSrc}
      {...props}
      fill={fill}
      sizes="100"
      onError={() => setIsError(true)}
    />
  );
}

export default ImageCustom;
