import { useEffect, useState } from "react";
import { useGlobalContext } from "../context";
import { weekdays, months } from "../util";

const refresh = 1000;

function useTimeInfo() {
  const [timeInfo, setTimeInfo] = useState();
  const { units } = useGlobalContext();

  const formatTime = (units) => {
    const time = new Date();
    const weekday = weekdays[time.getDay()];
    const monthday = time.getDate();
    const month = months[time.getMonth()].substring(0, 3);
    const mins = time.getMinutes();
    const min = mins < 10 ? `0${mins}` : mins;
    const hour_h = time.getHours();
    const hour_AM = hour_h < 12 && hour_h;
    const hour_PM =
      hour_h >= 12 ? `${hour_h % 12 === 0 ? hour_h : hour_h % 12}` : "";
    const hour_AM_PM = hour_h >= 12 ? hour_PM : hour_AM;

    const hour = units === "METRIC" ? hour_h : hour_AM_PM;
    const hourUnits = units === "METRIC" ? "h" : hour_h < 12 ? "AM" : "PM";

    const timeInfo = { weekday, monthday, month, hour, min, hourUnits };
    setTimeInfo(timeInfo);
  };

  useEffect(() => {
    formatTime(units);
    const interval = setInterval(() => {
      formatTime(units);
    }, refresh);
    return () => clearInterval(interval);
  }, [units]);

  return timeInfo;
}

export default useTimeInfo;
