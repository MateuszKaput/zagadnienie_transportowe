import React, { useEffect, useState } from 'react';
import './Table.css';

function Table({ dane: { required, offered, prices } }) {
	const [isData, setIsData] = useState(false);

	useEffect(() => {
		if (required === undefined && offered === undefined && prices === undefined) {
		} else {
			setIsData(true);
		}
	}, [required, offered, prices]);

	return !isData ? (
		<></>
	) : (
		<div className="section">
			<h2>Dane wejściowe</h2>
			<div className="firstPart">
				<div className="div_odbiorcy">
					<h5>Zapotrzebowanie poszczególnych odbiorców na towar</h5>
					<table className="odbiorcy">
						<thead>
							<tr>
								{required.map((amount, index) => (
									<td key={index}>Odbiorca {index + 1}</td>
								))}
							</tr>
						</thead>
						<tbody>
							<tr>
								{required.map((amount, index) => (
									<td key={index}>{amount}</td>
								))}
							</tr>
						</tbody>
					</table>
				</div>
				<div className="div_nadawcy">
					<h5>Ilość towarów u poszczególnych nadawców</h5>
					<table className="nadawcy">
						<thead>
							<tr>
								{offered.map((amount, index) => (
									<td key={index}>Dostawca {index + 1}</td>
								))}
							</tr>
						</thead>
						<tbody>
							<tr>
								{offered.map((amount, index) => (
									<td key={index}>{amount}</td>
								))}
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<div className="secondPart">
				<div>
					<h5>Koszty transportu pomiędzy poszczególnymi odbiorcami i dostawcami</h5>
				</div>
				<div className="div_ceny">
					<table className="first_col">
						<thead>
							<tr>
								<td>Ceny</td>
							</tr>
							{required.map((amount, index) => (
								<tr key={index}>
									<td key={index}>Odbiorca {index + 1}</td>
								</tr>
							))}
						</thead>
					</table>
					<table className="rows">
						<thead>
							<tr>
								{offered.map((amount, index) => (
									<td key={index}>Dostawca {index + 1}</td>
								))}
							</tr>
						</thead>
						<tbody>
							{prices.map((row, index) => (
								<tr key={index}>
									{row.map((value, index) => (
										<td key={index}>{value}</td>
									))}
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

export default Table;
