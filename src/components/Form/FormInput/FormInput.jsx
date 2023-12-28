import './FormInput.scss';

// Base input component
const FormInput = (props) => {
	const hasError = props.hasError ? 'form__field form__field--error' : 'form__field';

	return (
		<div className={hasError}>
			<div className="form__wrap">
				<label className="form__label" htmlFor={props.id}>{props.label}</label>
				<input
					className="form__input"
					id={props.id}
					maxLength={props.maxLength}
					name={props.id}
					onBlur={props.onBlur}
					onChange={props.onChange}
					onFocus={props.onFocus}
					type={props.type}
					value={props.value}
				/>
			</div>
			<p className="form__message">{props.errorMessage}</p>
		</div>
	)
}

export default FormInput;
