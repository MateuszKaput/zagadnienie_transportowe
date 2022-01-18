import './App.css';
import Navbar from './pages/components/Navbar/Navbar';

function App() {
	return (
		<div id="content" className="container">
			<BrowserRouter history={history}>
				<Switch>
					<Route path="/login">
						<Login />
					</Route>
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
