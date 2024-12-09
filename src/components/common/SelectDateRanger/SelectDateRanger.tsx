import Select, { Option } from "../Select";
import { useEffect, useState } from "react";

import { PropsSelectDateRanger } from "./interfaces";
import styles from "./SelectDataRanger.module.scss";

function SelectDateRanger({
  onSetValue,
  value,
  onSetDate,
  date,
}: PropsSelectDateRanger) {
  function getDateRange(range: number) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    switch (range) {
      // Tuần này
      case 1:
        const firstDayOfWeek = new Date(today);
        firstDayOfWeek.setDate(today.getDate() - today.getDay());

        const lastDayOfWeek = new Date(today);
        lastDayOfWeek.setDate(today.getDate() - today.getDay() + 6);

        return { from: firstDayOfWeek, to: lastDayOfWeek };

      // Tháng này
      case 2:
        const firstDayOfMonth = new Date(
          today.getFullYear(),
          today.getMonth(),
          1
        );
        const lastDayOfMonth = new Date(
          today.getFullYear(),
          today.getMonth() + 1,
          0
        );

        return { from: firstDayOfMonth, to: lastDayOfMonth };

      // Năm này
      case 3:
        const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
        const lastDayOfYear = new Date(today.getFullYear(), 11, 31);

        return { from: firstDayOfYear, to: lastDayOfYear };
    }
  }
  useEffect(() => {
    if (value != -1) onSetDate(() => getDateRange(value));
  }, [onSetDate, value]);
  return (
    <div className={styles.select}>
      <Select
        placeholder="Chọn thời gian"
        value={value}
        onChange={(e) => {
          onSetValue(Number(e.target.value));
        }}
      >
        <Option
          value={-1}
          title={"Tất cả"}
          onClick={() => onSetDate({ from: null, to: null })}
        />
        <Option value={1} title={"Tuần này"}></Option>
        <Option value={2} title={"Tháng này"}></Option>
        <Option value={3} title={"Năm này"}></Option>
      </Select>
    </div>
  );
}

export default SelectDateRanger;
