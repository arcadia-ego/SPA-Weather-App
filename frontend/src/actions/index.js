import axios from "axios";

import {
  FETCHING_WEATHER,
  FETCHED_WEATHER,
  FETCHING_WEATHER_LOCAL,
  FETCHED_WEATHER_LOCAL,
  CLOSE_ERROR,
  ERROR
} from "./types";
import { API_KEY } from "./config";

export const fetchWeather = city => dispatch => {
  dispatch({ type: FETCHING_WEATHER });

  axios
    .post(
      `https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=${API_KEY}`
    )
    .then(response => {
      dispatch({ type: FETCHED_WEATHER, payload: response });
    })

    .catch(err => {
      dispatch({ type: ERROR, errorMessage: err, showError: true });
    });
};

export const fetchWeatherLocation = (lat, lng, units) => dispatch => {
  dispatch({ type: FETCHING_WEATHER_LOCAL });
  axios
    .post(
      `https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=${units}&APPID=${API_KEY}`
    )
    .then(response => {
      dispatch({ type: FETCHED_WEATHER_LOCAL, payload: response });
    })
    .catch(err => {
      dispatch({ type: ERROR, errorMessage: err, showError: true });
    });
};

export const closeErrorModal = () => ({
  type: CLOSE_ERROR,
  errorMessage: null,
  showError: false
});
