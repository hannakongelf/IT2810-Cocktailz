import { http, HttpResponse } from 'msw';

// Define the cocktail data to use in responses
const cocktails = [
	{
		id: '1',
		name: 'Margarita',
		imageurl: 'https://example.com/margarita.jpg',
		description: 'A classic cocktail.',
	},
	{
		id: '2',
		name: 'Mojito',
		imageurl: 'https://example.com/mojito.jpg',
		description: 'A refreshing minty cocktail.',
	},
];

export const handlers = [
	// Intercept GET requests to "/api/cocktails"
	http.get('http://localhost/api/cocktails', () => {
		return HttpResponse.json(cocktails, { status: 200 });
	}),

	// Error handling for GET requests to "/api/cocktailserror"
	http.get('http://localhost/api/cocktailserror', () => {
		return HttpResponse.json(
			{ message: 'Failed to fetch cocktails' },
			{ status: 500 }
		);
	}),

	// Fetching a single cocktail by name
	http.get('http://localhost/api/cocktails/:name', ({ params }) => {
		const { name } = params;
		const cocktail = cocktails.find((c) => c.name === name);

		if (cocktail) {
			return HttpResponse.json(cocktail, { status: 200 });
		} else {
			return HttpResponse.json(
				{ message: `Cocktail with name ${name} not found.` },
				{ status: 404 }
			);
		}
	}),
];
