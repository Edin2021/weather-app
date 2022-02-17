import BigCard from "../components/BigCard";
import DayNightWeather from "../components/DayNightWeather";
import ForecastDays from "../components/ForecastDays";
import ForecastHours from "../components/ForecastHours";
import Location from "../components/Location";
import SearchForm from "../components/SearchForm";
import ShowHourlyBtn from "../components/ShowHourlyBtn";
import TimeInfo from "../components/TimeInfo";

function LayoutOne() {
  return (
    <main className="layout-one">
      <header>
        <Location />
        <DayNightWeather />
      </header>
      <div className="under-header-con">
        <div className="left-side-con">
          <SearchForm />
          <TimeInfo />
          <BigCard />
        </div>
        <div className="right-side-con">
          <ForecastDays />
          <ShowHourlyBtn />
          <ForecastHours />
        </div>
      </div>
    </main>
  );
}

export default LayoutOne;
