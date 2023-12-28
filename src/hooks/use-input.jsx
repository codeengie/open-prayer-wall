import { useState } from 'react';

/**
 * Created this custom hook to handle input field validation
 * @param validateValue Function, needs to receive a function as a value
 */
const useInput = (validateValue) => {
	const [inputValue, setInputValue] = useState('');
	const [inputTouched, setInputTouched] = useState(false);
	const inputIsValid = validateValue(inputValue);
	const inputIsInvalid = !inputIsValid && inputTouched;

	const handleBlur = () => {
		setInputTouched(true);
	}

	const handleChange = event => {
		setInputValue(event.target.value);
	}

	const handleFocus = () => {
		setInputTouched(false);
	}

	const reset = () => {
		setInputValue('');
		setInputTouched(false);
	}

	// Expose variables and functions to our components
	return {
		inputValue,
		inputIsValid,
		inputIsInvalid, // hasError
		handleBlur,
		handleChange,
		handleFocus,
		reset
	};
}

export default useInput;
