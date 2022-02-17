import { useEffect } from "react";
import { useGlobalContext } from "../context";

function DayNightWeather() {
  const { layout, weatherData, IS_DAY_NIGHT, setCondition, setIcon } =
    useGlobalContext();

  const condition =
    weatherData && weatherData.current && weatherData.current.condition.text;

  const icon =
    weatherData &&
    weatherData.current &&
    weatherData.current.condition.icon.split("/").reverse()[0].split(".")[0];

  useEffect(() => {
    setCondition(condition);
  }, [weatherData, condition]);

  useEffect(() => {
    setIcon(icon);
  }, [weatherData, icon]);

  return (
    <div className="day-night-weather">
      {IS_DAY_NIGHT} <div className="seperator"></div>
      {condition}
      {layout === "LAYOUT_TWO" && icon ? (
        <img
          src={require(`../images/weather-icons/${IS_DAY_NIGHT}/${icon}.png`)}
          alt=""
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default DayNightWeather;
