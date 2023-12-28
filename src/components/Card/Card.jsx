import { useContext, useRef } from 'react';
import './Card.scss';
import Button from '../Button/Button.jsx';
import Counter from '../Counter/Counter.jsx';
import PrayersContext from '../../store/prayers-context.jsx';

// The Card component displays the users prayer request
const Card = (props) => {
	// Local storage is a string, so I'm converting to a boolean
	const isPrayed = localStorage.getItem(`prayed_${props.data.PrayerId}`) === 'true';
	const ctx = useContext(PrayersContext);
	const countRef = useRef(null);
	const customClass = props.className ? `card ${props.className}` : 'card';

	// Get the current prayer count on click
	const setPrayer = async () => {
		// Get the current counter element
		const domElement = countRef.current;
		// Extract number
		let extractedCount = parseInt(domElement.innerText.match(/\d+/g));

		// Set number to 0 if a number is not set
		if (isNaN(extractedCount)) {
			extractedCount = 0;
		}

		// Update the prayer count
		await ctx.updatePrayerCount(props.data.PrayerId, props.data.CreatedDate, extractedCount);

		// Set localStorage for current prayer card, note this is set as a string
		localStorage.setItem(`prayed_${props.data.PrayerId}`, 'true');
	}

	return (
		<div className={customClass}>
			<h1 className="card__name">{props.data.Name}</h1>
			<h2 className="card__title">{props.data.Title}</h2>
			<p className="card__message">{props.data.Message}</p>
			<Counter cName="card__counter" count={props.data.PrayerCount} forwardedRef={countRef}/>
			<Button
				cName="card__button"
				disableButton={isPrayed}
				onClick={setPrayer}
				text="Pray"
			/>
		</div>
	)
}

export default Card;
