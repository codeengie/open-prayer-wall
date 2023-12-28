/**
 * The modal-context is crude as it only toggles a boolean to show or hide the modal. In the future I will implement
 * an in between stage when it closes.
 * @todo Extend modal to fade in/out and remove itself while not affecting other DOM elements
 */

import React, { useState } from 'react';

const ModalContext = React.createContext({
	isModalOpen: false
});

export const ModalContextProvider = (props) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleModalState = () => {
		document.body.classList.toggle('noscroll');
		setIsModalOpen(!isModalOpen);
	}

	return <ModalContext.Provider value={{isModalOpen: isModalOpen, onModalClick: handleModalState}}>{props.children}</ModalContext.Provider>
}

export default ModalContext;
