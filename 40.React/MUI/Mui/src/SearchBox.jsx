import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import "./SearchBox.css";
import { useState } from "react";
export default function SearchBox({ updateInfo }) {
  let [city, setCity] = useState("");
  let [error, setError] = useState(false);
  let API_URL = "https://api.openweathermap.org/data/2.5/weather";
  let API_KEY = "c83614d583bb55bbb5ab150f958e7550";

  let getWeatherInfo = async () => {
    try {
      let response = await fetch(
        `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`
      );
      let jsonRespone = await response.json();
      let result = {
        city: city,
        temp: jsonRespone.main.temp,
        tempMin: jsonRespone.main.temp_min,
        tempMax: jsonRespone.main.temp_max,
        humidity: jsonRespone.main.humidity,
        feels_like: jsonRespone.main.feels_like,
        weather: jsonRespone.weather[0].description,
      };
      console.log(result);
      return result;
    } catch (error) {
      setError(true);
    }
  };

  let handleChange = (event) => {
    setCity(event.target.value);
  };

  let handleSubmit = async (event) => {
    try {
      event.preventDefault();
      console.log(city);
      setCity("");
      let newInfo = await getWeatherInfo();
      updateInfo(newInfo);
    } catch (err) {
      setError(true);
    }
  };
  return (
    <div className='searchBox'>
      <form onSubmit={handleSubmit}>
        <TextField
          id='outlined-basic'
          label='City'
          variant='outlined'
          value={city}
          onChange={handleChange}
        />
        <br />
        <br />

        <Button variant='contained' type='submit' onSubmit={handleSubmit}>
          Search
        </Button>
        {error && <p>No such Place exists !!!!</p>}
      </form>
    </div>
  );
}
