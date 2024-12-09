import { Fragment, useEffect, useState } from "react";

import { PropsClock } from "./interfaces";

function Clock({}: PropsClock) {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const intervalId = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);
      return () => {
        clearInterval(intervalId);
      };
    }
  }, []);

  const formatDate = (date: Date) => {
    const options: any = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
      hour12: false,
    };

    return date.toLocaleString("en-US", options);
  };

  return <Fragment>{currentTime ? formatDate(currentTime) : null}</Fragment>;
}

export default Clock;
