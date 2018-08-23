import {
  FETCHING_WEATHER,
  FETCHED_WEATHER,
  FETCHING_WEATHER_LOCAL,
  FETCHED_WEATHER_LOCAL,
  ERROR
} from "../actions/types";

const INITIAL_STATE = {
  fetchingWeather: false,
  fetchingLocalWeather: false,
  errorMessage: "",
  weatherInfo: [],
  localWeather: []
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCHING_WEATHER:
      return { ...state, fetchingWeather: true };
    case FETCHED_WEATHER:
      console.log("ACTION PAYLOAD WHEN FETCHED", action.payload.data);
      console.log("STATE IN REDUCER", state);
      return {
        ...state,
        weatherInfo: [...state.weatherInfo, action.payload.data],
        fetchingWeather: false
      };
    case FETCHING_WEATHER_LOCAL:
      return { ...state, fetchingLocalWeather: true };
    case FETCHED_WEATHER_LOCAL:
      return { ...state, localWeather: action.payload, fetchingLocalWeather: false };
    case ERROR:
      //   console.log("ACTION IN ERROR", action);
      console.log("ERROR MESSAGE IN REDUCERS", state);
      return { ...state, errorMessage: action.errorMessage };
    default:
      return state;
  }
}
