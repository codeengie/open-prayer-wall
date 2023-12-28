import { lazy, Suspense, useCallback, useContext, useEffect, useRef, useState } from 'react';
import ModalContext from '../../store/modal-context.jsx';
import './PostPrayer.scss';
import Button from '../Button/Button.jsx';
import FormInput from '../Form/FormInput/FormInput.jsx';
import useInput from '../../hooks/use-input.jsx';
import FormTextArea from '../Form/FormTextArea/FormTextArea.jsx';
import PrayersContext from '../../store/prayers-context.jsx';
import '../Form/FormBase.scss';
import LoaderLine from '../LoaderLine/LoaderLine.jsx';

/**
 * Lazy load component(s)
 * I'm lazy loading Recaptcha component to improve PageSpeed score in mobile.
 */
const Recaptcha = lazy(() => import ('../Recaptcha/Recaptcha.jsx'));

// Put this outside because it's not a function that requires to be rebuilt if the component is rebuilt
const validateInput = value => value.trim() !== '' && !/[!@#$%^&*()_+{}\[\]:;<>~\\]/.test(value.trim());

const PostPrayer = () => {
	const ctxModal = useContext(ModalContext);
	const ctxPrayers = useContext(PrayersContext);
	const toggleClass = ctxModal.isModalOpen ? 'post-prayer post-prayer--show' : 'post-prayer';
	let formIsValid = false;
	const [status, setStatus] = useState('');
	const [postClass, setPostClass] = useState('');
	const [isCaptchaChecked, setIsCaptchaChecked] = useState(false);
	const recaptchaRef = useRef();
	const [isCaptchaLoaded, setCaptchaLoaded] = useState(false);

	// Name input
	const {
		inputValue: nameValue,
		inputIsValid: nameIsValid,
		inputIsInvalid: nameIsInvalid, // hasError
		handleBlur: nameHandleBlur,
		handleChange: nameHandleChange,
		handleFocus: nameHandleFocus,
		reset: nameReset
	} = useInput(validateInput);

	// Title input
	const {
		inputValue: titleValue,
		inputIsValid: titleIsValid,
		inputIsInvalid: titleIsInvalid,
		handleBlur: titleHandleBlur,
		handleChange: titleHandleChange,
		handleFocus: titleHandleFocus,
		reset: titleReset
	} = useInput(validateInput);

	// Message textarea
	const {
		inputValue: messageValue,
		inputIsValid: messageIsValid,
		inputIsInvalid: messageIsInvalid,
		handleBlur: messageHandleBlur,
		handleChange: messageHandleChange,
		handleFocus: messageHandleFocus,
		reset: messageReset
	} = useInput(validateInput);

	const onCaptchaHandler = () => {
		// Toggle the boolean because Recaptcha resets itself after a few minutes
		setIsCaptchaChecked(!isCaptchaChecked);
	}

	// Reset form. I added useCallback() to prevent re-render error
	const resetForm = useCallback(() => {
		nameReset();
		titleReset();
		messageReset();
	}, [nameReset, titleReset, messageReset]);

	// Implemented useEffect() to fix infinite re-render errors
	useEffect(() => {
		if (!ctxModal.isModalOpen) {
			resetForm();
		}
	}, [ctxModal.isModalOpen, resetForm]);

	// Check if form is valid
	if (nameIsValid && titleIsValid && messageIsValid && isCaptchaChecked) {
		formIsValid = true;
	}

	// Submit form
	const handleSubmit = async (event) => {
		event.preventDefault();

		if (!formIsValid) {
			return;
		}

		setStatus('Posting prayer...');
		setPostClass(' post-prayer--posting');

		// Create form data object
		const formData = {
			formName: nameValue,
			formTitle: titleValue,
			formMessage: messageValue,
			formToken: recaptchaRef.current.getValue()
		}

		// Invoke API and post prayer
		const response = await ctxPrayers.postNewPrayer(formData);

		// If there is an error posting the prayer, let the user know
		if (response !== '200') {
			setStatus('Something happened on our end. Please try again!');
			return;
		}

		setStatus('Prayer posted.');
		setPostClass(' post-prayer--posted');

		setTimeout(() => {
			resetForm();
			ctxModal.onModalClick();
			setPostClass('');
			setStatus('');
			setIsCaptchaChecked(false);
			recaptchaRef.current.reset();
		}, 3000);
	}

	// Lazy load Recaptcha component when the modal is displayed, this will only trigger on the first run
	if (ctxModal.isModalOpen) {
		if (!isCaptchaLoaded) {
			setCaptchaLoaded(true);
		}
	}

	return (
		<div className={`${toggleClass}${postClass}`}>
			<Button cName="post-prayer__close" onClick={ctxModal.onModalClick}/>
			<div className="post-prayer__top">
				<div className="post-prayer__status">{status}</div>
				<form className="post-prayer__form">
					<h2 className="post-prayer__title">Post A New Prayer</h2>
					<p className="post-prayer__instructions">Please share your prayer request. You may use commas and periods to separate your thoughts.</p>
					<FormInput
						errorMessage="Enter a valid name without special characters or numbers"
						id="name"
						hasError={nameIsInvalid}
						label="Name"
						maxLength="40"
						onBlur={nameHandleBlur}
						onChange={nameHandleChange}
						onFocus={nameHandleFocus}
						value={nameValue}
						type="text"
					/>
					<FormInput
						errorMessage="Enter a valid title without special characters or numbers"
						id="title"
						hasError={titleIsInvalid}
						label="Title"
						maxLength="80"
						onBlur={titleHandleBlur}
						onChange={titleHandleChange}
						onFocus={titleHandleFocus}
						value={titleValue}
						type="text"
					/>
					<FormTextArea
						errorMessage="Enter a valid message without special characters"
						id="message"
						hasError={messageIsInvalid}
						label="Message"
						maxCount="400"
						onBlur={messageHandleBlur}
						onChange={messageHandleChange}
						onFocus={messageHandleFocus}
						value={messageValue}
					/>
					<Suspense fallback={<div>Loading...</div>}>
						{isCaptchaLoaded && <Recaptcha
							apikey={import.meta.env.VITE_CAPTCHA_SITE_KEY}
							cName="post-prayer__sepaque"
							onChange={onCaptchaHandler}
							refVal={recaptchaRef}
						/>}
					</Suspense>
				</form>
			</div>
			<div className="post-prayer__bottom">
				<Button cName="post-prayer__button" disableButton={!formIsValid} onClick={handleSubmit} text="Post Prayer"/>
				<LoaderLine className="post-prayer__loader"/>
			</div>
		</div>
	)
}

export default PostPrayer;
