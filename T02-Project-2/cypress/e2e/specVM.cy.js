/*

Exchange link with this one after frontend have been updated on VM

cy.visit('http://it2810-02.idi.ntnu.no/project2/');

*/

describe('e2e testing Cocktailz', () => {
	const clientId = Cypress.env('googleClientId');
	const clientSecret = Cypress.env('googleClientSecret');
	const refreshToken = Cypress.env('googleRefreshToken');

	before(() => {
		cy.request({
			method: 'POST',
			url: 'https://www.googleapis.com/oauth2/v4/token',
			body: {
				grant_type: 'refresh_token',
				client_id: clientId,
				client_secret: clientSecret,
				refresh_token: refreshToken,
			},
		}).then(({ body }) => {
			Cypress.env('accessToken', body.access_token);
		});
	});

	beforeEach(() => {
		cy.intercept('POST', '/graphql', { log: false });
		cy.viewport(1400, 1000);
		cy.visit('http://localhost:5173/project2');

		// Ignore specific Apollo error temporarily if they persist
		cy.on('uncaught:exception', (err, runnable) => {
			// Ignore specific errors (optional)
			if (err.message.includes('Invariant Violation')) {
				return false; // Prevent Cypress from failing the test for this error
			}
			if (err.message.includes('Store reset while query was in flight')) {
				return false;
			}
			if (err.message.includes('An error occurred!')) {
				// Handle Apollo Client promise rejection
				return false;
			}
			if (err.message.includes('Cannot return null for non-nullable field')) {
				// GraphQL schema issues
				return false;
			}
		});

		// Set the token in sessionStorage
		cy.window().then((window) => {
			const token = Cypress.env('accessToken');
			window.sessionStorage.setItem('token', token);
		});

		cy.reload();
	});

	// First, check if the website is up and running
	it('Visits Cocktailz website on VM', () => {
		cy.visit('http://localhost:5173/project2');
	});

	describe('Home page and cocktail page', () => {
		// Next, explore the home page by clicking on various elements
		// It is hard to test the Todays Cocktail feature as it changes every day, and it is the image and title that is clickable
		it('Explore the home page and cocktail page', () => {
			// Intercept GraphQL requests to ensure they complete before next steps
			cy.intercept('POST', '/graphql').as('graphqlRequest');
			// Click on the A.J. cocktail card
			cy.get('[data-testid="CocktailCardImage-A. J."] > .object-cover').click();
			// Click on the home button
			cy.goHome();
			// Click on the LoadMore button
			cy.get('[data-testid="LoadMoreButton"]').click();
			// Click on the Go-To-Top button
			cy.get('.MuiButton-root').click();
			// Click on the Filter button: Cocktail
			cy.get('[aria-label="Filter by Cocktail"]').click();
			// Click on the Filter button: Punch
			cy.get('[aria-label="Filter by Punch / Party Drink"]').click();
			// Click on the sorting menu
			cy.get('.-mr-1').click();
			// Hover over the sorting menu and click on "Z to A"
			cy.get(
				'#headlessui-menu-item-\\:r1v\\: > .hover\\:bg-dark-pink\\/30'
			).click();
			// Click on the sorting menu
			cy.get('#headlessui-menu-button-\\:r1l\\:').click();
			// Hover over the sorting menu and click on "increasing ingredient amount"
			cy.get(
				'#headlessui-menu-item-\\:r29\\: > .hover\\:bg-dark-pink\\/30'
			).click();
			// Try to remove chosen filter to check that the active sorting still works
			cy.get('.md\\:flex-row > .flex > .bg-dark-pink').click();
		});

		// Next, try the shot roulette feature
		it('Try the shot roulette', () => {
			// Click on the shot roulette button
			cy.get('[data-testid="WheelButton"]').click();
			// Click on the 'Spin!' button
			cy.get('[data-testid="SpinButton"]').click();
			// Wait for the wheel to finish spinning
			cy.wait(12000);
			// Click on the 'Take this shot' button
			cy.get('[data-testid="TakeShotButton"]').click();
			// Click on the home button
			cy.goHome();
		});
	});

	describe('Search page', () => {
		// Next, try the search, sort and filter feature
		it('Try the search and sort feature', () => {
			// Intercept GraphQL requests to ensure they complete before next steps
			cy.intercept('POST', '/graphql').as('graphqlRequest');
			// Click on the search bar, type in "gin" and press enter to go to the serach page
			cy.get('.MuiInputBase-input').clear('g');
			cy.get('.MuiInputBase-input').type('gin{enter}');
			// Wait for the serach page to fully load
			cy.wait(5000);
			cy.wait('@graphqlRequest');
			// Turn on ingredient filter to display all drinks containing gin
			cy.get('.w-9').click();
			cy.get('.sr-only').check();
			// Turn off ingredient filter to again display all drinks named something with gin
			cy.get('.w-9').click();
			cy.get('.sr-only').uncheck();
			// Click on the cocktail filter "Cocktail"
			cy.get('[aria-label="Filter by Cocktail"]').click();
			// Click on, and open, the sorting menu
			cy.get('#headlessui-menu-button-\\:r11\\:').click();
			// Click on the "Increasing ingredient amount" sorting option
			cy.get(
				'#headlessui-menu-item-\\:r1d\\: > .hover\\:bg-dark-purple\\/30'
			).click();
			// Turn off the cocktail filter to check sorting works alone
			cy.get('.bg-dark-purple').click();
			// Click on, and open, the sorting menu
			cy.get('#headlessui-menu-button-\\:r11\\:').click();
			// Click on the "Z-A" sorting option
			cy.get(
				'#headlessui-menu-item-\\:r1j\\: > .hover\\:bg-dark-purple\\/30'
			).click();
		});
	});

	describe('Favorite, rating and review', () => {
		// Next, try the favorite feature
		it('Favorite a cocktail', () => {
			// Intercept GraphQL requests to ensure they complete before next steps
			cy.intercept('POST', '/graphql').as('graphqlRequest');
			// Favorite the A.J. cocktail and wait for the GraphQL request to complete after favoriting
			cy.get(
				':nth-child(1) > .flex > [data-testid="FavoriteIcon"] > path'
			).click();
			cy.wait('@graphqlRequest');
			// Favorite the ABC cocktail and wait for the GraphQL request to complete after favoriting
			cy.get(
				':nth-child(3) > .flex > [data-testid="FavoriteIcon"] > path'
			).click();
			cy.wait('@graphqlRequest');
			// Favorite the Ace cocktail and wait for the GraphQL request to complete after favoriting
			cy.get(
				':nth-child(4) > .flex > [data-testid="FavoriteIcon"] > path'
			).click();
			cy.wait('@graphqlRequest');
			// Click on the A.J. cocktail to verify the cocktail is favorited on cocktail page as well
			cy.get('[data-testid="CocktailCardImage-A. J."] > .object-cover').click();
			cy.wait('@graphqlRequest'); // Wait again if this action triggers another request
			// Click on the home button
			cy.goHome();
		});

		// Next, try the rating and review feature
		it('Give a rating and a review to a cocktail and try to update them', () => {
			cy.intercept('POST', '/graphql').as('graphqlRequest');
			// Click on the A1 cocktail to go to the cocktail page
			cy.get('[data-testid="CocktailCardImage-A1"] > .object-cover').click();
			// Give a rating to the cocktail
			cy.get('[for=":rr:-:r13:"]').click();
			cy.get('#\\:rr\\:-\\:r13\\:').check({ force: true });
			// Update teh rating
			cy.get('[for=":rr:-:r11:"]').click();
			cy.get('#\\:rr\\:-\\:r11\\:').check({ force: true });
			// Click on teh revoiew filed and update the review
			cy.get('#review').clear('Looks goodN');
			cy.get('#review').type('Looks goodNice');
			// Click the save review button
			cy.get('.MuiButton-root').click();
			// Click on the delete review button to delete the existing review
			cy.get('[data-testid="DeleteIcon"]').click();
			// Click on the home button
			cy.goHome();
		});
	});
});
