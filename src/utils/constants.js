export const weatherOptions = [
  {
    day: true,
    condition: "clear",
    url: new URL("../assets/day/clear.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "clouds",
    url: new URL("../assets/day/clouds.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "fog",
    url: new URL("../assets/day/fog.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "drizzle",
    url: new URL("../assets/day/drizzle.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "snow",
    url: new URL("../assets/day/snow.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "rain",
    url: new URL("../assets/day/rain.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "clear",
    url: new URL("../assets/night/clear.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "clouds",
    url: new URL("../assets/night/clouds.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "fog",
    url: new URL("../assets/night/fog.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "drizzle",
    url: new URL("../assets/night/drizzle.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "snow",
    url: new URL("../assets/night/snow.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "rain",
    url: new URL("../assets/night/rain.png", import.meta.url).href,
  },
];

export const defaultWeatherOptions = {
  day: {
    day: true,
    url: new URL("../assets/day/default.png", import.meta.url).href,
    condition: "default conditions",
  },
  night: {
    day: false,
    url: new URL("../assets/night/default.png", import.meta.url).href,
    condition: "default conditions",
  },
};

export const defaultItemValues = {
  name: "",
  imageUrl: "",
  weather: "",
};

export const defaultUserValues = {
  Email: "",
  password: "",
  name: "",
  avatarUrl: "",
};

// Fallback coordinates used when Geolocation is unavailable or denied
export const defaultCoordinates = {
  latitude: 36.52,
  longitude: -94.61,
};

export const apiKey = "db701a858759818aedce5a8653525ccc";

export const screenSize = window.innerWidth;
