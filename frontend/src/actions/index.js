import axios from "axios";

import { FETCHING_WEATHER } from "./types";

export const fetchWeather = (city, callback) => dispatch => {
    dispatch({ type: FETCHING_WEATHER });
    console.log("CITY IN FETCHWEATHER", city)
    
}