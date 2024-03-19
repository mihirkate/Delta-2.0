import SearchBox from "./SearchBox";
import InfoBox from "./InfoBox";
import { useState } from "react";


export default function WeatherApp() {
  const [weatherInfo, setWeatherInfo] = useState({
    
                                    city: "WonderLand ",
                                    temp: 34.29,
                                    tempMax: 34.29,
                                    tempMin: 34.29,
                                    feels_like: 31.73,
                                    humidity: 11,
                                    weather: "few clouds",
    
  })
  let updateInfo = (newInfo) => {
    setWeatherInfo(newInfo);
  }
  return (
    <div style={{ textAlign: "center" }}>
      <h2>Weather App By Mihir </h2>

      <div>
        <SearchBox updateInfo={updateInfo} />
        <InfoBox info={weatherInfo} />
      </div>
    </div>
  );
}
