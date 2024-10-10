import React, { useState, useEffect } from 'react'
import { Search } from 'lucide-react'

interface Location {
  name: string
  latitude: number
  longitude: number
}

interface NominatimResponse {
    display_name: string
    lat: string
    lon: string
  }
  
interface WeatherFormProps {
  onLocationSelect: (location: Location) => void
}

const WeatherForm: React.FC<WeatherFormProps> = ({ onLocationSelect }) => {
  const [search, setSearch] = useState('')
  const [suggestions, setSuggestions] = useState<Location[]>([])

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (search.length > 2) {
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(search)}`
          )
          const data: NominatimResponse[] = await response.json()
          setSuggestions(
            data.map((item: NominatimResponse) => ({
                name: item.display_name,
                latitude: parseFloat(item.lat),
                longitude: parseFloat(item.lon),
              }))
              
          )
        } catch (error) {
          console.error('Error fetching suggestions:', error)
        }
      } else {
        setSuggestions([])
      }
    }

    const debounce = setTimeout(fetchSuggestions, 300)
    return () => clearTimeout(debounce)
  }, [search])

  const handleSelectLocation = (location: Location) => {
    onLocationSelect(location)
    setSearch(location.name)
    setSuggestions([])
  }

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for a location..."
          className="w-full px-4 py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 pl-10"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      </div>
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1 max-h-60 overflow-auto">
          {suggestions.map((location, index) => (
            <li
              key={index}
              onClick={() => handleSelectLocation(location)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {location.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default WeatherForm