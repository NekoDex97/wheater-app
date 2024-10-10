import React from 'react'
import { Sun, Cloud, CloudRain, Snowflake, Wind, Droplets } from 'lucide-react'

interface WeatherDisplayProps {
  weatherData: {
    temperature: number
    weatherCode: number
    windSpeed: number
    humidity: number
  }
  location: {
    name: string
  }
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weatherData, location }) => {
  const getWeatherIcon = (code: number) => {
    if (code === 0) return <Sun className="w-16 h-16 text-yellow-400" />
    if (code >= 1 && code <= 3) return <Cloud className="w-16 h-16 text-gray-400" />
    if (code >= 51 && code <= 67) return <CloudRain className="w-16 h-16 text-blue-400" />
    if (code >= 71 && code <= 77) return <Snowflake className="w-16 h-16 text-blue-200" />
    return <Cloud className="w-16 h-16 text-gray-400" />
  }

  const getWeatherDescription = (code: number) => {
    if (code === 0) return 'Clear sky'
    if (code >= 1 && code <= 3) return 'Partly cloudy'
    if (code >= 51 && code <= 67) return 'Rainy'
    if (code >= 71 && code <= 77) return 'Snowy'
    return 'Cloudy'
  }

  return (
    <div className="mt-6 text-center">
      <h2 className="text-xl font-semibold mb-2">{location.name}</h2>
      <div className="flex justify-center">{getWeatherIcon(weatherData.weatherCode)}</div>
      <p className="mt-2 text-3xl font-bold">{weatherData.temperature}°C</p>
      <p className="mt-1 text-lg text-gray-600">{getWeatherDescription(weatherData.weatherCode)}</p>
      <div className="mt-4 flex justify-center space-x-4">
        <div className="flex items-center">
          <Wind className="w-5 h-5 mr-1 text-gray-500" />
          <span>{weatherData.windSpeed} km/h</span>
        </div>
        <div className="flex items-center">
          <Droplets className="w-5 h-5 mr-1 text-gray-500" />
          <span>{weatherData.humidity}%</span>
        </div>
      </div>
    </div>
  )
}

export default WeatherDisplay