import CurrentTemperature from "./CurrentTemperature";
import HumidityWind from "./HumidityWind";
import { useGlobalContext } from "../context";

function BigCard() {
  const { IS_DAY_NIGHT, condition, icon } = useGlobalContext();

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
