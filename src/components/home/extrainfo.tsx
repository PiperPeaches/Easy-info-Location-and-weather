import type { SpeedUnit, WeatherData } from '@/extras/types'
import { faCloudRain, faDroplet, faSun, faWind } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface props {
  loading: boolean,
  weatherData: WeatherData,
  speedUnit: SpeedUnit
}

export default function ExtraInfo({ loading, weatherData, speedUnit }: props) {
  return (
    <div className='grid grid-cols-2 grid-rows-2 rounded-xl p-5 gap-5 bg-slate-700 h-full min-h-50 w-full'>
      <div className='bg-slate-600 flex justify-center px-12 gap-3 items-center text-slate-300 h-full w-full rounded-xl'>
        <FontAwesomeIcon className='text-4xl flex justify-center items-center' icon={faDroplet}/>

        <p className='text-2xl md:text-3xl font-bold flex flex-col justify-center'>
          <span className='text-lg md:text-xl text-slate-400'>Humidity</span>
          <span className='text-xl md:text-3xl flex gap-3 justify-center'>{!loading ? `${weatherData.current.relativeHumidity}% RH` : 'Loading...'}</span>
        </p>
      </div>

      <div className='bg-slate-600 flex justify-center px-12 gap-3 items-center text-slate-300 h-full w-full rounded-xl'>
        <FontAwesomeIcon className='text-4xl' icon={faCloudRain}/>

        <p className='text-2xl md:text-3xl font-bold flex flex-col'>
          <span className='text-lg md:text-xl text-slate-400'>Precipitation</span>
          <span className='text-xl md:text-3xl'>{!loading ? `${weatherData.current.rainChance}%` : 'Loading...'}</span>
        </p>
      </div>

      <div className='bg-slate-600 flex justify-center px-12 gap-3 items-center text-slate-300 h-full w-full rounded-xl'>
        <FontAwesomeIcon className='text-4xl' icon={faWind}/>

        <p className='text-2xl md:text-3xl font-bold flex flex-col'>
          <span className='text-lg md:text-xl text-slate-400'>Windspeed</span>
          <span className='text-xl md:text-3xl'>{!loading ? `${weatherData.current.windSpeed} ${speedUnit}` : 'Loading...'}</span>
        </p>
      </div>

      <div className='bg-slate-600 flex justify-center px-12 gap-3 items-center text-slate-300 h-full w-full rounded-xl'>
        <FontAwesomeIcon className='text-4xl' icon={faSun}/>

        <p className='text-2xl md:text-3xl font-bold flex flex-col'>
          <span className='text-lg md:text-xl text-slate-400'>UV Index</span>
          <span className='text-xl md:text-3xl'> {!loading ? `${weatherData.current.uvIndex}` : 'Loading...'}</span>
        </p>
      </div>
    </div>
  )
}
