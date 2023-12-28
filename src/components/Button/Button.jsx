import './Button.scss';

// Base button component
const Button = (props) => {

	// Display text or leave empty so the user can customize on their end
	const content = props.text ? <span className="button__text">{props.text}</span> : '';


	return (
		<button
			className={`${props.cName} button`}
			disabled={props.disableButton}
			onClick={props.onClick}
			type="button">{content}</button>
	)
}

export default Button;
