const { defineConfig } = require('cypress');
require('dotenv').config(); // Load environment variables for sensitive data

module.exports = defineConfig({
	reporter: 'spec', // Use a mocha reporter for test results

	e2e: {
		baseUrl: 'http://localhost:3001', // Set the base URL for the application under test

		// Disable Chrome's web security (required for cross-origin testing or special setups)
		chromeWebSecurity: false,

		// Enable experimental Studio feature for generating Cypress tests interactively
		experimentalStudio: true,

		setupNodeEvents(on, config) {
			// Inject environment variables into the Cypress config (for sensitive data like API keys)
			config.env.googleClientId = process.env.GOOGLE_CLIENT_ID;
			config.env.googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
			config.env.googleRefreshToken = process.env.GOOGLE_REFRESH_TOKEN;

			return config;
		},
	},
});
