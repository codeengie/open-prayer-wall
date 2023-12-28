import './Counter.scss';

// Counter component displays the prayer count along with the praying hands icon
const Counter = (props) => {
	const customClass = props.count === 0 ? `${props.cName} counter counter--no-count` : `${props.cName} counter`;

	return (
		<div className={customClass} ref={props.forwardedRef}>
			<span className="counter__icon"></span>
			{props.count !== 0 && <p className="counter__count">{`${props.count} Prayed`}</p>}
			<span className="counter__icon counter__icon--flip"></span>
		</div>
	)
}

export default Counter;
