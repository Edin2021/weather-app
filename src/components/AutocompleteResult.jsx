import { useGlobalContext } from "../context";
import { v4 as uuidv4 } from "uuid";

function AutocompleteResult({
  country,
  place,
  region,
  coords,
  isFocused,
  count,
}) {
  const {
    searchValue,
    fetchWeather,
    clearSearch,
    setFocusedResult,
    setSuggestedSearch,
    setIsKey,
  } = useGlobalContext();

  const highlightPlace = () => {
    const placeStrArr = place.toLowerCase().split(" ");
    const searchStrArr = searchValue.split(" ").filter((item) => item != "");

    const elems = placeStrArr.map((placeStr) => {
      let elem = placeStr + " ";

      searchStrArr.forEach((searchStr) => {
        if (placeStr.search(searchStr) >= 0) {
          elem = (
            <span key={uuidv4()} className="highlight">
              {placeStr}
            </span>
          );
        }
      });

      return elem;
    });

    return elems;
  };

  const handleMouseEnterResult = () => {
    setIsKey(false);
    setFocusedResult(count);
  };

  return (
    <section
      className={`autocomplete-result ${isFocused}`}
      tabIndex="0"
      onMouseMove={handleMouseEnterResult}
      onClick={(e) => {
        clearSearch();
        setSuggestedSearch(`${country} ${place}`);
        fetchWeather(`${country} ${place}`);
      }}
    >
      <h2 className="country">{country}</h2>
      <h3 className="place">{highlightPlace()}</h3>
      <div className="region">Region: {region} </div>
      <div className="coords">
        <span>
          <span className="prefix">Lat: </span>
          <span className="value">{coords.lat}</span>
        </span>
        <div className="seperator"></div>
        <span>
          <span className="prefix">Long: </span>
          <span className="value">{coords.long}</span>
        </span>
      </div>
    </section>
  );
}

export default AutocompleteResult;
