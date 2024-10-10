import { useState, useEffect } from 'react'
// import { Sun, Cloud, CloudRain, Snowflake } from 'lucide-react'
import WeatherForm from './components/WeatherForm'
import WeatherDisplay from './components/WeatherDisplay'

interface WeatherData {
  temperature: number
  weatherCode: number
  windSpeed: number
  humidity: number
}

interface Location {
  name: string
  latitude: number
  longitude: number
}

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [location, setLocation] = useState<Location | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchWeather = async (lat: number, lon: number) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m`
      )
      const data = await response.json()
      setWeatherData({
        temperature: data.current_weather.temperature,
        weatherCode: data.current_weather.weathercode,
        windSpeed: data.current_weather.windspeed,
        humidity: data.hourly.relativehumidity_2m[0],
      })
    } catch {
      setError('Failed to fetch weather data. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (location) {
      fetchWeather(location.latitude, location.longitude)
    }
  }, [location])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Weather App</h1>
        <WeatherForm onLocationSelect={setLocation} />
        {loading && <p className="text-center mt-4">Loading weather data...</p>}
        {error && <p className="text-center mt-4 text-red-500">{error}</p>}
        {weatherData && location && (
          <WeatherDisplay weatherData={weatherData} location={location} />
        )}
      </div>
    </div>
  )
}

export default App