import { WeatherDescription } from './types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloud, faCloudBolt, faCloudRain, faCloudSun, faSmog, faSnowflake, faSun } from '@fortawesome/free-solid-svg-icons'

export function weatherDescriptionToEmoji(desc: WeatherDescription): React.ReactElement {
  let icon

  switch (desc) {
    case WeatherDescription.Clear: icon = faSun
    case WeatherDescription.Cloudy: icon = faCloud
    case WeatherDescription.Fog: icon = faSmog
    case WeatherDescription.Overcast: icon = faCloudSun
    case WeatherDescription.Rain: icon = faCloudRain
    case WeatherDescription.Snow: icon = faSnowflake
    case WeatherDescription.Thunderstorm: icon = faCloudBolt
  }

  return <FontAwesomeIcon icon={icon} />
}
