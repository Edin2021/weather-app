import { useGlobalContext } from "../context";

function ShowHourlyBtn() {
  const { toggleHourly } = useGlobalContext();

  return (
    <button onClick={toggleHourly} type="button" className="show-hourly-btn">
      hourly
    </button>
  );
}

export default ShowHourlyBtn;
