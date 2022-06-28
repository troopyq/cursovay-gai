import { CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import App from './App';
import { setupStore } from './store/store';
import { theme } from './theme';

const basename = import.meta.env.VITE_BASENAME || ''

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={setupStore()}>
			<HashRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
				<App />
      </ThemeProvider>
			</HashRouter>
		</Provider>
	</React.StrictMode>,
);
