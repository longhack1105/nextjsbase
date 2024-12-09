import { Add } from "iconsax-react";
import ButtonAddNew from "../ButtonAddNew";
import ButtonExcel from "../ButtonExcel";
import DateRangerCustom from "../DateRangerCustom";
import { PropsFilterTable } from "./interfaces";
import React from "react";
import Search from "../Search";
import styles from "./FilterTable.module.scss";
import i18n from "~/locale/i18n";

function FilterTable({
  children,
  placeholderInputSearch = "Nhập từ khóa tìm kiếm",
  placeholderTime = "Thời gian sự kiện",
  isTime = true,
  isSearch = true,
  isTimeByMonth = false,
  funcAddNew,
  titleAddNew,
  funcExportExcel,
  keyTypeDate = "typeDate",
  keydateFrom = "dateFrom",
  keyDateTo = "dateTo",
}: PropsFilterTable) {
  return (
    <div className={styles.main}>
      <div className={styles.search}>
        {isTime ? (
          <div className={styles.dateRanger}>
            <DateRangerCustom
              titleTime={placeholderTime}
              keyTypeDate={keyTypeDate}
              keydateFrom={keydateFrom}
              keyDateTo={keyDateTo}
            />
          </div>
        ) : null}
        {children ? <div className={styles.children}>{children}</div> : null}
        {isSearch ? (
          <div className={styles.input_search}>
            <Search placeholder={i18n.t(`${placeholderInputSearch}`)} />
          </div>
        ) : null}
      </div>
      <div className={styles.btn}>
        {funcExportExcel ? (
          <ButtonExcel funcExportExcel={funcExportExcel} />
        ) : null}
        {funcAddNew ? (
          <ButtonAddNew title={titleAddNew} funcAddNew={funcAddNew} />
        ) : null}
      </div>
    </div>
  );
}

export default FilterTable;
