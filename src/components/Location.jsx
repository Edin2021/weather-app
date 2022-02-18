import { useGlobalContext } from "../context";

function Location() {
  const { weatherData } = useGlobalContext();

  const country =
    weatherData && weatherData.location && weatherData.location.country;
  const place =
    weatherData && weatherData.location && weatherData.location.name;

  const smallerFontSizeCountry =
    country && country.length >= 11 ? "smaller-font-size" : "";

  const smallerFontSizePlace =
    place && place.length >= 15 ? "smaller-font-size" : "";

  return (
    <div className="location">
      <span className={`country ${smallerFontSizeCountry}`}>
        <span className="visually-hidden">country</span>
        {country}
      </span>
      <span className={`place ${smallerFontSizePlace}`}>
        {" "}
        <span className="visually-hidden">place</span>
        {place}
      </span>
    </div>
  );
}

export default Location;
