import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { Close, MenuOutlined } from '@mui/icons-material';

const Navbar = () => {
	const showMenu = () => {
		document.querySelector('.slider').classList.add('open-slider');
	};

	const closeMenu = () => {
		document.querySelector('.slider').classList.remove('open-slider');
	};
	return (
		<div className="header">
			<div className="menu-icon">
				<MenuOutlined className="menu" onClick={showMenu} />
			</div>
			<nav className={'slider'}>
				<Close className="close" onClick={closeMenu} />
				<ul>
					<li>
						<Link className="menu-link" to="/">
							<Button id="dashboard-button">Strona główna</Button>
						</Link>
					</li>
					<li>
						<Link className="menu-link" to="/example">
							<Button id="example-button">Przykład</Button>
						</Link>
					</li>
					<li>
						<Link className="menu-link" to="/userExample">
							<Button id="userExample-button">Rozwiąż to sam</Button>
						</Link>
					</li>
				</ul>
			</nav>
		</div>
	);
};

export default Navbar;
