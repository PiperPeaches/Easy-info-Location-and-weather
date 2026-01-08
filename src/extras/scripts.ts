import { type Weekday, WeatherDescription } from './types.ts'

export function weekdayFromDate(date: string): Weekday {
  const day = new Date(date).getDay()
  const days: Weekday[] = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ]

  return days[day]
}

export function wmoToDescription(wmo: number): WeatherDescription {
  switch (wmo) {
    case 0: return WeatherDescription.Clear // 'Clear sky'
    case 1: return WeatherDescription.Overcast // 'Mainly clear, partly cloudy, and overcast'
    case 2: return WeatherDescription.Overcast
    case 3: return WeatherDescription.Overcast
    case 45: return WeatherDescription.Fog // 'Fog and depositing rime fog'
    case 48: return WeatherDescription.Fog
    case 51: return WeatherDescription.Rain // 'Drizzle: Light, moderate, and dense intensity'
    case 53: return WeatherDescription.Rain
    case 55: return WeatherDescription.Rain
    case 56: return WeatherDescription.Rain // 'freezing drizzle'
    case 57: return WeatherDescription.Rain
    case 61: return WeatherDescription.Rain // 'Rain: Slight, moderate and heavy intensity'
    case 63: return WeatherDescription.Rain
    case 65: return WeatherDescription.Rain
    case 66: return WeatherDescription.Rain // 'Freezing Rain: Light and heavy intensity'
    case 67: return WeatherDescription.Rain
    case 71: return WeatherDescription.Snow // 'Snow fall: Slight, moderate, and heavy intensity'
    case 73: return WeatherDescription.Snow
    case 75: return WeatherDescription.Snow
    case 77: return WeatherDescription.Snow // 'Snow grains'
    case 80: return WeatherDescription.Rain // 'Rain showers: Slight, moderate, and violent'
    case 81: return WeatherDescription.Rain
    case 82: return WeatherDescription.Rain
    case 85: return WeatherDescription.Snow // 'Snow showers slight and heavy'
    case 86: return WeatherDescription.Snow
    case 95: return WeatherDescription.Thunderstorm // 'Thunderstorm: Slight or moderate'
    case 96: return WeatherDescription.Thunderstorm // 'Thunderstorm with slight and heavy hail'
    case 99: return WeatherDescription.Thunderstorm

    default: return WeatherDescription.Clear
  }
}

export function weatherDescriptionToString(desc: WeatherDescription): string {
  switch (desc) {
    case WeatherDescription.Clear: return 'Clear'
    case WeatherDescription.Cloudy: return 'Cloudy'
    case WeatherDescription.Fog: return 'Foggy'
    case WeatherDescription.Overcast: return 'Overcast'
    case WeatherDescription.Rain: return 'Rain'
    case WeatherDescription.Snow: return 'Snow'
    case WeatherDescription.Thunderstorm: return 'T-Storm'
  }
}

export async function getPosition(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition((loc) => { resolve(loc) }, reject)
  })
}

export function timeFormatFunction(hour: number, clockFormat: '24' | '12'): string {
  if (clockFormat == '24') {
    return hour.toString().padStart(2, '0') + ':00'
  }

  if (hour == 0) {
    return '12:00 AM'
  }

  if (hour < 12) {
    return hour.toString() + ':00 AM'
  } else if (hour == 12) {
    return '12:00 PM'
  }

  return (hour - 12).toString() + ':00 PM'
}
