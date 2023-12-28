import './LoaderLine.scss';

/**
 * Loaderline component displays an animated colored horizontal line. It's used to give the user something to look
 * at while data is being retrieved.
 */
const LoaderLine = (props) => {
	const customClass = props.className ? `${props.className} loader-line` : 'loader-line';

	return (
		<div className={customClass}></div>
	);
};

export default LoaderLine;
