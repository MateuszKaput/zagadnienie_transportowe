import { useState } from 'react';

export const useForm = (defaultState) => {
	const [state, setState] = useState(defaultState);

	const changeValue = (valueName) => {
		if (valueName.includes('.')) {
			let root, rest;
			[root, rest] = valueName.split('.');
			return (event) => {
				const data = {
					...state,
					[root]: {
						...state[root],
						[rest]: event.target.value,
					},
				};
				setState(data);
			};
		} else {
			return (event) => {
				setState({
					...state,
					[valueName]: event.target.value,
				});
			};
		}
	};

	return [state, setState, changeValue];
};
