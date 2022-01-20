import './App.css';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import Main from './pages/main/Main';
import Example from './pages/example/Example';

function App() {
	return (
		<div id="content" className="container">
			<Routes>
				<Route path="/" element={<Dashboard />}></Route>
				<Route path="/main" element={<Main />}></Route>
				<Route path="/example" element={<Example />}></Route>
			</Routes>
		</div>
	);
}

export default App;
