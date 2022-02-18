import useTimeInfo from "../hooks/useTimeInfo";

function TimeInfo() {
  const timeInfo = useTimeInfo();

  if (!timeInfo) return <></>;

  return (
    <div className="time-info">
      today, {timeInfo.weekday} {timeInfo.monthday}, {timeInfo.month}{" "}
      {timeInfo.hour}:{timeInfo.min}
      <span>{timeInfo.hourUnits}</span>
    </div>
  );
}

export default TimeInfo;
