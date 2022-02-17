import CurrentTemperature from "./CurrentTemperature";
import HumidityWind from "./HumidityWind";
import { useGlobalContext } from "../context";

function BigCard() {
  const { weatherData, IS_DAY_NIGHT } = useGlobalContext();

  const condition =
    weatherData && weatherData.current && weatherData.current.condition.text;

  const icon =
    weatherData &&
    weatherData.current &&
    weatherData.current.condition.icon.split("/").reverse()[0].split(".")[0];

  return (
    <div className="big-card">
      <CurrentTemperature />
      <div className="weather">
        {condition}
        {icon && (
          <img
            src={require(`../images/weather-icons/${IS_DAY_NIGHT}/${icon}.png`)}
            alt=""
          />
        )}
      </div>
      <HumidityWind />
    </div>
  );
}

export default BigCard;
