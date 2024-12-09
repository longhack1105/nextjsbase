import React from "react";

import styles from "./ButtonExcel.module.scss";
import { PropsButtonExcel } from "./interfaces";

function ButtonExcel({ funcExportExcel }: PropsButtonExcel) {
  return (
    <div className={styles.main} onClick={funcExportExcel}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
      >
        <path
          d="M3 15.5356V4.23013L11.0889 3V4.5V6.34519V8.19038V10.0063V11.9393V13.8724V15.6883V17L3 15.5356Z"
          fill="#20744A"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4.62401 6.76486L6.07029 6.68321L6.97944 9.14533L8.05371 6.58165L9.5 6.5L7.7437 9.99568L9.5 13.5L7.97082 13.3984L6.93833 10.7272L5.90518 13.2969L4.5 13.1747L6.1323 10.0793L4.62401 6.76486Z"
          fill="white"
        />
        <path
          d="M11.0889 4.5V3L3 4.23013V15.5356L11.0889 17V15.6883M11.0889 4.5H16.4815V15.6883H11.0889M11.0889 4.5V6.34519M11.0889 15.6883V13.8724M11.0889 13.8724H13.351M11.0889 13.8724V11.9393M11.0889 11.9393H13.351M11.0889 11.9393V10.0063M11.0889 10.0063H13.351M11.0889 10.0063V8.19038M11.0889 8.19038H13.351M11.0889 8.19038V6.34519M11.0889 6.34519H13.351M14.0394 6.34519H15.5M14.0394 8.19038H15.5M14.0394 10.0063H15.5M14.0394 11.9393H15.5M14.0394 13.8724H15.5"
          stroke="#20744A"
          strokeLinejoin="round"
        />
      </svg>
      <p className={styles.text}>Xuất file</p>
    </div>
  );
}

export default ButtonExcel;
