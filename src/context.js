import React, { useEffect, useState } from "react";

import { weatherConditions, cursorToEnd } from "./util";

const AppContext = React.createContext();

const LAYOUT_ONE = "LAYOUT_ONE";
const LAYOUT_TWO = "LAYOUT_TWO";
const UNIT_METRIC = "METRIC";
const UNIT_IMPERIAL = "IMPERIAL";

export default function AppProvider({ children }) {
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [suggestedSearch, setSuggestedSearch] = useState("");
  const [autocompleteResults, setAutocompleteResults] = useState([]);
  const [focusedResult, setFocusedResult] = useState(-1);
  const [layout, setLayout] = useState(LAYOUT_ONE);
  const [showHourly, setShowHourly] = useState(false);
  const [units, setUnits] = useState(UNIT_METRIC);
  const [tempUnit, setTempUnit] = useState("");
  const [condition, setCondition] = useState("");
  const [backgroundImage, setBackgroundImage] = useState("");
  const [icon, setIcon] = useState("");
  const [IS_DAY_NIGHT, setIS_DAY_NIGHT] = useState("");
  const [maxResults, setMaxResults] = useState(6);
  const [isKey, setIsKey] = useState(false);

  const fetchWeather = (q) => {
    setLoading(true);
    fetch(`https://weatherapi-com.p.rapidapi.com/forecast.json?q=${q}&days=3`, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
        "x-rapidapi-key": process.env.REACT_APP_API_KEY,
      },
    })
      .then((response) => {
        if (!response.ok) {
          setError(true);
          getCurrLocationWeather();
        }
        return response.json();
      })
      .then((data) => {
        setWeatherData(data);
        clearSearch();
        clearAutocompleteResults();
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
        getCurrLocationWeather();
      });
  };

  const fetchAutocomplete = (value) => {
    fetch(
      `https://weatherapi-com.p.rapidapi.com/search.json?q=${
        value ? value : "%3CREQUIRED%3E"
      }`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
          "x-rapidapi-key": process.env.REACT_APP_API_KEY,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setAutocompleteResults(data);
      })
      .catch((err) => {
        console.log("error fetch autocomplete");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formatString = searchValue.replace(/\s+/g, " ");
    if ((searchValue && suggestedSearch) || (!searchValue && suggestedSearch)) {
      formatString = suggestedSearch.replace(/\s+/g, " ");
    }
    if (!formatString || formatString === " ") return;
    fetchWeather(formatString);
  };

  const getCurrLocationWeather = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const coords = {
          long: position.coords.longitude.toString(),
          lat: position.coords.latitude.toString(),
        };
        const query = `${coords.lat},${coords.long}`;
        fetchWeather(query);
      });
    }
  };

  const toggleLayout = () => {
    if (layout === LAYOUT_ONE) {
      setLayout(LAYOUT_TWO);
    } else if (layout === LAYOUT_TWO) {
      setLayout(LAYOUT_ONE);
    }
  };

  const toggleUnits = () => {
    if (units === UNIT_METRIC) {
      setUnits(UNIT_IMPERIAL);
    } else if (units === UNIT_IMPERIAL) {
      setUnits(UNIT_METRIC);
    }
  };

  const toggleHourly = () => {
    setShowHourly((prevState) => !prevState);
  };

  const handleSearchValue = (value) => {
    setSearchValue(value);
  };

  const clearAutocompleteResults = () => {
    setAutocompleteResults([]);
  };

  const clearSearch = () => {
    if (!searchValue && !suggestedSearch) return;
    setSearchValue("");
    setSuggestedSearch("");
    setFocusedResult(-1);
  };

  const handleMouseLeaveResult = () => {
    setFocusedResult(-1);
  };

  const handleOutsideClickClose = (e) => {
    const t = e.target;
    const search = document.querySelector(".search");
    if (!search) return;
    const clickedOutsideForm = !search.contains(t);
    if (clickedOutsideForm) {
      clearAutocompleteResults();
    }
  };

  const handleFocusedResult = (e) => {
    setIsKey(true);
    if (e.key === "ArrowDown") {
      if (focusedResult < maxResults - 1) {
        setFocusedResult((prevState) => prevState + 1);
      } else {
        setFocusedResult(0);
      }
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (focusedResult > 0) {
        setFocusedResult((prevState) => prevState - 1);
      } else {
        setFocusedResult(maxResults - 1);
      }
    }
    if (e.key === "Backspace" && suggestedSearch) {
      setSearchValue(suggestedSearch);
      setSuggestedSearch("");
    }
    handleEsc(e.key);
  };

  const handleEsc = (key) => {
    if (key != "Escape") return;
    setSuggestedSearch("");
    setSearchValue("");
    clearAutocompleteResults();
  };

  const handleCursorToEnd = () => {
    const searchInput = document.querySelector(".search input");
    if (!searchInput) return;
    searchInput.blur();
    cursorToEnd(searchInput);
  };

  useEffect(() => {
    getCurrLocationWeather();
  }, []);

  useEffect(() => {
    const localLayout = localStorage.getItem("layout")
      ? localStorage.getItem("layout")
      : "";
    const localUnits = localStorage.getItem("units")
      ? localStorage.getItem("units")
      : "";
    if (localLayout) {
      setLayout(localLayout);
    }
    if (localUnits) {
      setUnits(localUnits);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("layout", layout);
  }, [layout]);
  useEffect(() => {
    localStorage.setItem("units", units);
  }, [units]);

  useEffect(() => {
    if (units === UNIT_METRIC) {
      setTempUnit("°C");
    } else {
      setTempUnit("°F");
    }
  }, [units]);

  useEffect(() => {
    const formatString = searchValue.replace(/\s+/g, " ");
    if (!formatString || formatString === " ") return;
    fetchAutocomplete(formatString);
  }, [searchValue]);

  // Set background image and tab title based on weather condition
  useEffect(() => {
    if (!condition) return;
    weatherConditions.forEach((item) => {
      item.keywords.forEach((keyword) => {
        let conditionStr = condition.toLowerCase();
        let conditionStrArr = [];
        if (conditionStr === "partly cloudy") {
          conditionStr = conditionStr.split(" ").join("-");
        }
        conditionStrArr = conditionStr.split(" ");
        if (conditionStrArr.includes(keyword)) {
          setBackgroundImage(item.imgName);
        }
      });
    });
    document.title = condition;
  }, [condition]);

  // Set tab icon
  useEffect(() => {
    if (!icon) return;
    if (!IS_DAY_NIGHT) return;
    const img = require(`./images/weather-icons/${IS_DAY_NIGHT}/${icon}.png`);
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.getElementsByTagName("head")[0].appendChild(link);
    }
    link.href = img;
  }, [icon]);

  useEffect(() => {
    if (!IS_DAY_NIGHT) return;
    const root = document.getElementsByTagName("html")[0]; // '0' to assign the first (and only `HTML` tag)
    if (IS_DAY_NIGHT === "night") {
      root.setAttribute("class", "theme-night");
    } else {
      root.setAttribute("class", "");
    }
  }, [IS_DAY_NIGHT]);

  useEffect(() => {
    const cycle =
      weatherData && weatherData.current && weatherData.current.is_day === 0
        ? "night"
        : "day";
    setIS_DAY_NIGHT(cycle);
  }, [weatherData]);

  useEffect(() => {
    if (autocompleteResults.length > 0 && focusedResult >= 0 && isKey) {
      const result = autocompleteResults[focusedResult];
      const country = result.country;
      const place = result.name;
      setSuggestedSearch(`${country} ${place}`);
    }
  }, [focusedResult]);

  useEffect(() => {
    handleCursorToEnd();
  }, [focusedResult, suggestedSearch, searchValue]);

  useEffect(() => {
    document.addEventListener("click", handleOutsideClickClose);
    return () => document.removeEventListener("click", handleOutsideClickClose);
  }, []);

  return (
    <AppContext.Provider
      value={{
        weatherData,
        loading,
        error,
        setError,
        searchValue,
        suggestedSearch,
        autocompleteResults,
        focusedResult,
        setFocusedResult,
        layout,
        toggleLayout,
        toggleUnits,
        toggleHourly,
        showHourly,
        handleSearchValue,
        fetchWeather,
        units,
        tempUnit,
        setCondition,
        backgroundImage,
        setIcon,
        IS_DAY_NIGHT,
        clearAutocompleteResults,
        clearSearch,
        handleSubmit,
        handleMouseLeaveResult,
        maxResults,
        setMaxResults,
        handleFocusedResult,
        setSuggestedSearch,
        setIsKey,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useGlobalContext = () => React.useContext(AppContext);
