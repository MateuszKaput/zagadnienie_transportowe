import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import './Dashboard.css';
import tablicaTransportowa from '../../images/transport0.JPG';
import tablicaPrzyklad from '../../images/transport1.JPG';
import pierwszeRozwiazanie from '../../images/transport2.JPG';
import potencjalyPodstawowe1 from '../../images/transport3_1.JPG';
import potencjalyPodstawowe2 from '../../images/transport3.JPG';
import delty from '../../images/transport4.JPG';

const Dashboard = () => {
	return (
		<div className="container">
			<Navbar />
			<div className="content">
				<h1>Zagadnienie transportowe</h1>
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
				<div className="singlepart">
					<div>
						<img src={tablicaTransportowa} alt="tablicaTransportowa"></img>
					</div>
					<div>
						Legenda:
						<ul>
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
				<hr />
				<div className="flex_col">
					<h3>Metoda kąta północno-zachodniego</h3>
					<h2>ALGORYTM ROZWIĄZYWANIA ZAGADNIENIA TRANSPORTOWEGO</h2>
				</div>
				<ol>
					<b>
						<li>Tworzymy tablicę transportową ze wszystkimi potrzebnymi danymi.</li>
					</b>
					<div className="singlepart">
						<div>
							<img src={tablicaPrzyklad} alt="tablicaPrzykład"></img>
						</div>
						<div className="legenda">
							<ul>
								<li>Pierwszy wiersz - Zapotrzebowanie odbiorców</li>
								<li>Pierwsza kolumna - Towary oferowane przez dostawców</li>
								<li>Komorki pomiędzy dostawcami a odbiorcami - koszty transportu</li>
							</ul>
						</div>
					</div>
					<b>
						<li>Budowa tablicy wielkości przewozów (metodą kąta północno-zachodniego):</li>
					</b>
					<div className="singlepart">
						<div className="tablica">
							<img src={pierwszeRozwiazanie} alt="tablicaTransportowa"></img>
						</div>
						<div className="legenda">
							Wytłumaczenie:
							<br />
							<br /> Rozpoczynamy od lewego górnego narożnika i uzupełniamy minimalną wartością od dostawcy lub odbiorcy. Jeśli wartość minimalna była u dostawcy (w wierszu) to przesuwamy się w prawo, natomiast jeśli u
							odbiorcy (w kolumnie) to przesuwamy się w dół. <br />
							<br />
							Po zmianie komórki powtórzamy czynność lecz tym razem wartość u dostawcy lub odbiorcy będzie pomniejszona o tę wartość którą wpisaliśmy wcześniej w tym samym wierszu/kolumnie.
						</div>
					</div>
					<b>
						<li>Obliczenie potencjałów dla wierszy i kolumn.</li>
					</b>
					<div className="singlepart">
						<div className="potencjaly">
							<img src={potencjalyPodstawowe1} alt="PodstawowePotencjały"></img>
							<img src={potencjalyPodstawowe2} alt="PodstawowePotencjały"></img>
						</div>
						<div className="legenda">
							Wytłumaczenie:
							<ul>
								<li>
									u<sub>1</sub>-u<sub>n</sub> - POTENCJAŁY WIERSZY
								</li>
								<li>
									v<sub>1</sub>-v<sub>n</sub> - POTENCJAŁY KOLUMN
								</li>
								<li>
									Na początku mając niewiadomą w wierszu i kolumnie musimy wpisać w dowolne miejsce (w tym przypadku u<sub>1</sub>) wartość 0 aby móc kontynuować.
								</li>
								<li>
									Na bazie komórek bazowych (pogrubionych) i wzoru "u<sub>1</sub> + v<sub>1</sub> = c<sub>11</sub>" nadajemy potencjały wierszom i kolumnom.
								</li>
								<li>
									Zasada jest prosta. Bierzemy komórkę BAZOWĄ dla wiersza lub kolumny dla której nadaliśmy właśnie potencjał i z naszego wzoru (cena w komórce = potencjał wiersza +
									potencjał kolumny) obliczamy resztę potencjałów
								</li>
							</ul>
						</div>
					</div>
					<b>
						<li>Obliczenie delty dla komórek NIEBAZOWYCH</li>
					</b>
					<div className="singlepart">
						<div className="obrazki">
							<img src={delty} alt="PodstawowePotencjały"></img>
						</div>
						<div className="legenda">
							<ul>
								<li>
									Patrząc na tabelkę powyżej oraz wzór delta<sub>ij</sub> = (u<sub>i</sub>+v<sub>j</sub>)-c<sub>ij</sub>
								</li>
								<li>A więc przykładowo dla komórki w wierszu pierwszym i kolumnie trzeciej będzie to (0+1)-3 co da wynik -2</li>
								<li>
									<b>Jeżeli wszystkie delty są mniejsze lub równe 0 to rozwiązanie jest optymalne i kończymy algortym</b>
								</li>
							</ul>
						</div>
					</div>
					<b>
						<li></li>
					</b>
				</ol>
			</div>
		</div>
	);
};

export default Dashboard;
