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
  { imgName: "rainy", keywords: ["rain", "drizzle"] },
  { imgName: "thunder", keywords: ["thundery"] },
  { imgName: "foggy", keywords: ["fog"] },
  { imgName: "misty", keywords: ["mist"] },
  { imgName: "snowy", keywords: ["snow", "sleet", "ice"] },
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

export { weekdays, months, weatherConditions, debounce, cursorToEnd };
