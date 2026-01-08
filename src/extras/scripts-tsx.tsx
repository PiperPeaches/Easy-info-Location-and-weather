import { WeatherDescription } from './types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloud, faCloudBolt, faCloudRain, faCloudSun, faSmog, faSnowflake, faSun } from '@fortawesome/free-solid-svg-icons'

export function weatherDescriptionToEmoji(desc: WeatherDescription): React.ReactElement {
  let icon

  switch (desc) {
    case WeatherDescription.Clear: icon = faSun; break;
    case WeatherDescription.Cloudy: icon = faCloud; break;
    case WeatherDescription.Fog: icon = faSmog; break;
    case WeatherDescription.Overcast: icon = faCloudSun; break;
    case WeatherDescription.Rain: icon = faCloudRain; break;
    case WeatherDescription.Snow: icon = faSnowflake; break;
    case WeatherDescription.Thunderstorm: icon = faCloudBolt; break;
  }

  return <FontAwesomeIcon icon={icon} />
}
