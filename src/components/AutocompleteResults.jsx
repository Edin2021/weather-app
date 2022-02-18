import { useEffect } from "react";
import { useGlobalContext } from "../context";
import AutocompleteResult from "./AutocompleteResult";
import { debounce } from "../util";

function AutocompleteResults() {
  const { autocompleteResults, maxResults, setMaxResults, focusedResult } =
    useGlobalContext();

  const handleResize = debounce(function (e) {
    const windowWidth = e.target.innerWidth;
    const bpDesktop = 1080;
    if (windowWidth < bpDesktop) {
      setMaxResults(3);
    } else {
      setMaxResults(6);
    }
  }, 250);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  return (
    <div className="autocomplete-results">
      <span className="visually-hidden">search suggestions</span>
      {autocompleteResults.map((result, i) => {
        if (i < maxResults) {
          const country = result.country;
          const place = result.name;
          const region = result.region;
          const coords = {
            lat: result.lat,
            long: result.lon,
          };
          const isFocused = focusedResult === i ? "is-focused" : "";

          return (
            <AutocompleteResult
              key={result.id}
              country={country}
              place={place}
              region={region}
              coords={coords}
              isFocused={isFocused}
              count={i}
            />
          );
        }
      })}
    </div>
  );
}

export default AutocompleteResults;
