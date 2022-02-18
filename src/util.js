const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const weatherConditions = [
  {
    imgName: "clear",
    keywords: ["clear", "sunny"],
  },
  {
    imgName: "partly-cloudy",
    keywords: ["partly-cloudy"],
  },
  { imgName: "cloudy", keywords: ["cloudy", "overcast"] },
  { imgName: "rainy", keywords: ["rain", "rainy", "drizzle"] },
  { imgName: "thunder", keywords: ["thunder", "thundery"] },
  { imgName: "foggy", keywords: ["fog", "foggy"] },
  { imgName: "misty", keywords: ["mist", "misty"] },
  { imgName: "snowy", keywords: ["snow", "snowy", "sleet", "ice"] },
  { imgName: "blizzard", keywords: ["blizard"] },
];

function debounce(func, wait, immediate) {
  let timeout;
  return function () {
    let context = this,
      args = arguments;
    let later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

const cursorToEnd = (elem) => {
  elem.focus();
  const length = elem.value.length;
  elem.setSelectionRange(length, length);
};

const fetchOptions = {
  method: "GET",
  headers: {
    "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
    "x-rapidapi-key": process.env.REACT_APP_API_KEY,
  },
};

export {
  weekdays,
  months,
  weatherConditions,
  debounce,
  cursorToEnd,
  fetchOptions,
};
