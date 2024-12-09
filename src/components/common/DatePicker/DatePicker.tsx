import { RiArrowLeftLine, RiArrowRightLine } from "react-icons/ri";
import { createContext, useCallback, useEffect, useState } from "react";

import CalendarMain from "./components/CalendarMain";
import { PropsDatePicker } from "./interfaces";
import clsx from "clsx";
import styles from "./DatePicker.module.scss";

const daysOfWeek = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
export const ContextCalendar = createContext<any>(null);

function DatePicker({ onSetValue, value, open, onClick }: PropsDatePicker) {
  const [typeCalendar, setTypeCalendar] = useState(0);
  const [yearTable, setYearTable] = useState<any>();
  const [date, setDate] = useState(new Date());

  const titleMonthYear = () => {
    if (typeCalendar == 1) {
      return `${"Năm"} ${date.getFullYear()}`;
    }
    if (typeCalendar == 2) {
      return `${"Từ"} ${yearTable.first} - ${yearTable.last}`;
    }
    return `${"Tháng"} ${date.getMonth() + 1}, ${date.getFullYear()}`;
  };

  const handleChangeType = () => {
    if (typeCalendar == 0) {
      setTypeCalendar(1);
    }
    if (typeCalendar == 1) {
      setTypeCalendar(2);
    }
    if (typeCalendar == 2) {
      setTypeCalendar(0);
    }
  };

  const handlePrev = useCallback(() => {
    if (typeCalendar == 0) {
      setDate((prevDate) => {
        const month = prevDate.getMonth() - 1;
        const year = prevDate.getFullYear();
        const newDate = new Date(year, month);
        return newDate;
      });
    }

    if (typeCalendar == 1) {
      setDate((prevDate) => {
        const month = prevDate.getMonth();
        const year = prevDate.getFullYear() - 1;
        const newDate = new Date(year, month);
        return newDate;
      });
    }

    if (typeCalendar == 2) {
      setDate((prevDate) => {
        const month = prevDate.getMonth();
        const year = prevDate.getFullYear() - 12;
        const newDate = new Date(year, month);
        return newDate;
      });
    }
  }, [typeCalendar]);

  const handleNext = useCallback(() => {
    if (typeCalendar == 0) {
      setDate((prevDate) => {
        const month = prevDate.getMonth() + 1;
        const year = prevDate.getFullYear();
        const newDate = new Date(year, month);
        return newDate;
      });
    }

    if (typeCalendar == 1) {
      setDate((prevDate) => {
        const month = prevDate.getMonth();
        const year = prevDate.getFullYear() + 1;
        const newDate = new Date(year, month);
        return newDate;
      });
    }

    if (typeCalendar == 2) {
      setDate((prevDate) => {
        const month = prevDate.getMonth();
        const year = prevDate.getFullYear() + 12;
        const newDate = new Date(year, month);
        return newDate;
      });
    }
  }, [typeCalendar]);

  //Cap nhat value neu co
  useEffect(() => {
    if (!open) {
      onSetValue(value);
    } else {
      if (!!value) {
        setDate(value);
      }
    }
  }, [open, value]);

  useEffect(() => {
    setYearTable({
      first: date.getFullYear() - 5,
      last: date.getFullYear() + 6,
    });
  }, [date]);

  return (
    <ContextCalendar.Provider
      value={{
        date,
        setDate,
        datePick: value,
        setDatePick: onSetValue,
        onClick: onClick,
      }}
    >
      <div className={styles.container}>
        <div className={styles.displayTitle}>
          <div className={clsx("btn", styles.arrow)} onClick={handlePrev}>
            <RiArrowLeftLine />
          </div>
          <p
            style={{ cursor: "pointer", textDecoration: "underline" }}
            onClick={handleChangeType}
          >
            {titleMonthYear()}
          </p>
          <div className={clsx("btn", styles.arrow)} onClick={handleNext}>
            <RiArrowRightLine />
          </div>
        </div>
        {typeCalendar == 0 ? (
          <div className={styles.rows}>
            {daysOfWeek.map((day, i) => (
              <div className={styles.day} key={i}>
                {day}
              </div>
            ))}
          </div>
        ) : null}
        <CalendarMain
          date={date}
          setDate={setDate}
          setType={setTypeCalendar}
          type={typeCalendar}
          year={yearTable}
        />
      </div>
    </ContextCalendar.Provider>
  );
}

export default DatePicker;
