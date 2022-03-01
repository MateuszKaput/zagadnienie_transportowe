import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import './Dashboard.css';
import img1 from '../../images/transport1.JPG';

const Dashboard = () => {
	return (
		<div className="container">
			<Navbar />
			<h1>Zagadnienie transportowe</h1>
			<div className="content">
				<p>
					Załóżmy, że chcemy przesłać towary z "m" punktów do "n" odbiorców.
					<br />
					Dostawcą może być dowolny punkt wysyłający towar np: hurtownie, magazyny, zakłady produkcyjne itd.
					<br />
					Odbiorcami mogą być np: sklepy, hurtownie, lub inne punkty z zapotrzebowaniem na towar.
					<br />
					<br />W standardowej postaci ZT – postać tę będziemy nazywali zamkniętym zagadnieniem transportowym (ZZT) - przyjmujemy ograniczenie, że sumaryczna podaż jest równa sumarycznemu popytowi
				</p>
				<h5 style={{ padding: '10px' }}>
					<b>Zagadnienie transportowe</b> polega na ustaleniu takich ilości przewozu towarów od dostawców do odbiorców, aby zostało zaspokojone zapotrzebowanie wszystkich odbiorców oraz - aby sumaryczny koszt transportu był minimalny.
				</h5>
				<p>
					Ilości przewożonych towarów od dostawców do odbiorców tworzą tak zwany plan przewozu. Aby rozwiązać zagadnienie transportowe (ZT) trzeba znaleźć taki plan przewozu, dla którego sumaryczny koszt transportu jest minimalny. Wszystkie dane wejściowe
					możemy prezentować w postaci tablicy transportowej:
				</p>
				<div>
					<div style={{ width: '40%', float: 'left' }}>
						<img src={img1} alt="tablicaTransportowa"></img>
					</div>
					<div style={{ height: '322px' }}>
						Legenda:
						<ul style={{ listStyle: 'none' }}>
							<li>
								B<sub>n</sub> - liczba odbiorców
							</li>
							<li>
								b<sub>n</sub> - liczba towarów oferowanych
							</li>
							<li>
								A<sub>m</sub> - liczba Dostawców
							</li>
							<li>
								a<sub>m</sub> - liczba towarów wymaganych
							</li>
							<li>
								C<sub>mn</sub> - cena przewozu pomiędzy n-tym odbiorcą i m-tym nadawcą
							</li>
						</ul>
					</div>
				</div>
				<h3>Metoda kąta północno-zachodniego</h3>
				<p></p>
				<h1>ALGORYTM ROZWIĄZYWANIA ZAGADNIENIA TRANSPORTOWEGO</h1>
				<ol>
					<li>Budowa tablicy wielkości przewozów (metodą kąta północno-zachodniego):</li>
				</ol>
			</div>
		</div>
	);
};

export default Dashboard;
