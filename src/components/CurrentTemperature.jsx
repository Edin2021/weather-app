import { useGlobalContext } from "../context";

function CurrentTemperature() {
  const { units, weatherData, toggleUnits, tempUnit } = useGlobalContext();

  const currentWD = weatherData.current;

  const temperature_c =
    weatherData && currentWD && currentWD.temp_c.toString()
      ? currentWD.temp_c
      : "";
  const temperature_f =
    weatherData && currentWD && currentWD.temp_f.toString()
      ? currentWD.temp_f
      : "";

  const temperature =
    units === "METRIC"
      ? Math.round(temperature_c).toString()
      : Math.round(temperature_f).toString();

  return (
    <div className="current-temperature" onClick={toggleUnits}>
      {temperature ? temperature : "N/A"}
      <span className="unit">{temperature ? tempUnit : ""}</span>
    </div>
  );
}

export default CurrentTemperature;
