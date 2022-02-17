import { useGlobalContext } from "../context";
import CurrentTemperature from "../components/CurrentTemperature";
import DayNightWeather from "../components/DayNightWeather";
import ForecastDays from "../components/ForecastDays";
import ForecastHours from "../components/ForecastHours";
import HumidityWind from "../components/HumidityWind";
import Location from "../components/Location";
import SearchForm from "../components/SearchForm";
import ShowHourlyBtn from "../components/ShowHourlyBtn";
import TimeInfo from "../components/TimeInfo";

function LayoutTwo() {
  const { backgroundImage, IS_DAY_NIGHT } = useGlobalContext();

  const img = backgroundImage
    ? `${require(`../images/weather-backgrounds/${IS_DAY_NIGHT}/${backgroundImage}.jpg`)}`
    : "";
  return (
    <main
      className="layout-two"
      style={{
        backgroundImage: `url(${img})`,
      }}
    >
      <div className="top-half">
        <div className="top-left">
          <SearchForm />
          <TimeInfo />
        </div>
        <div className="top-right">
          <ForecastDays />
          <div className="col">
            <ShowHourlyBtn />
            <ForecastHours />
          </div>
        </div>
      </div>
      <div className="bottom-half">
        <div className="bottom-left">
          <div className="row">
            <CurrentTemperature />
            <Location />
          </div>
          <DayNightWeather />
        </div>
        <div className="bottom-right">
          <HumidityWind />
        </div>
      </div>
    </main>
  );
}

export default LayoutTwo;
