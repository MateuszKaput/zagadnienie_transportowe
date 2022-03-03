import React from 'react';
import './SolutionTable.css';

function SolutionTable({ solutionsTable, pathTable, determinantTable, maxCellTable }) {
	return (
		<>
			<div className="divFlexBox">
				{solutionsTable.map((value, index) => (
					<>
						<hr />
						<h3>Przybliżenie numer: {index + 1}</h3>
						<div className="divSingleRow">
							<div className="oneElement">
								<p>
									{index === 0
										? 'Tabela zawiera pierwsze poprawne rozwiązanie stworzone przy pomocy metody konta północno zachodniego'
										: 'Kolejne przybliżenie stworzone przy pomocy metody potencjałów. '}
								</p>
								<div className="tableDiv">
									<table className="first_col">
										<thead>
											<tr>
												<td>Rozwiązania </td>
											</tr>
											{solutionsTable[index].map((value1, mango1) => (
												<tr key={Math.random()}>
													<td key={Math.random()}>Odbiorca {mango1 + 1}</td>
												</tr>
											))}
										</thead>
									</table>
									<table className="rows">
										<thead>
											<tr>
												{solutionsTable[index][0].map((value1, mango2) => (
													<td key={Math.random()}>Dostawca {mango2 + 1}</td>
												))}
											</tr>
										</thead>
										<tbody>
											{solutionsTable[index].map((value1, mango3) => (
												<tr key={Math.random()}>
													{value1.map((banana, mango4) => (
														<td key={Math.random()}>{banana}</td>
													))}
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>
							<div className="oneElement">
								<p>Wartość i położenie najmniejszego wskaźnika od którego rozpocznie się kolejne przybliżenie</p>
								<div className="tableDiv">
									<table className="first_col">
										<thead>
											<tr>
												<td>Minimum</td>
											</tr>
											<tr>
												<td>Wartość</td>
											</tr>
										</thead>
										<tbody>
											<tr></tr>
										</tbody>
									</table>
									<table className="rows">
										<thead>
											<tr>
												<td>Wartość</td>
												<td>Odbiorca</td>
												<td>Dostawca</td>
											</tr>
											<tr>
												<td>{maxCellTable[index][0]}</td>
												<td>{maxCellTable[index][1][0]}</td>
												<td>{maxCellTable[index][1][1]}</td>
											</tr>
										</thead>
										<tbody>
											<tr></tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
						{
							//-------------------------------------------------------------------}
						}
						<div className="divSingleRow">
							<div className="oneElement">
								<p>Wskaźniki dla pól które nie należą do aktualnej ścieżki dostaw</p>
								<div className="tableDiv">
									<table className="first_col">
										<thead>
											<tr>
												<td>Wskaźniki</td>
											</tr>
											{determinantTable[index].map((value1, mango9) => (
												<tr key={Math.random()}>
													<td key={Math.random()}>Wskaźnik {mango9 + 1}</td>
												</tr>
											))}
										</thead>
									</table>
									<table className="rows">
										<thead>
											<tr>
												<td>Wartość: </td>
												<td>Odbiorca </td>
												<td>Dostawca </td>
											</tr>
										</thead>
										<tbody>
											{determinantTable[index].map((value1, mango9) => (
												<tr key={Math.random()}>
													<td key={Math.random()}>{value1[0]}</td>
													<td key={Math.random()}>{value1[1][0]}</td>
													<td key={Math.random()}>{value1[1][1]}</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>
							<div className="oneElement">
								<p>Aktualne komórki BAZOWE </p>
								<div className="tableDiv">
									<table className="first_col">
										<thead>
											<tr>
												<td>Ścieżka</td>
											</tr>
											{pathTable[index].map((value1, mango9) => (
												<tr key={Math.random()}>
													<td key={Math.random()}>Punkt {mango9 + 1}</td>
												</tr>
											))}
										</thead>
										<tbody></tbody>
									</table>
									<table className="rows">
										<thead>
											<tr>
												<td>Odbiorca</td>
												<td>Dostawca</td>
											</tr>
										</thead>
										<tbody>
											{pathTable[index].map((value1, mango11) => (
												<tr key={Math.random()}>
													{value1.map((banana, mango12) => (
														<td key={Math.random()}>{banana}</td>
													))}
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</>
				))}
			</div>
		</>
	);
}

export default SolutionTable;
