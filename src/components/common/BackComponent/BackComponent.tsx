import React from "react";

import styles from "./BackComponent.module.scss";
import Link from "next/link";
import { PropsBackComponent } from "./interfaces";
import { ArrowLeft } from "iconsax-react";

function BackComponent({ href, title }: PropsBackComponent) {
  return (
    <Link href={href || "/my-account"} className={styles.container}>
      <ArrowLeft color="#888888" size={24} fontWeight={600} />
      <h4 className={styles.title}>{title}</h4>
    </Link>
  );
}

export default BackComponent;
