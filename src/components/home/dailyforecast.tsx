import { weatherDescriptionToString } from '@/extras/scripts'
import { weatherDescriptionToEmoji } from '@/extras/scripts-tsx'
import type { TempUnit, WeatherData } from '@/extras/types'

interface props {
  loading: boolean,
  weatherData: WeatherData,
  tempUnit: TempUnit
}

export default function DailyForecast({ loading, weatherData, tempUnit }: props) {
  return (
    <div className='flex flex-col rounded-xl bg-slate-700 h-screen w-full md:w-[60%]'>
      {!loading ? weatherData.daily.map((itm, i) => <div className='bg-slate-600 rounded-xl p-5 m-3 flex-row h-full flex items-center font-bold' key={i}>
        <p className='text-xl w-full text-slate-400 justify-center items-center flex'>{itm.weekday}</p>
        <p className='text-xl w-full justify-center items-center gap-3 flex'>{weatherDescriptionToEmoji(itm.description)} {weatherDescriptionToString(itm.description)}</p>

        <p className='text-xl text-slate-400 w-full justify-center items-center flex'>
          <span className='text-orange-400'>{itm.temperature.high}°{tempUnit}</span> /
          <span className='text-blue-400'>{itm.temperature.low}°{tempUnit}</span>
        </p>
      </div>) : 'Loading...'}
    </div>
  )
}
