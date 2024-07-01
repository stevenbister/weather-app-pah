import { search } from '@/utils/weather';
import { type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const query = searchParams.get('query');
	const weather = await search(query ?? '');

	return Response.json(weather);
}
