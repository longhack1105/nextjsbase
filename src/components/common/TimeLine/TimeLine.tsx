import React, { use } from "react";
import styles from "./TimeLine.module.scss";
import clsx from "clsx";
// import { useStyleClass } from "~/common/hooks/usStyleClass";
export default function TimeLine(data?: any, index?: any, classItem?: any) {
  // var classItemCustom = useStyleClass(classItem, styles);
  return (
    <main className={styles.timelineContainer}>
      <div className={styles.timeline}>
        {data &&
          data?.data?.map((v: any, i: number) => {
            var class1 = (data?.classItem || []).length > i ? data?.classItem[i] : null;
            // console.log(data?.classItem);
            return (
              <div
                className={clsx(styles.tlContent, {
                  [styles.tlContentActive]: i <= data?.index,
                  [styles[class1 || "x"]]: !!class1,
                })}
                key={v}
              >
                <div className={styles.tlHeader}>
                  <span className={styles.tlMarker}></span>
                  <p className={styles.tlTitle}>{v}</p>
                </div>
              </div>
            );
          })}
      </div>
    </main>
  );
}
