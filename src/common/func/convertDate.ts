let daysOfWeek = [
  "Chủ Nhật",
  "Thứ Hai",
  "Thứ Ba",
  "Thứ Tư",
  "Thứ Năm",
  "Thứ Sáu",
  "Thứ Bảy",
];

const convertDate = (date: any, message?: string) => {
  const newDate = new Date(date || "");
  let h: any = newDate.getHours();
  let m: any = newDate.getMinutes();
  let s: any = newDate.getSeconds();
  let yyyy: any = newDate.getFullYear();
  let mm: any = newDate.getMonth() + 1;
  let dd: any = newDate.getDate();
  let d: any = newDate.getDay();

  return {
    getDateText() {
      return date
        ? `${daysOfWeek[d]}, ngày ${checkTime(dd)} tháng ${checkTime(
            mm
          )} năm ${yyyy}`
        : message;
    },
    getDate() {
      return date ? `${yyyy}/${checkTime(mm)}/${checkTime(dd)}` : message;
    },
    getDayMonth() {
      return date ? `${checkTime(dd)}/${checkTime(mm)}` : message;
    },
    getDateFormat() {
      return date ? `${checkTime(dd)}/${checkTime(mm)}/${yyyy}` : message;
    },
    getTime() {
      return date ? `${checkTime(h)}:${checkTime(m)}` : message;
    },
    getFullTime() {
      return date ? `${checkTime(h)}:${checkTime(m)}:${checkTime(s)}` : message;
    },
    getFullDateTime() {
      return date
        ? `${checkTime(h)}:${checkTime(m)}, ${checkTime(dd)}/${checkTime(
            mm
          )}/${yyyy}`
        : message;
    },
    getMonthYear() {
      return date ? `$${checkTime(mm)}/${yyyy}` : message;
    },
    getNumberTime() {
      return date ? newDate.getTime() : message;
    },
    getDateSubmit() {
      return date ? `${yyyy}-${checkTime(mm)}-${checkTime(dd)}` : message;
    },
  };
};

function checkTime(i: any) {
  if (Math.abs(i) < 10) {
    i = "0" + i;
  }
  return i;
}

export function catDateAndId(date: any, id: any) {
  const newDate = new Date(date);
  let yyyy: any = newDate.getFullYear();
  let mm: any = newDate.getMonth() + 1;
  let dd: any = newDate.getDate();

  return `${yyyy}${mm}${dd}${id}`;
}

export default convertDate;
