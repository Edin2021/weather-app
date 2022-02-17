import { useEffect, useState } from "react";
import { useGlobalContext } from "../context";
import ForecastDay from "./ForecastDay";
import { weekdays } from "../util";

function ForecastDays() {
  const { weatherData, units, tempUnit } = useGlobalContext();
  const [displayedWeekdays, setDisplayedWeekdays] = useState();

  const forecastData =
    weatherData && weatherData.forecast && weatherData.forecast.forecastday
      ? weatherData.forecast.forecastday
      : [];
  const forecastDays = forecastData.map((item) => item.day);

  const getThreeWeekDays = () => {
    const displayedWeekdays = [];
    let weekday = new Date().getDay();
    const today = weekdays[weekday];
    while (displayedWeekdays.length < 3) {
      displayedWeekdays.push(weekdays[weekday]);
      if (weekday === 6) {
        weekday = 0;
      } else {
        weekday++;
      }
    }
    setDisplayedWeekdays(displayedWeekdays);
  };

  useEffect(() => {
    getThreeWeekDays();
  }, [weatherData]);

  return (
    <section className="forecast-days">
      <h2 className="visually-hidden">forecast days</h2>
      {displayedWeekdays &&
        forecastDays.map((day, i) => {
          const temperature_c = Math.round(day.avgtemp_c);
          const temperature_f = Math.round(day.avgtemp_f);
          const temperature =
            units === "METRIC" ? temperature_c : temperature_f;
          const weekday = displayedWeekdays[i].substring(0, 3);
          const icon = day.condition.icon.split("/").reverse()[0].split(".")[0];

          const condition = day.condition.text;

          return (
            <ForecastDay
              key={i}
              temperature={temperature}
              tempUnit={tempUnit}
              weekday={weekday}
              icon={icon}
              condition={condition}
            />
          );
        })}
    </section>
  );
}

export default ForecastDays;
