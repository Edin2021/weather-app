import { useGlobalContext } from "../context";

function Location() {
  const { weatherData } = useGlobalContext();

  const country =
    weatherData && weatherData.location && weatherData.location.country;
  const place =
    weatherData && weatherData.location && weatherData.location.name;

  const smallerFontSize =
    country && country.length >= 11 ? "smaller-font-size" : "";

  return (
    <div className="location">
      <span className={`country ${smallerFontSize}`}>{country}</span>
      <span className="place">{place}</span>
    </div>
  );
}

export default Location;
