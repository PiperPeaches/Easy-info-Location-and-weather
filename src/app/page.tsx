'use client'

import type { CityData } from '../extras/types.ts'

import { useState, useEffect } from 'react'

export default function Home() {
  const [ searchCityName, setSearchCityName ] = useState('')
  const [ city, setCity ] = useState<CityData>()
  const [ loading, setLoading ] = useState(true)
  const [ metric, setMetric ] = useState(false)

  useEffect(() => {
    async function run() {
      if (!('geolocation' in navigator)) {
        const location = await captureIpLocation()

        setCity(location)
        setMetric(location.country != 'United States')
        
        return
      }

      const position = await getPosition()
      const { latitude, longitude } = position.coords

      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
      
      if (res.status != 200) {
        const location = await captureIpLocation()

        setCity(location)
        setMetric(location.country != 'United States')
        
        return
      }

      const { town, state, country } = (await res.json()).address
      
      setCity({ town, state, country, location: [ latitude, longitude ] })
      setMetric(country != 'United States')
    }

    run()
  }, [])

  async function captureIpLocation(): Promise<CityData> {
    const res = await fetch('https://ipapi.co/json/')

    if (res.status != 200) {
      return {
        town: 'New York (fallback)',
        state: 'New York',
        country: 'United States',
        location: [ -74.0060, 40.7128 ]
      }
    }

    const { city, region, country_name, latitude, longitude } = await res.json()

    return { town: city, state: region, country: country_name, location: [ latitude, longitude ] }
  }

  async function getPosition(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((loc) => { resolve(loc) }, reject)
    })
  }

  async function fetchWeather() {
    if (!city) return

    setLoading(true)
    
    const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${city.location[0]}&longitude=${city.location[1]}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&temperature_unit=${metric ? 'celcius' : 'fahrenheit'}&wind_speed_unit=${metric ? 'kph' : 'mph'}&precipitation_unit=${metric ? 'centimeter' : 'inch'}&timezone=auto`)
    const data = await res.json()

    // weather thing here
  } // setLoading(false) at the end of this function

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    fetchWeather()
  }

  function handleCityNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchCityName(e.target.value)
  }

  return (
    <div className='flex flex-col md:flex-row min-h-screen p-5 font-sans bg-stone-800 gap-3'>
      {/* Left */}
      <div className='flex flex-col min-h-screen w-full'>
        {/* Search bar */}
        <form onSubmit={handleSubmit}>
          <input type='text' placeholder='Enter city name' className='bg-stone-700 rounded-xl p-2 w-full placeholder-stone-400' onChange={handleCityNameChange} />
        </form>
      
        {/* Main content */}
        <div className='flex flex-col rounded-xl mt-3 p-5 h-full'>
          <div className='flex flex-row gap-5 justify-start'>
            <div className='flex justify-between flex-col h-full w-full gap-5'>
              <div>
                <h1 className='text-3xl font-bold text-stone-300'>Lancaster New London, Mexico</h1>
                <p className='text-stone-400'>Chance of rain -100%</p>
              </div>

              <div>
                <h1 className='text-6xl font-bold text-stone-300'>5000&deg;C</h1>
              </div>
            </div>

            <div className='flex items-center'>
              <h1 className='text-9xl font-bold text-stone-300'>☀️</h1>
            </div>
          </div>
        </div> 

        {/* Todays Forecast */}
        <div className='flex flex-row rounded-xl bg-stone-700 h-full w-full'>
          <p> content </p>
        </div>

        {/* Extra Info */}
        <div className='flex rounded-xl bg-stone-700 h-full w-full'>
          <p> content </p>
        </div>
      </div>

      {/* Right */}
      <div className='flex flex-col rounded-xl bg-stone-700 h-screen w-full md:w-[60%]'>
        {/* Weekly Forecast */}
        <p> content </p>
      </div>
    </div>
  )
}
