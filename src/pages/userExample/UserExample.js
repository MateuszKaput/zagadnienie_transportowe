import React, { useRef, useState } from 'react';
import { useDidMount } from 'rooks';
import Navbar from '../../components/Navbar/Navbar';
import Table from '../../components/Table/Table';
import './UserExample.css';
import useDidMountEffect from '../../hooks/useDidMountEffect';
import SolutionTable from 'components/Table/SolutionTable';
import { Button, FormControl, Input, TextField } from '@mui/material';
import { useForm } from 'hooks/useForm';

function UserExample() {
	const [basicData, setBasic] = useState({
		rows: 3,
		columns: 4,
		required: [60, 80, 100],
		offered: [40, 60, 80, 60],
		prices: [
			[1, 2, 3, 4],
			[4, 3, 2, 0],
			[0, 2, 2, 1],
		],
	});

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
	const [wymaganeState, setWymaganeState] = useState({});

	const [oferowane, , setOferowane] = useForm();
	const [oferowaneState, setOferowaneState] = useState({});

	const [ceny, , setCeny] = useForm();
	const [cenyState, setCenyState] = useState({});

	const [counter, setCounter] = useState(0);
	const [solutionsTable, updateSolutionsTable] = useState([]);
	const [pathTable, updatePathTable] = useState([]);
	const [determinantTable, updateDeterminantTable] = useState([]);
	const [maxCellTable, updateMaxCellTable] = useState([]);
	const keepSolvingRef = useRef(true);

	useDidMountEffect(() => {
		console.log('Nowi temp dostawcy!', dostawcyState);
	}, [dostawcyState]);

	useDidMountEffect(() => {
		console.log('Nowi odbiorcy!', odbiorcyState);
		let obj = {};
		for (let i = 0; i < Object.keys(odbiorcyState).length; i++) {
			obj[i] = 0;
		}
		console.log(obj);
		setWymaganeState(obj);
	}, [odbiorcyState]);

	useDidMountEffect(() => {
		console.log('Nowe ceny!!', cenyState);
		let obj = {
			rows: 2,
			columns: 2,
			required: [],
			offered: [],
			prices: [],
		};
	}, [cenyState]);

	useDidMountEffect(() => {
		console.log('Nowe oferowane!', oferowaneState);
	}, [oferowaneState]);

	useDidMountEffect(() => {
		console.log('Nowe wymagane!', wymaganeState);
	}, [wymaganeState]);

	useDidMountEffect(() => {
		console.log('Update pathTable', pathTable);
	}, [pathTable]);

	useDidMountEffect(() => {
		console.log('Update solutionsTable', solutionsTable);
	}, [solutionsTable]);

	useDidMountEffect(() => {
		console.log('Update determinantTable', determinantTable);
	}, [determinantTable]);

	useDidMountEffect(() => {
		console.log('Update maxCellTable', maxCellTable);
	}, [maxCellTable]);

	useDidMountEffect(() => {
		let isSolved = true;
		let newPathTable = [];
		let iteration = 1;
		determinantTable[determinantTable.length - 1].forEach((singleDet) => {
			if (singleDet[0] > 0) {
				isSolved = false;
			}
		});
		if (isSolved) {
			console.log('Bingo rozwiązane! ');
			console.log(solutionsTable);
		} else {
			if (counter > 8) {
				console.log('Brak optymalnego rozwiązania :C');
			} else {
				console.log('--------------------------------------------------------------------------------------------------------');
				console.log('Rozpoczynam ponowną procedurę wyszukania z punktem nośnym: ', maxCellTable[maxCellTable.length - 1][1]);
				setCounter(counter + 1);
				keepSolvingRef.current = true;
				findNewPath(maxCellTable[maxCellTable.length - 1][1], '', newPathTable, iteration);
			}
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
		const firstSolved = [...tempTable];
		const sprzedawcy = { ...offered };
		const kupcy = { ...required };
		const path = [];
		let row = 0;
		let column = 0;
		let stepCount = 0;
		while (row < required.length && column < offered.length) {
			if (kupcy[row] < sprzedawcy[column]) {
				firstSolved[row][column] = kupcy[row];
				sprzedawcy[column] -= kupcy[row];
				kupcy[row] -= kupcy[row];
				path[stepCount] = [row, column];
				row++;
				stepCount++;
			} else if (sprzedawcy[column] < kupcy[row]) {
				firstSolved[row][column] = sprzedawcy[column];
				kupcy[row] -= sprzedawcy[column];
				sprzedawcy[column] -= sprzedawcy[column];
				path[stepCount] = [row, column];
				column++;
				stepCount++;
			} else if (sprzedawcy[column] === kupcy[row]) {
				firstSolved[row][column] = sprzedawcy[column];
				kupcy[row] -= sprzedawcy[column];
				sprzedawcy[column] -= sprzedawcy[column];
				path[stepCount] = [row, column];
				if (row === required.length - 1 && column === offered.length - 1) {
					row++;
					column++;
					stepCount++;
				} else {
					path[stepCount + 1] = [row + 1, column];
					row++;
					column++;
					stepCount += 2;
				}
			}
		}
		updatePathTable([...pathTable, path]);
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
	useDidMount(() => createEmptyArray(basicData));

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
	return (
		<div className="container">
			<Navbar />
			<div className="box">
				<div className="flexRows">
					<div className="singleRow">
						<div>
							<FormControl className="flexForm">
								<TextField
									type="number"
									inputProps={{ style: { textAlign: 'center' }, inputMode: 'numeric', pattern: '[0-9]*' }}
									required
									fullWidth
									margin="normal"
									label={'Liczba dostawców'}
									variant="outlined"
									onChange={setDostawcy('dostawcy')}
								/>
								<Button variant="contained" onClick={() => dostawcyLenght()}>
									{'Potwierdź'}
								</Button>
							</FormControl>
						</div>
						<div>
							<FormControl className="flexForm">
								<TextField
									type="number"
									inputProps={{ style: { textAlign: 'center' }, inputMode: 'numeric', pattern: '[0-9]*' }}
									required
									fullWidth
									margin="normal"
									label={'Liczba odbiorców'}
									variant="outlined"
									onChange={setOdbiorcy('odbiorcy')}
								/>
								<Button variant="contained" onClick={() => odbiorcyLenght()}>
									{'Potwierdź'}
								</Button>
							</FormControl>
						</div>
					</div>
					<div className="singleRow">
						<FormControl className="flexForm">
							<table>
								<thead>
									<tr>
										{Object.keys(dostawcyState).map((element, index) => (
											<td key={index}>Dostawca {index}</td>
										))}
									</tr>
								</thead>
								<tbody>
									<tr>
										{Object.keys(dostawcyState).map((element, index) => (
											<td key={index}>
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
								</tbody>
							</table>
							<Button variant="contained" onClick={() => setOferowaneState(oferowane)}>
								{'Potwierdź'}
							</Button>
						</FormControl>
					</div>
					<div className="singleRow">
						<FormControl className="flexForm">
							<table>
								<thead>
									<tr>
										{Object.keys(odbiorcyState).map((element, index) => (
											<td key={index}>Odbiorca {index}</td>
										))}
									</tr>
								</thead>
								<tbody>
									<tr>
										{Object.keys(odbiorcyState).map((element, index) => (
											<td key={index}>
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
								</tbody>
							</table>
							<Button variant="contained" onClick={() => setWymaganeState(wymagane)}>
								{'Potwierdź'}
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
										{Object.keys(dostawcyState).map((element, index) => (
											<tr key={index}>
												<td key={index}>
													<TextField
														inputProps={{ style: { textAlign: 'center' } }}
														variant="standard"
														size="small"
														value={'Dostawca ' + index}
													/>
												</td>
											</tr>
										))}
									</thead>
								</table>
								<table className="rows">
									<thead>
										<tr>
											{Object.keys(odbiorcyState).map((element, index) => (
												<td key={index}>Odbiorca {index}</td>
											))}
										</tr>
									</thead>
									<tbody>
										{Object.keys(dostawcyState).map((element, index) => (
											<tr key={index}>
												{Object.keys(odbiorcyState).map((element, index1) => (
													<td key={index1}>
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
												))}
											</tr>
										))}
									</tbody>
								</table>
							</div>
							<Button variant="contained" onClick={() => setCenyState(ceny)}>
								{'Potwierdź'}
							</Button>
						</FormControl>
					</div>
				</div>
				<h2>Dane wejściowe</h2>
				<Table dane={basicData} />
				<SolutionTable solutionsTable={solutionsTable} pathTable={pathTable} determinantTable={determinantTable} maxCellTable={maxCellTable} />
			</div>
		</div>
	);
}

export default UserExample;
