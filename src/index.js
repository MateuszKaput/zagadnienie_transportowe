import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, StyledEngineProvider, createTheme } from '@mui/material';
const theme = createTheme();

ReactDOM.render(
	<StyledEngineProvider injectFirst>
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</ThemeProvider>
	</StyledEngineProvider>,
	document.getElementById('root')
);
