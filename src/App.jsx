import axios from "axios"
import { useEffect, useState } from "react"
import Dashboard from "./components/Dashboard"

function App() {
  const apiKey = "bd8c031940d044fa94b103815241410"
  const forecast = 7
  const aqi = "yes"

  const [city, setCity] = useState('thailand')

  const [dataWeather, setDataWeather] = useState([])
  const [dataWeatherToday, setDataWeatherToday] = useState([])
  const [dataWeatherAllday, setDataWeatherAllday] = useState([])
  const [dataForeCast7Day, setDataForeCast7Day]= useState([])
  const [dataForeCast, setDataForeCast] = useState([])
  const [dataLocation, setDataLocation] = useState([])
  const [iconWeather, setIconWeather] = useState('')

  const [dataToday6AM, setDataToday6AM] = useState([])
  const [dataToday9AM, setDataToday9AM] = useState([])
  const [dataToday12PM, setDataToday12PM] = useState([])
  const [dataToday3PM, setDataToday3PM] = useState([])
  const [dataToday6PM, setDataToday6PM] = useState([])
  const [dataToday9PM, setDataToday9PM] = useState([])
  useEffect(() => {
    async function fetchData() {
      try {
        const api = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=${forecast}&aqi=${aqi}`
        const response = await axios.get(api)
        const dataWeather = response.data.current
        const dataForeCast = response.data.forecast
        const dataForeCast7Day = response.data.forecast.forecastday
        const dataWeatherToday = dataForeCast.forecastday[0]
        const dataWeatherAllday = dataForeCast.forecastday[0].day
        const dataLocation = response.data.location
        const iconWeather = `https:${dataWeather.condition.icon}`

        setDataWeather(dataWeather)
        setDataForeCast(dataForeCast)
        setDataLocation(dataLocation)
        setIconWeather(iconWeather)
        setDataWeatherToday(dataWeatherToday)
        setDataWeatherAllday(dataWeatherAllday)
        setDataForeCast7Day(dataForeCast7Day)
      } catch (error) {
        console.log(error);
      }
    }
    if (city) {
      fetchData()
    }
  }, [city])

  useEffect(() => {
    function weatherToday() {
      if (dataWeatherToday && dataWeatherToday.hour) { // ตรวจสอบว่าข้อมูลมีอยู่
        const selectedHours = dataWeatherToday.hour.filter((item, index) => [6, 9, 12, 15, 18, 21].includes(index));

        setDataToday6AM(selectedHours[0])
        setDataToday9AM(selectedHours[1])
        setDataToday12PM(selectedHours[2])
        setDataToday3PM(selectedHours[3])
        setDataToday6PM(selectedHours[4])
        setDataToday9PM(selectedHours[5])
      }
    }
    weatherToday()
  }, [dataWeatherToday])


  // const handleCityChange = (event) => {
  //   setCity(event.target.value)
  //   console.log(event.target.value) // แสดงผลใน console เมื่อป้อนข้อมูล
  // }
  const handleCityChange = (event) => {
    setCity(event.target.value)
    console.log(event.target.value);

  }

  // console.log(city);

  return (
    <div className="bg-gray-900">
      <div className="w-3/4 p-5 flex  justify-center bg-gray-900 ">
        <input
          type="text"
          placeholder="Search for Cities"
          className="w-2/4 color2 p-3 rounded-2xl focus:outline-none shadow-lg text-white text-uppercase"
          value={city}
          style={{ textTransform: "uppercase" }}
          onChange={handleCityChange}  // ดักจับการเปลี่ยนแปลง
        />
      </div>

      <Dashboard
        dataWeather={dataWeather}
        dataForeCast={dataForeCast}
        dataLocation={dataLocation}
        iconWeather={iconWeather}
        dataWeatherToday={dataWeatherToday}
        dataWeatherAllday={dataWeatherAllday}
        dataToday6AM={dataToday6AM}
        dataToday9AM={dataToday9AM}
        dataToday12PM={dataToday12PM}
        dataToday3PM={dataToday3PM}
        dataToday6PM={dataToday6PM}
        dataToday9PM={dataToday9PM}
        dataForeCast7Day={dataForeCast7Day}
        
      />
    </div>
  )
}

export default App

