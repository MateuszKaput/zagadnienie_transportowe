import React, { useRef, useState } from 'react';
import { useDidMount } from 'rooks';
import Navbar from '../../components/Navbar/Navbar';
import Table from '../../components/Table/Table';
import './Example.css';
import useDidMountEffect from '../../hooks/useDidMountEffect';

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
	});

	const [solutionsTable, updateSolutionsTable] = useState([]);
	const [pathTable, updatePathTable] = useState([]);
	const [determinantTable, updateDeterminantTable] = useState([]);
	const [maxCellTable, updateMaxCellTable] = useState([]);
	const keepSolvingRef = useRef(true);

	useDidMountEffect(() => {
		console.log('Update pathTable', pathTable);
		calculateDeterminants(basicData);
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
			console.log('Rozpoczynam ponowną procedurę wyszukania z punktem nośnym: ', maxCellTable[maxCellTable.length - 1][1]);
			keepSolvingRef.current = true;
			findNewPath(maxCellTable[maxCellTable.length - 1][1], '', newPathTable, iteration);
		}
	}, [maxCellTable]);

	const makeNextSolutionTable = (newPath, max) => {
		let min = [];
		const banana = [];
		const newPathTable = newPath;
		const modowanypathTable = pathTable[pathTable.length - 1].map((value) => {
			return value;
		});

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

		for (let i = 1; i < newPathTable.length; i++) {
			console.log('Sprawdzanie minimum odbywa się po raz: ', i);
			let cor1 = newPathTable[i][0];
			let cor2 = newPathTable[i][1];
			if (i === 1) {
				min = [banana[cor1][cor2], [newPathTable[i]]];
			} else if (!(i % 2 === 0)) {
				if (min[0] > banana[cor1][cor2]) {
					min = [banana[cor1][cor2], [newPathTable[i]]];
				}
			}
		}
		console.log('Przed dodawaniem: ', newPathTable);
		for (let j = 0; j < newPathTable.length; j++) {
			let cor1 = newPathTable[j][0];
			let cor2 = newPathTable[j][1];
			if (j % 2 === 0) {
				console.log('Dodaję: ', min[0], ' do ', banana[cor1][cor2]);
				banana[cor1][cor2] += min[0];
			} else {
				console.log('Odejmuję: ', min[0], ' od ', banana[cor1][cor2]);
				banana[cor1][cor2] -= min[0];
			}
		}
		for (let j = 0; j < modowanypathTable.length; j++) {
			if (modowanypathTable[j][0] === min[1][0][0] && modowanypathTable[j][1] === min[1][0][1]) {
				console.log('Ding! ');
				modowanypathTable[j][0] = max[0][1][0];
				modowanypathTable[j][1] = max[0][1][1];
			}
		}

		updatePathTable([...pathTable, modowanypathTable]);
		updateSolutionsTable([...solutionsTable, banana]);
	};

	const findNewPath = (actuallPoint, fromDirection, newPathTable, iteration) => {
		console.log('Procedura w toku: ', keepSolvingRef.current, actuallPoint, newPathTable);
		if (actuallPoint[0] === maxCellTable[maxCellTable.length - 1][1][0] && actuallPoint[1] === maxCellTable[maxCellTable.length - 1][1][1] && newPathTable.length > 0) {
			keepSolvingRef.current = false;
			makeNextSolutionTable(newPathTable, maxCellTable);
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

	const calculateDeterminants = ({ prices, rows, columns }) => {
		const detRows = [];
		const detCol = [];
		const ultimateDet = [];
		let max = [];
		let detCounter = 0;
		let singlePath = pathTable[pathTable.length - 1].map((value) => {
			return value;
		});
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
			</div>
		</div>
	);
}

export default Example;
