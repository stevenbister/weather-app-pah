export interface Alert {
	headline: string;
	msgtype: null;
	severity: null;
	urgency: null;
	areas: null;
	category: string;
	certainty: null;
	event: string;
	note: null;
	effective: Date;
	expires: Date;
	desc: string;
	instruction: string;
}

export interface Alerts {
	alert: Alert[];
}

export interface Astro {
	sunrise: string;
	sunset: string;
	moonrise: string;
	moonset: string;
	moon_phase: string;
	moon_illumination: string;
}

export interface Astronomy {
	location: Location;
	astronomy: AstronomyClass;
}

export interface AstronomyClass {
	astro: Astro;
}

export interface Condition {
	text: WeatherCondition;
	icon: string;
	code: number;
}

export interface Current {
	location: Location;
	current: CurrentClass;
}

export interface CurrentClass {
	last_updated_epoch: number;
	last_updated: string;
	temp_c: number;
	temp_f: number;
	is_day: number;
	condition: Condition;
	wind_mph: number;
	wind_kph: number;
	wind_degree: number;
	wind_dir: string;
	pressure_mb: number;
	pressure_in: number;
	precip_mm: number;
	precip_in: number;
	humidity: number;
	cloud: number;
	feelslike_c: number;
	feelslike_f: number;
	vis_km: number;
	vis_miles: number;
	uv: number;
	gust_mph: number;
	gust_kph: number;
	air_quality: { [key: string]: number };
}

export interface Day {
	maxtemp_c: number;
	maxtemp_f: number;
	mintemp_c: number;
	mintemp_f: number;
	avgtemp_c: number;
	avgtemp_f: number;
	maxwind_mph: number;
	maxwind_kph: number;
	totalprecip_mm: number;
	totalprecip_in: number;
	avgvis_km: number;
	avgvis_miles: number;
	avghumidity: number;
	daily_will_it_rain: number;
	daily_chance_of_rain: number;
	daily_will_it_snow: number;
	daily_chance_of_snow: number;
	condition: Condition;
	uv: number;
}

export interface Forecast {
	location: Location;
	current: CurrentClass;
	forecast: ForecastClass;
	alerts: Alerts;
}

export interface ForecastClass {
	forecastday: Forecastday[];
}

export interface Forecastday {
	date: Date;
	date_epoch: number;
	day: Day;
	astro: Astro;
	hour: Hour[];
}

export interface Future {
	location: Location;
	forecast: Forecast;
}

export interface History {
	location: Location;
	forecast: Forecast;
}

export interface Hour {
	time_epoch: number;
	time: string;
	temp_c: number;
	temp_f: number;
	is_day: number;
	condition: Condition;
	wind_mph: number;
	wind_kph: number;
	wind_degree: number;
	wind_dir: string;
	pressure_mb: number;
	pressure_in: number;
	precip_mm: number;
	precip_in: number;
	humidity: number;
	cloud: number;
	feelslike_c: number;
	feelslike_f: number;
	windchill_c: number;
	windchill_f: number;
	heatindex_c: number;
	heatindex_f: number;
	dewpoint_c: number;
	dewpoint_f: number;
	will_it_rain: number;
	chance_of_rain: number;
	will_it_snow: number;
	chance_of_snow: number;
	vis_km: number;
	vis_miles: number;
	gust_mph: number;
	gust_kph: number;
	uv: number;
}

export interface IP {
	ip: string;
	type: string;
	continent_code: string;
	continent_name: string;
	country_code: string;
	country_name: string;
	is_eu: boolean;
	geoname_id: number;
	city: string;
	region: null;
	lat: number;
	lon: number;
	tz_id: string;
	localtime_epoch: number;
	localtime: string;
}

export interface Location {
	name: string;
	region: string;
	country: string;
	lat: number;
	lon: number;
	tz_id: string;
	localtime_epoch: number;
	localtime: string;
}

export interface Marine {
	location: Location;
	forecast: Forecast;
}

export interface Search {
	id: number;
	name: string;
	region: string;
	country: string;
	lat: number;
	lon: number;
	url: string;
}

export interface Timezone {
	name: string;
	region: string;
	country: string;
	lat: number;
	lon: number;
	tz_id: string;
	localtime_epoch: number;
	localtime: string;
}

export interface WeatherError {
	code: number;
	message: string;
}

export type WeatherCondition =
	| 'Sunny'
	| 'Clear'
	| 'Partly cloudy'
	| 'Cloudy'
	| 'Overcast'
	| 'Mist'
	| 'Patchy rain possible'
	| 'Patchy snow possible'
	| 'Patchy sleet possible'
	| 'Patchy freezing drizzle possible'
	| 'Thundery outbreaks possible'
	| 'Blowing snow'
	| 'Blizzard'
	| 'Fog'
	| 'Freezing fog'
	| 'Patchy light drizzle'
	| 'Light drizzle'
	| 'Freezing drizzle'
	| 'Heavy freezing drizzle'
	| 'Patchy light rain'
	| 'Light rain'
	| 'Moderate rain at times'
	| 'Moderate rain'
	| 'Heavy rain at times'
	| 'Heavy rain'
	| 'Light freezing rain'
	| 'Moderate or heavy freezing rain'
	| 'Light sleet'
	| 'Moderate or heavy sleet'
	| 'Patchy light snow'
	| 'Light snow'
	| 'Patchy moderate snow'
	| 'Moderate snow'
	| 'Patchy heavy snow'
	| 'Heavy snow'
	| 'Ice pellets'
	| 'Light rain shower'
	| 'Moderate or heavy rain shower'
	| 'Torrential rain shower'
	| 'Light sleet showers'
	| 'Moderate or heavy sleet showers'
	| 'Light snow showers'
	| 'Moderate or heavy snow showers'
	| 'Light showers of ice pellets'
	| 'Moderate or heavy showers of ice pellets'
	| 'Patchy light rain with thunder'
	| 'Moderate or heavy rain with thunder'
	| 'Patchy light snow with thunder'
	| 'Moderate or heavy snow with thunder';
