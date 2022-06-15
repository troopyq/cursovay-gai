import { CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { setupStore } from './store/store';
import { theme } from './theme';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={setupStore()}>
			<BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
				<App />
      </ThemeProvider>
			</BrowserRouter>
		</Provider>
	</React.StrictMode>,
);
