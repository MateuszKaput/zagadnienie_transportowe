import React, { useRef, useState } from 'react';
import { useDidMount } from 'rooks';
import Navbar from '../../components/Navbar/Navbar';
import Table from '../../components/Table/Table';
import './Example.css';
import useDidMountEffect from '../../hooks/useDidMountEffect';
import SolutionTable from 'components/Table/SolutionTable';

function Example() {
	const [basicData] = useState({
		rows: 3,
		columns: 4,
		required: [60, 80, 100],
		offered: [40, 60, 80, 60],
		prices: [
			[1, 2, 3, 4],
			[4, 3, 2, 0],
			[0, 2, 2, 1],
		],
		// rows: 3,
		// columns: 3,
		// required: [50, 70, 30],
		// offered: [20, 40, 90],
		// prices: [
		// 	[3, 5, 7],
		// 	[12, 10, 9],
		// 	[13, 3, 9],
		// ],
	});

	const [counter, setCounter] = useState(0);
	const [solutionsTable, updateSolutionsTable] = useState([]);
	const [pathTable, updatePathTable] = useState([]);
	const [determinantTable, updateDeterminantTable] = useState([]);
	const [maxCellTable, updateMaxCellTable] = useState([]);
	const keepSolvingRef = useRef(true);

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
			console.log(determinantTable);
		} else {
			if (counter > 10) {
			} else {
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
		let checkEngine = true;
		for (let i = 0; i < rows; i++) {
			for (let j = 0; j < columns; j++) {
				path.forEach((data, index) => {
					if (data[0] === i && data[1] === j) {
						if (detRows[i] === undefined) {
							if (detCol[j] === undefined) {
								detRows[i] = 0;
								detCol[j] = prices[i][j];
								console.log('wypełniam wiersz: [', i, '] oraz kolumne [', j, ']', prices[i][j]);
							} else {
								detRows[i] = prices[i][j] - detCol[j];
								console.log('wypełniam wiersz [', i, ']', prices[i][j], '-', detCol[j]);
							}
						} else if (detCol[j] === undefined) {
							detCol[j] = prices[i][j] - detRows[i];
							console.log('wypełniam kolumne [', j, ']', prices[i][j], '-', detRows[i]);
						}
					}
				});
			}
		}

		console.log(detCol, detRows);
		console.log('-------------------');

		for (let i = 0; i < rows; i++) {
			for (let j = 0; j < columns; j++) {
				checkEngine = true;
				for (let k = 0; k < path.length; k++) {
					if (path[k][0] === i && path[k][1] === j) {
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
	return (
		<div className="container">
			<Navbar />
			<div className="box">
				<h2>Dane wejściowe</h2>
				<Table dane={basicData} />
				<SolutionTable solutionsTable={solutionsTable} pathTable={pathTable} determinantTable={determinantTable} maxCellTable={maxCellTable} />
			</div>
		</div>
	);
}

export default Example;
