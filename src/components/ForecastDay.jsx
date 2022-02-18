function ForecastDay({ temperature, icon, weekday, condition, tempUnit }) {
  return (
    <article className="forecast-day">
      <h3>{weekday}</h3>
      <img
        src={require(`../images/weather-icons/day/${icon}.png`)}
        title={condition}
        alt={condition}
      />
      <span className="temperature">
        {temperature}
        {tempUnit}
      </span>
    </article>
  );
}

export default ForecastDay;
