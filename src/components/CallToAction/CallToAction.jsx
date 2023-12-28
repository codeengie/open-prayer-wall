import { useContext } from 'react';
import ModalContext from '../../store/modal-context.jsx';
import './CallToAction.scss';
import Button from '../Button/Button.jsx';

// CallToAction component displays the modal
const CallToAction = () => {
	const ctx = useContext(ModalContext);

	return (
		<div className="cta">
			<Button
				cName="cta__button"
				onClick={ctx.onModalClick}
				text="New Prayer"/>
		</div>
	)
}

export default CallToAction;
