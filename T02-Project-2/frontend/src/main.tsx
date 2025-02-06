import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
	uri: import.meta.env.VITE_BACKEND_URI,
	cache: new InMemoryCache(),
});

createRoot(document.getElementById('root')!).render(
	<GoogleOAuthProvider clientId="621752835030-jsl9q4dug932p7ltab5q2ss1j874pglf.apps.googleusercontent.com">
		<StrictMode>
			<ApolloProvider client={client}>
				<App />
			</ApolloProvider>
		</StrictMode>
	</GoogleOAuthProvider>
);
