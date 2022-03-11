import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import './SolutionTable.css';

function SolutionTable({ solutionsTable, pathTable, determinantTable, history, visibleSolutions }) {
	const [currentViewTable, setCurrent] = useState([0, 0, 0, 0]);

	function addViewValue(index) {
		let newState = [...currentViewTable];
		newState[index] = currentViewTable[index] + 1;
		let size = Object.keys(pathTable[index]).length;
		if (!(newState[index] >= size)) {
			setCurrent(newState);
		}
	}

	function subtractViewValue(index) {
		let newState = [...currentViewTable];
		newState[index] = currentViewTable[index] - 1;
		if (!(newState[index] < 0)) {
			setCurrent(newState);
		}
	}

	return (
		<>
			<div className="divFlexBox">
				{solutionsTable.map((value, mainIndex) => (
					<div className="sekcja">
						<center>
							<h3>{mainIndex === 0 ? 'Przybliżenie metodą kąta północno zachodniego' : 'Przybliżenie numer:' + parseInt(mainIndex + 1)}</h3>
						</center>
						<div className="divSingleRow">
							<div className="oneElement">
								<p>{'Ścieżka algorytmu która przedstawia w jakiej kolejności komórki zmieniały wartość '}</p>
								{mainIndex === 0 ? (
									<ul>
										<li>
											<b>Pierwszy wiersz</b> - przedstawia wartości jakie pozostały u poszczególnych dostawców
										</li>
										<li>
											<b>Pierwsza kolumna</b> - przedstawia wartości jakie pozostały u poszczególnych odbiorców
										</li>
									</ul>
								) : (
									true
								)}

								<div className="tableDiv">
									<table className="solutions">
										<tbody>
											{history[mainIndex] === undefined
												? true
												: history[mainIndex][currentViewTable[mainIndex]] === undefined
												? true
												: history[mainIndex][currentViewTable[mainIndex]].map((value, index) => {
														return (
															<tr>
																{value.map((value2, index2) => {
																	return (
																		<td
																			style={
																				index2 === pathTable[mainIndex][currentViewTable[mainIndex]][1] + 1 &&
																				index === pathTable[mainIndex][currentViewTable[mainIndex]][0] + 1
																					? {
																							backgroundColor: 'green',
																					  }
																					: {}
																			}
																		>
																			{value2}
																		</td>
																	);
																})}
															</tr>
														);
												  })}
										</tbody>
									</table>
								</div>
								<Button variant="contained" onClick={() => subtractViewValue(mainIndex)}>
									{'Poprzedni'}
								</Button>
								<Button variant="contained" onClick={() => addViewValue(mainIndex)}>
									{'Kolejny'}
								</Button>
							</div>

							<div className="oneElement">
								<p>{mainIndex === 0 ? 'Tabela zawiera pierwsze poprawne rozwiązanie stworzone przy pomocy metody kąta północno zachodniego' : 'Kolejne przybliżenie stworzone przy pomocy metody potencjałów. '}</p>
								<div className="tableDiv">
									<table className="solutions">
										<tbody>
											{visibleSolutions[mainIndex] === undefined
												? true
												: visibleSolutions[mainIndex].map((value, index) => {
														return (
															<tr>
																{value.map((value2, index2) => {
																	return <td>{value2}</td>;
																})}
															</tr>
														);
												  })}
										</tbody>
									</table>
								</div>
							</div>
						</div>

						<div className="divSingleRow">
							<div className="oneElement">
								<p>Wskaźniki dla pól które nie należą do aktualnej ścieżki dostaw</p>
								<div className="tableDiv">
									<table className="first_col">
										<thead>
											<tr>
												<td>Wskaźniki</td>
											</tr>
											{determinantTable[mainIndex].map((value1, index) => (
												<tr key={Math.random()}>
													<td key={Math.random()}>Wskaźnik {index + 1}</td>
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
											{determinantTable[mainIndex].map((value1, index) => (
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
											{pathTable[mainIndex].map((value1, index) => (
												<tr key={Math.random()}>
													<td key={Math.random()}>Punkt {index + 1}</td>
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
											{pathTable[mainIndex].map((value1, index) => (
												<tr key={Math.random()}>
													{value1.map((banana, index) => (
														<td key={Math.random()}>{banana}</td>
													))}
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</>
	);
}

export default SolutionTable;
