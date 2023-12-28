import ReCAPTCHA from 'react-google-recaptcha';

// Recaptcha component wraps the ReCAPTCHA component. This was necessary to control when ReCAPTCHA is loaded.
const Recaptcha = (props) => {
	return (
		<ReCAPTCHA
			className={props.cName}
			onChange={props.onChange}
			ref={props.refVal}
			sitekey={props.apikey}
		/>
	)
}

export default Recaptcha;
