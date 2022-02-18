import { useGlobalContext } from "../context";

function DayNightWeather() {
  const { layout, IS_DAY_NIGHT, condition, icon } = useGlobalContext();

  return (
    <div className="day-night-weather">
      {IS_DAY_NIGHT} <div className="seperator"></div>
      {condition}
      {layout === "LAYOUT_TWO" && icon ? (
        <img
          src={require(`../images/weather-icons/${IS_DAY_NIGHT}/${icon}.png`)}
          alt=""
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default DayNightWeather;
