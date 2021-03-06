import './App.css';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import Example from './pages/example/Example';
import UserExample from 'pages/userExample/UserExample';

function App() {
	return (
		<div>
			<Routes>
				<Route path="/" element={<Dashboard />}></Route>
				<Route path="/example" element={<Example />}></Route>
				<Route path="/userExample" element={<UserExample />}></Route>
			</Routes>
		</div>
	);
}

export default App;
