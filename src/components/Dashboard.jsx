import iconTemp from "/temp.svg";
import iconWind from "/wind.svg";
import iconSun from "/sun.svg";
import iconRain from "/rain.svg";

function Dashboard({
  dataWeather,
  dataLocation,
  dataWeatherAllday,
  dataToday6AM,
  dataToday9AM,
  dataToday12PM,
  dataToday3PM,
  dataToday6PM,
  dataToday9PM,
  dataForeCast7Day
}) {
  return (
    <div className="bg-gray-900 text-white w-full flex flex-col lg:flex-row">
      {/* Left side: Main weather section */}
      <div className="w-full lg:w-3/4 h-full px-6 py-8 flex flex-col justify-between">
        <div className="flex flex-col items-center justify-center space-y-4 h-64 p-6">
          <p className="text-4xl lg:text-6xl font-bold">{dataLocation.name}</p>
          <p className="text-lg lg:text-xl text-gray-400">{dataLocation.region}, {dataLocation.country}</p>
          <p className="text-5xl lg:text-7xl font-bold mt-5">{dataWeather.temp_c}°</p>
        </div>

        {/* Today's Forecast */}
        <div className="bg-gray-800 p-4 lg:p-6 rounded-xl shadow-lg my-6 lg:my-10">
          <p className="text-lg font-bold mb-4">TODAY'S FORECAST</p>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-4">
            {[dataToday6AM, dataToday9AM, dataToday12PM, dataToday3PM, dataToday6PM, dataToday9PM].map((timeData, index) => (
              <div key={index} className="flex flex-col items-center space-y-2 border p-3 lg:p-5 rounded-lg border-gray-600">
                <p className="text-gray-400 font-bold">{`${6 + 3 * index}:00`}</p>
                <img
                  src={timeData?.condition?.icon ? `https:${timeData.condition.icon}` : "placeholder.png"}
                  alt="Weather Icon"
                  className="w-8 lg:w-12"
                />
                <p className="text-lg lg:text-xl font-bold">{timeData?.temp_c}°</p>
              </div>
            ))}
          </div>
        </div>

        {/* Air Conditions */}
        <div className="bg-gray-800 p-4 lg:p-6 rounded-xl shadow-lg">
          <p className="text-lg font-bold mb-4">Air Conditions</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
            <div className="flex items-center space-x-4">
              <img src={iconTemp} alt="Temperature" className="w-6 lg:w-8" />
              <p className="text-gray-400">Real Feel</p>
              <p className="text-3xl lg:text-4xl font-bold">{dataWeather.feelslike_c}°</p>
            </div>
            <div className="flex items-center space-x-4">
              <img src={iconWind} alt="Wind" className="w-6 lg:w-8" />
              <p className="text-gray-400">Wind</p>
              <p className="text-3xl lg:text-4xl font-bold">{dataToday9PM.wind_kph} km/h</p>
            </div>
            <div className="flex items-center space-x-4">
              <img src={iconRain} alt="Rain" className="w-6 lg:w-8" />
              <p className="text-gray-400">Chance of Rain</p>
              <p className="text-3xl lg:text-4xl font-bold">{dataWeatherAllday.daily_chance_of_rain}%</p>
            </div>
            <div className="flex items-center space-x-4">
              <img src={iconSun} alt="UV Index" className="w-6 lg:w-8" />
              <p className="text-gray-400">UV Index</p>
              <p className="text-3xl lg:text-4xl font-bold">{dataWeatherAllday.uv}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side: 7-day Forecast */}
      <div className="w-full lg:w-1/4 h-full bg-gray-800 p-4 lg:p-6 rounded-xl shadow-lg flex flex-col space-y-4 mt-6 lg:mt-0">
        <p className="text-lg font-bold">7-DAY FORECAST</p>
        <div className="space-y-4">
          {dataForeCast7Day && dataForeCast7Day.map((day, index) => (
            <div key={index} className="border-t border-gray-700 pt-4">
              <p className="text-lg lg:text-xl font-bold text-gray-300">{new Date(day.date).toLocaleDateString('en-US', { weekday: 'long' })}</p>
              <div className="flex justify-between items-center">
                <img src={day.day.condition?.icon ? `https:${day.day.condition.icon}` : "placeholder.png"} alt="Weather Icon" className="w-8 lg:w-10" />
                <div className="text-right">
                  <p className="text-lg lg:text-xl font-bold">{day.day.maxtemp_c}°C</p>
                  <p className="text-gray-400">/{day.day.mintemp_c}°C</p>
                </div>
              </div>
              <p className="text-gray-400">{day.day.condition?.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
