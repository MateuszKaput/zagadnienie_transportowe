import './App.css';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import Main from './pages/main/Main';

function App() {
	return (
		<div id="content" className="container">
			<Routes>
				<Route path="/" element={<Dashboard />}></Route>
				<Route path="/main" element={<Main />}></Route>
			</Routes>
		</div>
	);
}

export default App;
