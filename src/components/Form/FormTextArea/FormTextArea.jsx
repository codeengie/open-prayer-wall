import './FormTextArea.scss';

// Base textarea component
const FormTextArea = (props) => {
	const hasError = props.hasError ? 'form__field form__field--error' : 'form__field';
	const counter = `${props.value.length} / ${props.maxCount}`;

	return (
		<div className={hasError}>
			<div className="form__wrap">
				<label className="form__label" htmlFor={props.id}>{props.label}</label>
				<textarea
					className="form__textarea"
					id={props.id}
					maxLength={props.maxCount}
					name={props.id}
					onBlur={props.onBlur}
					onChange={props.onChange}
					onFocus={props.onFocus}
					value={props.value}>
				</textarea>
				<div className="form__counter">{counter}</div>
			</div>
			<p className="form__message">{props.errorMessage}</p>
		</div>
	)
}

export default FormTextArea;
