import React from 'react';
import './Table.css';

function Table({ dane: { rows, columns, required, offered, prices } }) {
	return (
		<>
			<div className="nad_odb">
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
			<div className="div_ceny">
				<table className="first_col">
					<thead>
						<td>Ceny</td>
						{required.map((amount, index) => (
							<tr>
								<td key={index}>Nadawca {index + 1}</td>
							</tr>
						))}
					</thead>
				</table>
				<table className="rows">
					<thead>
						<tr>
							{offered.map((amount, index) => (
								<td key={index}>Odbiorca {index + 1}</td>
							))}
						</tr>
					</thead>
					<tbody>
						{prices.map((row, index) => (
							<tr>
								{row.map((value, index) => (
									<td key={index}>{value}</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
}

export default Table;
