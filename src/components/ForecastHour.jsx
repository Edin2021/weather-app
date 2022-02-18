function ForecastHour({
  temperature,
  tempUnit,
  hour,
  icon,
  isDay,
  condition,
  delay,
}) {
  const IS_DAY_NIGHT = isDay === 0 ? "night" : "day";

  return (
    <article className="forecast-hour" style={{ transitionDelay: `${delay}s` }}>
      <h3 className="hour">{hour}</h3>
      <img
        src={require(`../images/weather-icons/${IS_DAY_NIGHT}/${icon}.png`)}
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

export default ForecastHour;
