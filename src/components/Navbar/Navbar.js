import React, { useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { Button, Menu, MenuItem } from '@mui/material';
import { Close, MenuOutlined } from '@mui/icons-material';

const Navbar = ({ setActiveMenu }) => {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);

	const [active, setActive] = useState(false);

	const showMenu = () => {
		setActive(true);
		setActiveMenu(true);
	};

	const closeMenu = () => {
		setActive(false);
		setActiveMenu(false);
	};

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleOnClose = () => {
		setAnchorEl(null);
		closeMenu();
	};

	return (
		<div className="header">
			<div className="menu-icon">
				<MenuOutlined className="menu" onClick={showMenu} />
			</div>
			<nav className={active ? 'slider active' : 'slider'}>
				<ul>
					<div className="closed">
						<Close className="close" onClick={closeMenu} />
					</div>
					<li>
						<Button
							id="dashboard-button"
							aria-controls="dashboard-menu"
							aria-haspopup="true"
							aria-expanded={open ? 'true' : undefined}
							onClick={handleClick}
						>
							Strona główna
						</Button>
						<Menu id="dashboard-menu" anchorEl={anchorEl} open={anchorEl?.id === 'dashboard-button'} onClose={handleOnClose}>
							<Link className="menu-link" to="/">
								<MenuItem onClick={handleOnClose}>Dashboard</MenuItem>
							</Link>
						</Menu>
					</li>
					<li>
						<Button
							id="example-button"
							aria-controls="example-menu"
							aria-haspopup="true"
							aria-expanded={open ? 'true' : undefined}
							onClick={handleClick}
						>
							Przykład
						</Button>
						<Menu id="example-menu" anchorEl={anchorEl} open={anchorEl?.id === 'example-button'} onClose={handleOnClose}>
							<Link className="menu-link" to="/example">
								<MenuItem onClick={handleOnClose}>Rozwiązany przykład</MenuItem>
							</Link>
						</Menu>
					</li>
					<li>
						<Button
							id="user-button"
							aria-controls="user-menu"
							aria-haspopup="true"
							aria-expanded={open ? 'true' : undefined}
							onClick={handleClick}
						>
							Użytkownicy
						</Button>
						<Menu id="user-menu" anchorEl={anchorEl} open={anchorEl?.id === 'user-button' ? true : false} onClose={handleOnClose}>
							<Link to="/users">
								<MenuItem onClick={handleOnClose}></MenuItem>
							</Link>
							<Link to="/UserAdd">
								<MenuItem onClick={handleOnClose}></MenuItem>
							</Link>
							<MenuItem
								onKeyDown={(event) => {
									event.stopPropagation();
								}}
							></MenuItem>
						</Menu>
					</li>
				</ul>
			</nav>
		</div>
	);
};

export default Navbar;
