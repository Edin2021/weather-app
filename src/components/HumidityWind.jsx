import { useGlobalContext } from "../context";

function HumidityWind() {
  const { weatherData, units } = useGlobalContext();

  const currentWD = weatherData.current;

  const humidity =
    weatherData && currentWD && currentWD.humidity ? currentWD.humidity : "N/A";

  const wind_kph =
    weatherData && currentWD && currentWD.wind_kph.toString()
      ? currentWD.wind_kph
      : "N/A";
  const wind_mph =
    weatherData && currentWD && currentWD.wind_mph.toString()
      ? currentWD.wind_mph
      : "N/A";

  const wind_kph_mph = units === "METRIC" ? wind_kph : wind_mph;

  const wind = Math.round(wind_kph_mph);

  const windUnits = units === "METRIC" ? "kph" : "mph";

  return (
    <div className="humidity-wind">
      <article>
        <h3>humidity</h3>
        <span>{humidity !== "N/A" ? `${humidity}%` : "N/A"}</span>
      </article>
      <div className="seperator"></div>
      <article>
        <h3>wind</h3>
        <span>{wind !== "N/A" ? `${wind}${windUnits}` : "N/A"}</span>
      </article>
    </div>
  );
}

export default HumidityWind;
