import type { CurrentClass } from '@/types';
import { formatDateTime } from '@/utils/datetime';
import { getCurrentById } from '@/utils/weather';
import { Stack } from '@chakra-ui/react';
import Image from 'next/image';
import { Alert } from './Alert';

export interface WeatherProps {
	id: number;
}

export async function CurrentWeather({ id }: WeatherProps) {
	const weather = await getCurrentById(id);

	if (!weather) {
		return (
			<Stack as="section">
				{/* eslint-disable-next-line react/no-unescaped-entities */}
				<h1>Looks like you haven't searched for a location yet.</h1>
				<p>Try searching by postcode, or city name in the search bar above.</p>
			</Stack>
		);
	}

	if ('error' in weather) {
		return <Alert status="error" message={weather.error} />;
	}

	return (
		<section>
			<div>
				{weather.location.name ?? ''}
				{formatDateTime(weather.location.localtime) ?? ''}

				{/* TODO: get better icons/images */}
				<Image
					src={`https:${weather.current.condition.icon}`}
					alt={weather.current.condition.text}
					width={200}
					height={200}
				/>
				<CurrentWeatherTemp current={weather.current} />
			</div>
			<CurrentWeatherGrid current={weather.current} />
		</section>
	);
}

/* -------------------------------------------------------------------------------------------------
 * CurrentWeatherTemp
 * -----------------------------------------------------------------------------------------------*/
interface CurrentWeatherTempProps {
	current: CurrentClass;
}

function CurrentWeatherTemp({ current }: CurrentWeatherTempProps) {
	return (
		<div>
			<p>
				<span>{current.temp_c ?? ''}</span>°C
			</p>
			<p>
				Feels like: <span>{current.feelslike_c ?? ''}°C</span>
			</p>
		</div>
	);
}

/* -------------------------------------------------------------------------------------------------
 * CurrentWeatherGrid
 * -----------------------------------------------------------------------------------------------*/
interface CurrentWeatherGridProps {
	current: CurrentClass;
}

function CurrentWeatherGrid({ current }: CurrentWeatherGridProps) {
	return (
		<div>
			<WeatherInfo label="Humidity" value={current.humidity ?? ''} unit="%" />
			<WeatherInfo label="UV" value={current.uv ?? 0} unit="/10" />
			<WeatherInfo label="Wind" value={current.wind_kph ?? ''} unit="km/h" />
			<WeatherInfo label="Rain" value={current.precip_mm ?? ''} unit="mm" />
		</div>
	);
}

/* -------------------------------------------------------------------------------------------------
 * WeatherInfo
 * -----------------------------------------------------------------------------------------------*/
interface WeatherInfoProps {
	label: string;
	value: string | number;
	unit: string;
}

function WeatherInfo({ label, value, unit }: WeatherInfoProps) {
	return (
		<dl>
			<dt>{label}</dt>
			<dd>
				{value} <span>{unit}</span>
			</dd>
		</dl>
	);
}
