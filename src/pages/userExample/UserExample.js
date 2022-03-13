import React, { useRef, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Table from '../../components/Table/Table';
import './UserExample.css';
import useDidMountEffect from '../../hooks/useDidMountEffect';
import SolutionTable from 'components/Table/SolutionTable';
import { Button, FormControl, TextField } from '@mui/material';
import { useForm } from 'hooks/useForm';
import Swal from 'sweetalert2';

function UserExample() {
	const [basicData, setBasic] = useState({});

	const [dostawcy, , setDostawcy] = useForm({
		dostawcy: 2,
	});
	const [dostawcyState, setDostawcyState] = useState({
		jeden: 1,
		dwa: 2,
	});
	const [odbiorcy, , setOdbiorcy] = useForm({
		odbiorcy: 2,
	});
	const [odbiorcyState, setOdbiorcyState] = useState({
		jeden: 1,
		dwa: 2,
	});
	const [wymagane, , setWymagane] = useForm();

	const [fikcyjnyDostawca, setFikcyjnyDostawca] = useState(false);
	const [fikcyjnyOdbiorca, setfikcyjnyOdbiorca] = useState(false);
	const [roznica, setRoznica] = useState(0);

	const [wymaganeState, setWymaganeState] = useState();
	const [oferowane, , setOferowane] = useForm();
	const [oferowaneState, setOferowaneState] = useState();
	const [ceny, , setCeny] = useForm();
	const [cenyState, setCenyState] = useState();

	const [counter, setCounter] = useState(0);
	const [solutionsTable, updateSolutionsTable] = useState([]);
	const [visibleSolutions, updateVisibleSolutions] = useState([]);

	const [pathTable, updatePathTable] = useState([]);
	const [determinantTable, updateDeterminantTable] = useState([]);
	const [maxCellTable, updateMaxCellTable] = useState([]);
	const [historyTable, updateHistory] = useState([]);
	const [historyMainValues, setMainHistory] = useState([]);
	const [newPathsTable, updateNewPaths] = useState([]);
	const [totalneSumy, updateTotalneSumy] = useState([]);
	const keepSolvingRef = useRef(true);

	function makeTables() {
		let suma = [];
		let rows = Object.keys(odbiorcyState).length;
		let columns = Object.keys(dostawcyState).length;
		let totalHistory = [];
		let totalSolutions = [];
		for (let y = 0; y < newPathsTable.length; y++) {
			let middleHistory = [];
			let singleSolution = [];
			suma[y] = 0;

			for (let i = 0; i < rows + 1; i++) {
				singleSolution[i] = [];
			}

			for (let a = 0; a < rows + 1; a++) {
				for (let b = 0; b < columns + 1; b++) {
					if (a === 0) {
						if (b === 0) {
							singleSolution[a][b] = 'Transport';
						} else {
							singleSolution[a][b] = 'Dostawca ' + b;
						}
					} else if (b === 0) {
						singleSolution[a][b] = 'Odbiorca ' + a;
					} else {
						singleSolution[a][b] = solutionsTable[y][a - 1][b - 1];
					}
				}
			}
			totalSolutions[y] = singleSolution;

			for (let o = 1; o < rows + 1; o++) {
				for (let p = 1; p < columns + 1; p++) {
					suma[y] += parseInt(singleSolution[o][p] * basicData.prices[o - 1][p - 1]);
				}
			}
			console.log(suma, basicData.prices, singleSolution);

			for (let u = 0; u < newPathsTable[y].length; u++) {
				let singleHistory = [];

				for (let k = 0; k < rows + 1; k++) {
					singleHistory[k] = [];
				}

				for (let i = 0; i < columns + 1; i++) {
					let value = historyMainValues[u][1][i - 1];
					i === 0 ? (singleHistory[0][i] = 'Transport') : y === 0 ? (singleHistory[0][i] = value) : (singleHistory[0][i] = 'Dostawca ' + i);
				}

				for (let j = 1; j < rows + 1; j++) {
					y === 0 ? (singleHistory[j][0] = historyMainValues[u][0][j - 1]) : (singleHistory[j][0] = 'Odbiorca ' + j);
				}

				for (let p = 1; p < rows + 1; p++) {
					for (let q = 1; q < columns + 1; q++) {
						singleHistory[p][q] = 0;
					}
				}

				for (let m = 0; m <= u; m++) {
					singleHistory[newPathsTable[y][m][0] + 1][newPathsTable[y][m][1] + 1] = solutionsTable[y][newPathsTable[y][m][0]][[newPathsTable[y][m][1]]];
				}
				middleHistory[u] = singleHistory;
			}
			totalHistory[y] = middleHistory;
		}

		//console.log('Total history: ', totalHistory);
		//console.log('Solutions table: ', totalSolutions);
		//console.log('Old Solutions table: ', solutionsTable);
		updateTotalneSumy(suma);
		updateHistory(totalHistory);
		updateVisibleSolutions(totalSolutions);
	}

	useDidMountEffect(() => {
		let isUnsolved = false;
		let isRepeated = false;
		let newPathTable = [];
		let iteration = 1;
		determinantTable[determinantTable.length - 1].map((singleDet) => {
			if (singleDet[0] > 0) {
				isUnsolved = true;
			}
		});
		if (isUnsolved) {
			if (solutionsTable.length > 2) {
				for (let i = 0; i < solutionsTable.length - 2; i++) {
					if (JSON.stringify(solutionsTable[solutionsTable.length - 1]) === JSON.stringify(solutionsTable[i])) {
						isRepeated = true;
					}
				}
			}
			if (isRepeated) {
				makeTables();
			} else {
				setCounter(counter + 1);
				keepSolvingRef.current = true;
				findNewPath(maxCellTable[maxCellTable.length - 1][1], '', newPathTable, iteration);
			}
		} else {
			makeTables();
		}
	}, [maxCellTable]);

	const makeNextSolutionTable = (newPath, max) => {
		let min = [];
		const banana = [];
		const modowanypathTable = [];

		for (let i = 0; i < pathTable[pathTable.length - 1].length; i++) {
			modowanypathTable[i] = [];
		}
		for (let i = 0; i < pathTable[pathTable.length - 1].length; i++) {
			pathTable[pathTable.length - 1].forEach((orange, index) => {
				modowanypathTable[index][0] = orange[0];
				modowanypathTable[index][1] = orange[1];
			});
		}

		for (let i = 0; i < basicData.rows; i++) {
			banana[i] = [];
		}
		for (let j = 0; j < basicData.rows; j++) {
			for (let k = 0; k < basicData.columns; k++) {
				banana[j][k] = 0;
			}
		}

		for (let i = 0; i < solutionsTable[solutionsTable.length - 1].length; i++) {
			solutionsTable[solutionsTable.length - 1][i].forEach((apple, index) => {
				banana[i][index] = apple;
			});
		}
		for (let i = 1; i < newPath.length; i++) {
			let cor1 = newPath[i][0];
			let cor2 = newPath[i][1];
			if (i === 1) {
				min = [banana[cor1][cor2], [newPath[i]]];
			} else if (!(i % 2 === 0)) {
				if (min[0] > banana[cor1][cor2]) {
					min = [banana[cor1][cor2], [newPath[i]]];
				}
			}
		}
		for (let j = 0; j < newPath.length; j++) {
			let cor1 = newPath[j][0];
			let cor2 = newPath[j][1];
			if (j % 2 === 0) {
				banana[cor1][cor2] += min[0];
			} else {
				banana[cor1][cor2] -= min[0];
			}
		}
		for (let j = 0; j < modowanypathTable.length; j++) {
			if (modowanypathTable[j][0] === min[1][0][0] && modowanypathTable[j][1] === min[1][0][1]) {
				modowanypathTable[j][0] = max[1][0];
				modowanypathTable[j][1] = max[1][1];
			}
		}
		updateNewPaths([...newPathsTable, newPath]);
		updatePathTable([...pathTable, modowanypathTable]);
		calculateDeterminants(basicData, modowanypathTable);
		updateSolutionsTable([...solutionsTable, banana]);
	};

	const findNewPath = (actuallPoint, fromDirection, newPathTable, iteration) => {
		if (actuallPoint[0] === maxCellTable[maxCellTable.length - 1][1][0] && actuallPoint[1] === maxCellTable[maxCellTable.length - 1][1][1] && newPathTable.length > 0) {
			keepSolvingRef.current = false;
			makeNextSolutionTable(newPathTable, maxCellTable[maxCellTable.length - 1]);
		} else {
			if (newPathTable.length === 0) {
				newPathTable[0] = actuallPoint;
			}
			if (!(fromDirection === 'left') && !(fromDirection === 'right')) {
				for (let i = 0; i < actuallPoint[1]; i++) {
					pathTable[pathTable.length - 1].forEach((key, index) => {
						if (key[0] === actuallPoint[0] && key[1] === i) {
							let iterationCopy = iteration;
							let copyNewPatch = [...newPathTable];
							copyNewPatch[iterationCopy] = [actuallPoint[0], i];
							iterationCopy++;

							if (keepSolvingRef.current) {
								findNewPath([actuallPoint[0], i], 'right', copyNewPatch, iterationCopy);
							}
						} else if (maxCellTable[maxCellTable.length - 1][1][0] === actuallPoint[0] && maxCellTable[maxCellTable.length - 1][1][1] === i) {
							let iterationCopy = iteration;
							let copyNewPatch = [...newPathTable];
							if (keepSolvingRef.current) {
								findNewPath([actuallPoint[0], i], 'right', copyNewPatch, iterationCopy);
							}
						}
					});
				}
			}
			if (!(fromDirection === 'top') && !(fromDirection === 'bottom')) {
				for (let i = 0; i < actuallPoint[0]; i++) {
					pathTable[pathTable.length - 1].forEach((key) => {
						if (key[0] === i && key[1] === actuallPoint[1]) {
							let iterationCopy = iteration;
							let copyNewPatch = [...newPathTable];
							copyNewPatch[iterationCopy] = [i, actuallPoint[1]];
							iterationCopy++;

							if (keepSolvingRef.current) {
								findNewPath([i, actuallPoint[1]], 'bottom', copyNewPatch, iterationCopy);
							}
						} else if (maxCellTable[maxCellTable.length - 1][1][0] === i && maxCellTable[maxCellTable.length - 1][1][1] === actuallPoint[1]) {
							let iterationCopy = iteration;
							let copyNewPatch = [...newPathTable];
							if (keepSolvingRef.current) {
								findNewPath([i, actuallPoint[1]], 'bottom', copyNewPatch, iterationCopy);
							}
						}
					});
				}
			}
			if (!(fromDirection === 'right') && !(fromDirection === 'left')) {
				for (let i = solutionsTable[solutionsTable.length - 1][0].length - 1; i > actuallPoint[1]; i--) {
					pathTable[pathTable.length - 1].forEach((key, index) => {
						if (key[0] === actuallPoint[0] && key[1] === i) {
							let iterationCopy = iteration;
							let copyNewPatch = [...newPathTable];
							copyNewPatch[iterationCopy] = [actuallPoint[0], i];
							iterationCopy++;
							if (keepSolvingRef.current) {
								findNewPath([actuallPoint[0], i], 'left', copyNewPatch, iterationCopy);
							}
						} else if (maxCellTable[maxCellTable.length - 1][1][0] === actuallPoint[0] && maxCellTable[maxCellTable.length - 1][1][1] === i) {
							let iterationCopy = iteration;
							let copyNewPatch = [...newPathTable];
							if (keepSolvingRef.current) {
								findNewPath([actuallPoint[0], i], 'left', copyNewPatch, iterationCopy);
							}
						}
					});
				}
			}
			if (!(fromDirection === 'bottom') && !(fromDirection === 'top')) {
				for (let i = Object.keys(solutionsTable[solutionsTable.length - 1]).length - 1; i > actuallPoint[0]; i--) {
					pathTable[pathTable.length - 1].forEach((key, index) => {
						if (key[0] === i && key[1] === actuallPoint[1]) {
							let iterationCopy = iteration;
							let copyNewPatch = [...newPathTable];
							copyNewPatch[iterationCopy] = [i, actuallPoint[1]];
							iterationCopy++;
							if (keepSolvingRef.current) {
								findNewPath([i, actuallPoint[1]], 'top', copyNewPatch, iterationCopy);
							}
						} else if (i === maxCellTable[maxCellTable.length - 1][1][0] && actuallPoint[1] === maxCellTable[maxCellTable.length - 1][1][1]) {
							let iterationCopy = iteration;
							let copyNewPatch = [...newPathTable];
							if (keepSolvingRef.current) {
								findNewPath([i, actuallPoint[1]], 'top', copyNewPatch, iterationCopy);
							}
						}
					});
				}
			}
		}
	};

	const calculateDeterminants = ({ prices, rows, columns }, path) => {
		const detRows = [];
		const detCol = [];
		const ultimateDet = [];
		let max = [];
		let detCounter = 0;
		let singlePath = path;
		let checkEngine = true;
		for (let i = 0; i < rows; i++) {
			for (let j = 0; j < columns; j++) {
				singlePath.forEach((data, index) => {
					if (data[0] === i && data[1] === j) {
						if (detRows[i] === undefined) {
							if (detCol[j] === undefined) {
								detRows[i] = 0;
								detCol[j] = prices[i][j];
							} else {
								detRows[i] = prices[i][j] - detCol[j];
							}
						} else {
							detCol[j] = prices[i][j] - detRows[i];
						}
					}
				});
			}
		}
		for (let i = 0; i < rows; i++) {
			for (let j = 0; j < columns; j++) {
				checkEngine = true;
				for (let k = 0; k < singlePath.length; k++) {
					if (singlePath[k][0] === i && singlePath[k][1] === j) {
						checkEngine = false;
					}
				}
				if (checkEngine) {
					const det = [detRows[i] + detCol[j] - basicData.prices[i][j], [i, j]];
					ultimateDet[detCounter] = det;
					if (detCounter === 0) {
						max = det;
					} else {
						if (det[0] > max[0]) {
							max = det;
						}
					}
					detCounter++;
				}
			}
		}

		updateDeterminantTable([...determinantTable, ultimateDet]);
		updateMaxCellTable([...maxCellTable, max]);
	};

	const solveFirstTime = (tempTable, { required, offered }) => {
		let hisMain = [[]];
		let rows = required.length;
		let cols = offered.length;
		const firstSolved = [...tempTable];
		const sprzedawcy = { ...offered };
		const kupcy = { ...required };

		const path = [];
		const basePoints = [];
		let row = 0;
		let column = 0;
		let stepCount = 0;

		while (row < rows && column < cols) {
			hisMain[stepCount] = [[], []];
			if (kupcy[row] < sprzedawcy[column]) {
				firstSolved[row][column] = kupcy[row];
				sprzedawcy[column] -= kupcy[row];
				kupcy[row] -= kupcy[row];

				path[stepCount] = [row, column];
				basePoints[stepCount] = [row, column];
				row++;
				stepCount++;
			} else if (sprzedawcy[column] < kupcy[row]) {
				firstSolved[row][column] = sprzedawcy[column];
				kupcy[row] -= sprzedawcy[column];
				sprzedawcy[column] -= sprzedawcy[column];

				path[stepCount] = [row, column];
				basePoints[stepCount] = [row, column];
				column++;
				stepCount++;
			} else if (sprzedawcy[column] === kupcy[row]) {
				firstSolved[row][column] = sprzedawcy[column];
				kupcy[row] -= sprzedawcy[column];
				sprzedawcy[column] -= sprzedawcy[column];
				path[stepCount] = [row, column];
				basePoints[stepCount] = [row, column];
				row++;
				stepCount++;
				// if (row === rows - 1 && column === cols - 1) {
				// 	row++;
				// 	column++;
				// 	stepCount++;
				// } else {
				// 	path[stepCount + 1] = [row + 1, column];
				// 	basePoints[stepCount + 1] = [row + 1, column];
				// 	row++;
				// 	column++;
				// 	hisMain[stepCount + 1] = [[], []];
				// 	stepCount += 2;
				// }
			}

			//console.log('kupcy: ', kupcy);
			//console.log('sprzedawcy: ', sprzedawcy);
			//console.log('count: ', stepCount, 'hismain: ', hisMain);
			Object.values(kupcy).map((value, index) => {
				hisMain[stepCount - 1][0][index] = value;
			});
			Object.values(sprzedawcy).map((value, index) => {
				hisMain[stepCount - 1][1][index] = value;
			});
		}
		setMainHistory(hisMain);
		updateNewPaths([...newPathsTable, path]);
		updatePathTable([...pathTable, basePoints]);
		calculateDeterminants(basicData, path);
		updateSolutionsTable([...solutionsTable, firstSolved]);
	};

	const createEmptyArray = ({ rows, columns }) => {
		const tempTable = [];
		for (let i = 0; i < rows; i++) {
			tempTable[i] = [];
		}
		for (let j = 0; j < rows; j++) {
			for (let k = 0; k < columns; k++) {
				tempTable[j][k] = 0;
			}
		}
		solveFirstTime(tempTable, basicData);
	};

	const dostawcyLenght = () => {
		let obj = {};
		for (let i = 0; i < dostawcy.dostawcy; i++) {
			obj[i] = 0;
		}
		setDostawcyState(obj);
	};
	const odbiorcyLenght = () => {
		let obj = {};
		for (let i = 0; i < odbiorcy.odbiorcy; i++) {
			obj[i] = 0;
		}
		setOdbiorcyState(obj);
	};

	useDidMountEffect(() => {
		createEmptyArray(basicData);
	}, [basicData]);

	const convertData = (odbiorcy, dostawcy) => {
		confirmation();
		let rows = Object.keys(odbiorcy).length;
		let columns = Object.keys(dostawcy).length;
		let required = [];
		let offered = [];
		let prices = [];
		let rawPrices = [];

		Object.values(wymaganeState).map((data, index) => {
			required[index] = parseInt(data);
			return required;
		});
		Object.values(oferowaneState).map((data, index) => {
			offered[index] = parseInt(data);
			return offered;
		});
		Object.values(cenyState).map((value, index) => {
			rawPrices[index] = value;
			return rawPrices;
		});
		for (let i = 0; i < rows; i++) {
			prices[i] = [];
		}
		Object.keys(cenyState).map((value, index) => {
			let x = parseInt(value.substr(5, 1));
			let y = parseInt(value.substr(6, 1));
			prices[x][y] = parseInt(cenyState[value]);
			return prices;
		});
		setBasic({ rows: rows, columns: columns, required: required, offered: offered, prices: prices });
	};

	function errorPopup() {
		Swal.fire({
			icon: 'error',
			title: 'Nie wprowadzono wszystkich danych',
			showConfirmButton: false,
			timer: 1000,
		});
	}
	function confirmation() {
		Swal.fire({
			icon: 'success',
			title: 'Rozpoczynam obliczanie optymalnego rozwiązania',
			showConfirmButton: false,
			timer: 2000,
		});
	}

	useDidMountEffect(() => {
		if (wymaganeState === undefined || oferowaneState === undefined || cenyState === undefined) {
			errorPopup();
		} else {
			let ileDostawcow = Object.keys(dostawcyState).length;
			let ileOdbiorcow = Object.keys(odbiorcyState).length;
			let ileCen = Object.keys(cenyState).length;

			if (ileDostawcow * ileOdbiorcow === ileCen) {
				let sumaDostawcy = 0;
				let sumaOdbiorcy = 0;

				Object.values(oferowaneState).map((value, index) => {
					sumaDostawcy += parseInt(value);
				});
				Object.values(wymaganeState).map((value, index) => {
					sumaOdbiorcy += parseInt(value);
				});
				if (sumaDostawcy > sumaOdbiorcy) {
					let diff = sumaDostawcy - sumaOdbiorcy;
					setRoznica(diff);
					nowyOdbiorca(diff, odbiorcyState, dostawcyState);
				} else if (sumaOdbiorcy > sumaDostawcy) {
					let diff = sumaOdbiorcy - sumaDostawcy;
					setRoznica(diff);
					nowyDostawca(diff, dostawcyState, odbiorcyState, oferowaneState);
				} else {
					convertData(odbiorcyState, dostawcyState);
				}
			} else {
			}
		}
	}, [cenyState]);

	function calculateSolution() {
		setCenyState(ceny);
	}

	function nowyDostawca(value) {
		setFikcyjnyDostawca(true);
		let dostawcyKopia = { ...dostawcyState };
		dostawcyKopia = { ...dostawcyKopia, nowy: 0 };
		setDostawcyState(dostawcyKopia);

		let oferowaneKopia = { ...oferowaneState };
		oferowaneKopia = { ...oferowaneKopia, nowy: value };
		setOferowaneState(oferowaneKopia);

		let cenyKopia = { ...cenyState };
		for (let i = 0; i < Object.keys(odbiorcyState).length; i++) {
			let string = 'numer' + i + Object.keys(dostawcyState).length;
			cenyKopia = { ...cenyKopia, [`${string}`]: '0' };
		}
		setCenyState(cenyKopia);
	}

	function nowyOdbiorca(value) {
		setfikcyjnyOdbiorca(true);
		let odbiorcykopia = { ...odbiorcyState };
		odbiorcykopia = { ...odbiorcykopia, nowy: 0 };
		setOdbiorcyState(odbiorcykopia);

		let wymaganeKopia = { ...wymaganeState };
		wymaganeKopia = { ...wymaganeKopia, nowy: value };
		setWymaganeState(wymaganeKopia);

		let cenyKopia = { ...cenyState };
		for (let i = 0; i < Object.keys(dostawcyState).length; i++) {
			let string = 'numer' + Object.keys(odbiorcyState).length + i;
			cenyKopia = { ...cenyKopia, [`${string}`]: '0' };
		}
		setCenyState(cenyKopia);
	}
	return (
		<div className="container">
			<Navbar />
			<div className="box">
				<div className="flexRows">
					<div className="singleRow">
						<div>
							<FormControl className="flexForm">
								<TextField type="number" inputProps={{ style: { textAlign: 'center' }, inputMode: 'numeric', pattern: '[0-9]*' }} required fullWidth margin="normal" label={'Liczba dostawców'} variant="outlined" onChange={setDostawcy('dostawcy')} />
								<Button variant="contained" onClick={() => dostawcyLenght()}>
									{'Zatwiedź dostawców'}
								</Button>
							</FormControl>
						</div>
						<div>
							<FormControl className="flexForm">
								<TextField type="number" inputProps={{ style: { textAlign: 'center' }, inputMode: 'numeric', pattern: '[0-9]*' }} required fullWidth margin="normal" label={'Liczba odbiorców'} variant="outlined" onChange={setOdbiorcy('odbiorcy')} />
								<Button variant="contained" onClick={() => odbiorcyLenght()}>
									{'Zatwiedź  odbiorców'}
								</Button>
							</FormControl>
						</div>
					</div>
					<div className="singleRow">
						<FormControl className="flexForm">
							<table>
								<thead>
									{fikcyjnyDostawca ? (
										<tr>{Object.keys(dostawcyState).map((element, index) => (index === Object.keys(dostawcyState).length - 1 ? <td>Fikcyjny dostawca</td> : <td>Dostawca {index + 1}</td>))}</tr>
									) : (
										<tr>
											{Object.keys(dostawcyState).map((element, index) => (
												<td>Dostawca {index + 1}</td>
											))}
										</tr>
									)}
								</thead>
								<tbody>
									{fikcyjnyDostawca ? (
										<tr>
											{Object.keys(dostawcyState).map((element, index) =>
												index === Object.keys(dostawcyState).length - 1 ? (
													<td>
														<TextField
															type="number"
															disabled
															inputProps={{
																style: {
																	textAlign: 'center',
																},
																inputMode: 'numeric',
																pattern: '[0-9]*',
															}}
															value={roznica}
														/>
													</td>
												) : (
													<td>
														<TextField
															type="number"
															inputProps={{
																style: {
																	textAlign: 'center',
																},
																inputMode: 'numeric',
																pattern: '[0-9]*',
															}}
															placeholder={'Ilośc towaru'}
															onChange={setOferowane('numer' + index)}
														/>
													</td>
												)
											)}
										</tr>
									) : (
										<tr>
											{Object.keys(dostawcyState).map((element, index) => (
												<td>
													<TextField
														type="number"
														inputProps={{
															style: { textAlign: 'center' },
															inputMode: 'numeric',
															pattern: '[0-9]*',
														}}
														placeholder={'Ilośc towaru'}
														onChange={setOferowane('numer' + index)}
													/>
												</td>
											))}
										</tr>
									)}
								</tbody>
							</table>
							<Button variant="contained" onClick={() => setOferowaneState(oferowane)}>
								{'Dodaj dostępny towar'}
							</Button>
						</FormControl>
					</div>
					<div className="singleRow">
						<FormControl className="flexForm">
							<table>
								<thead>
									<tr>{Object.keys(odbiorcyState).map((element, index) => (fikcyjnyOdbiorca && index === Object.keys(odbiorcyState).length - 1 ? <td>Fikcyjny Odbiorca </td> : <td>Odbiorca {index + 1}</td>))}</tr>
								</thead>
								<tbody>
									{fikcyjnyOdbiorca ? (
										<tr>
											{Object.keys(odbiorcyState).map((element, index) =>
												index === Object.keys(odbiorcyState).length - 1 ? (
													<td>
														<TextField
															type="number"
															inputProps={{
																style: { textAlign: 'center' },
																inputMode: 'numeric',
																pattern: '[0-9]*',
															}}
															disabled
															value={roznica}
														/>
													</td>
												) : (
													<td>
														<TextField
															type="number"
															inputProps={{
																style: { textAlign: 'center' },
																inputMode: 'numeric',
																pattern: '[0-9]*',
															}}
															placeholder={'Ilośc towaru'}
															onChange={setWymagane('numer' + index)}
														/>
													</td>
												)
											)}
										</tr>
									) : (
										<tr>
											{Object.keys(odbiorcyState).map((element, index) => (
												<td>
													<TextField
														type="number"
														inputProps={{
															style: { textAlign: 'center' },
															inputMode: 'numeric',
															pattern: '[0-9]*',
														}}
														placeholder={'Ilośc towaru'}
														onChange={setWymagane('numer' + index)}
													/>
												</td>
											))}
										</tr>
									)}
								</tbody>
							</table>
							<Button variant="contained" onClick={() => setWymaganeState(wymagane)}>
								{'Dodaj wymagany towar'}
							</Button>
						</FormControl>
					</div>
					<div className="singleRow">
						<FormControl className="flexForm">
							<div className="divCeny">
								<table className="firstCol">
									<thead>
										<tr>
											<td>Ceny</td>
										</tr>
										{Object.keys(odbiorcyState).map((element, index) => (
											<tr>
												<td>
													{fikcyjnyOdbiorca && index === Object.keys(odbiorcyState).length - 1 ? (
														<TextField inputProps={{ style: { textAlign: 'center' } }} variant="standard" size="small" value={'Fikcyjny Odbiorca '} />
													) : (
														<TextField inputProps={{ style: { textAlign: 'center' } }} variant="standard" size="small" value={'Odbiorca ' + ++index} />
													)}
												</td>
											</tr>
										))}
									</thead>
								</table>
								<table className="rows">
									<thead>
										<tr>{Object.keys(dostawcyState).map((element, index) => (fikcyjnyDostawca && index === Object.keys(dostawcyState).length - 1 ? <td>Fikcyjny Dostawca</td> : <td>Dostawca {index + 1}</td>))}</tr>
									</thead>
									<tbody>
										{Object.keys(odbiorcyState).map((element, index) => (
											<tr>
												{Object.keys(dostawcyState).map((element, index1) =>
													fikcyjnyOdbiorca && index === Object.keys(odbiorcyState).length - 1 ? (
														<td>
															<TextField
																type="number"
																variant="standard"
																size="small"
																inputProps={{
																	style: {
																		textAlign: 'center',
																	},
																	inputMode: 'numeric',
																	pattern: '[0-9]*',
																}}
																disabled
																placeholder="0"
															/>
														</td>
													) : fikcyjnyDostawca && index1 === Object.keys(dostawcyState).length - 1 ? (
														<td>
															<TextField
																type="number"
																variant="standard"
																size="small"
																inputProps={{
																	style: {
																		textAlign: 'center',
																	},
																	inputMode: 'numeric',
																	pattern: '[0-9]*',
																}}
																disabled
																placeholder={'0'}
															/>
														</td>
													) : (
														<td>
															<TextField
																type="number"
																variant="standard"
																size="small"
																inputProps={{
																	style: {
																		textAlign: 'center',
																	},
																	inputMode: 'numeric',
																	pattern: '[0-9]*',
																}}
																placeholder={'Cena przewozu'}
																onChange={setCeny('numer' + index + index1)}
															/>
														</td>
													)
												)}
											</tr>
										))}
									</tbody>
								</table>
							</div>
							<Button variant="contained" onClick={() => calculateSolution()}>
								{'Zatwierdź koszty transportu i oblicz'}
							</Button>
						</FormControl>
					</div>
				</div>
				<Table dane={basicData} />
				<SolutionTable totalneSumy={totalneSumy} solutionsTable={solutionsTable} pathTable={newPathsTable} determinantTable={determinantTable} history={historyTable} historyMain={historyMainValues} visibleSolutions={visibleSolutions} />
			</div>
		</div>
	);
}

export default UserExample;
