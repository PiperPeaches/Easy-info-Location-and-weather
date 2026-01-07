const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState(null);
  const [ weather, setWeather ] = useState(null);
  const [ location, setLocation ] = useState('');
  const [ searchInput, setSearchInput ] = useState('');

  const getStatus = (temp) => {
    if (temp <= 20) return { label: 'FROZEN' };
    if (temp <= 32) return { label: 'FREEZING' };
    if (temp <= 55) return { label: 'COLD' };
    if (temp <= 75) return { label: 'WARM' };
    if (temp <= 90) return { label: 'HOT' };
    if (temp <= 105) return { label: 'MELTING' };

    return { label: 'MELTED' }
  };

  const getWindStatus = (speed) => {
    if (speed <= 5) return 'STILL';
    if (speed <= 10) return 'BREEZY';
    if (speed <= 20) return 'WINDY';
    if (speed <= 30) return 'FAST';

    return 'STORM';
  };

  const getHumidityStatus = (humidity) => {
    if (humidity <= 30) return 'DRY';
    if (humidity <= 60) return 'NORMAL';
    if (humidity <= 80) return 'WET';
    
    return 'SOAKED';
  }

  const fetchWeather = async (lat, lon, locationName) => {
    try {
      setLoading(true);
      setError(null);
      
      const res = await fetch( `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=auto`);
      const data = await res.json();
      
      if (!res.ok) throw new Error('Data Unavailable');

      setWeather({
        current: {
          temp: Math.round(data.current.temperature_2m),
          humidity: data.current.relative_humidity_2m,
          wind: data.current.wind_speed_10m,
        },
        daily: data.daily.time.map((time, index) => ({
          date: new Date(time).toLocaleDateString('en-US', { weekday: 'short' }),
          max: Math.round(data.daily.temperature_2m_max[index]),
          min: Math.round(data.daily.temperature_2m_min[index]),
        })),
        locationName: locationName || 'Unknown'
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    };
  }

  useEffect(() => {
    const initLocation = async () => {
      if (!('geolocation' in navigator)) {
        fallbackToIpLocation();
        
        return
      }

      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const data = await res.json();
          const cityName = data.address.city || data.address.town || data.address.village || data.address.county || 'Unknown';

          setLocation(cityName);
          fetchWeather(latitude, longitude, cityName);
        } catch {
          fallbackToIpLocation();
        }
      }, () => {
        fallbackToIpLocation();
      });
    };
    
    initLocation()
  }, [])

  const fallbackToIpLocation = async () => {
    try {
      const geoRes = await fetch('https://ipapi.co/json/');
      if (!geoRes.ok) throw new Error('IP Geolocation Failed');
      const geoData = await geoRes.json();
      setLocation(`${geoData.city}, ${geoData.region}`);
      fetchWeather(geoData.latitude, geoData.longitude, `${geoData.region}`);
    } catch (err) {
      fetchWeather(40.7128, -74.0060, 'New York, NY [Fallback]');
    }
  }

  const searchHandler = async (e) => {
    e.preventDefault();
    if (!searchInput) return;

    try {
      setLoading(true);
      const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${searchInput}&count=1&language=en&format=json`);
      const data = await res.json();

      if (!data.results || data.results.length === 0) throw new Error('Not Found');

      const place = data.results[0];

      setLocation(`${place.name}, ${place.country}`);
      fetchWeather(place.latitude, place.longitude, `${place.name}, ${place.country}`);
    } catch (err) {
      setError (err.message);
      setLoading(false);
    }
  };

  const currentStatus = weather ? getStatus(weather.current.temp) : {label: 'LOADING'};
  const integrityPercent = weather ? Math.min(Math.max((weather.current.temp /2800) *100, 100), 100) :0;
  const earthScalePercent = weather ? Math.min(Math.max(((weather.current.temp + 20) /140) *100,0),100) : 0;
  