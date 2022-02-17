import { useEffect, useState } from "react";
import { useGlobalContext } from "../context";
import ForecastHour from "./ForecastHour";

function ForecastHours() {
  const { showHourly, weatherData, units, tempUnit } = useGlobalContext();

  const [displayHours, setDisplayHours] = useState();

  const forecastDaysHour =
    weatherData &&
    weatherData.forecast &&
    weatherData.forecast.forecastday.map((item) => item.hour);

  // 9 hours forecast
  useEffect(() => {
    const displayHours = [];
    let itemCount = 0;
    const currItem = forecastDaysHour && forecastDaysHour[itemCount];

    if (forecastDaysHour) {
      while (displayHours.length < 9) {
        currItem.filter((item, i) => {
          const hourNow = new Date().getHours();
          const forecastHour = parseInt(item.time.split(" ")[1].split(":")[0]);

          const addToDisplayHours =
            (forecastHour > hourNow || itemCount > 0) &&
            displayHours.length < 9;

          if (addToDisplayHours) {
            displayHours.push(item);
          }

          const skipToNextDayHours =
            i === currItem.length - 1 && displayHours.length < 9;

          if (skipToNextDayHours) {
            itemCount++;
          }
        });
      }
    }

    setDisplayHours(displayHours);
  }, [weatherData]);

  const formatHour = (time) => {
    let hour_h = `${time}:00h`;
    let hour_AM = time < 12 && `${time}:00AM`;
    let hour_PM = time == 12 ? `${time}:00PM` : `${time % 12}:00PM`;
    let hour_AM_PM = time >= 12 ? hour_PM : hour_AM;
    let hour = units === "METRIC" ? hour_h : hour_AM_PM;
    return hour;
  };

  return (
    <section className={`forecast-hours ${showHourly ? "show-hourly" : ""}`}>
      <h2 className="visually-hidden">forecast hours</h2>
      {displayHours &&
        displayHours.map((item, i) => {
          const temperature_c = Math.round(item.temp_c);
          const temperature_f = Math.round(item.temp_f);
          const temperature =
            units === "METRIC" ? temperature_c : temperature_f;

          const time = item.time.split(" ")[1].split(":")[0];
          const hour = formatHour(time);

          const icon = item.condition.icon
            .split("/")
            .reverse()[0]
            .split(".")[0];

          const isDay = item.is_day;

          const condition = item.condition.text;

          const delay = i * 0.05;

          return (
            <ForecastHour
              key={i}
              temperature={temperature}
              tempUnit={tempUnit}
              hour={hour}
              icon={icon}
              isDay={isDay}
              condition={condition}
              delay={delay}
            />
          );
        })}
    </section>
  );
}

export default ForecastHours;
