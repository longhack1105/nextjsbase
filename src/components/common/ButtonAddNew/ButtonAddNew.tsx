import React from "react";

import styles from "./ButtonAddNew.module.scss";
import { PropsButtonAddNew } from "./interfaces";
import { MdAdd } from "react-icons/md";
import i18n from "~/locale/i18n";

function ButtonAddNew({ title, funcAddNew }: PropsButtonAddNew) {
  return (
    <div className={styles.btn_add} onClick={funcAddNew}>
      <div className={styles.icon_add}>
        <MdAdd size={20} color="#fff" />
      </div>
      <p>{title || i18n.t("Thêm mới")}</p>
    </div>
  );
}

export default ButtonAddNew;
