import DatePicker from "~/components/common/DatePicker";
import { HiOutlineCalendar } from "react-icons/hi";
import Moment from "react-moment";
import { PropsInputDatePicker } from "./interfaces";
import TippyHeadless from "@tippyjs/react/headless";
import clsx from "clsx";
import styles from "./InputDatePicker.module.scss";
import { useState } from "react";

function InputDatePicker({
  date,
  setDate,
  placeholder = "Chọn ngày",
  label,
  onClick,
}: PropsInputDatePicker) {
  const [open, setOpen] = useState(false);

  return (
    <TippyHeadless
      maxWidth={"100%"}
      interactive
      visible={open}
      onClickOutside={() => setOpen(false)}
      placement="bottom-end"
      render={(attrs) => (
        <DatePicker
          onClose={() => setOpen(false)}
          onSetValue={setDate}
          value={date}
          open={open}
          onClick={() => {
            onClick;
            setOpen(false);
          }}
        />
      )}
    >
      <div className={styles.main} onClick={() => setOpen(!open)}>
        {label ? <label className={styles.label}>{label}</label> : null}
        <div className={clsx(styles.container, { [styles.show]: open })}>
          {date ? (
            <Moment format="DD/MM/YYYY" date={date} utc local />
          ) : (
            <p className={styles.placeholder}>{placeholder}</p>
          )}
          <HiOutlineCalendar color="#3F4752" size={20} />
        </div>
      </div>
    </TippyHeadless>
  );
}

export default InputDatePicker;
