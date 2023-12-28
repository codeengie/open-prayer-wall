/**
 * I like the idea of being able to spawn a number of skeletons and keeping the iteration code within the
 * component as I don't need access to each skeleton component. But I ran into an issue with the Masonry
 * plugin which required the same iteration and push to array on the parent side to be able to calculate
 * how many children go into a column. I'll leave this code as is for now but will consider removing the loop
 * in a future phase.
 * @todo Consider removing the loop for the reasons above
 */

import './SkeletonLoader.scss';

// Skeleton component displays mock card elements while data is being loaded
const SkeletonLoader = (props) => {
	const customClass = props.className ? `skeleton ${props.className}` : 'skeleton';
	const skeletons = [];

	// Create as many skeleton as required by count props
	for (let i = 0; i < props.count; i++) {
		skeletons.push(
			<div className={customClass} key={i}>
				<span className="skeleton__hidden" aria-hidden="false">Loading... Please wait.</span>
				<h3 className="skeleton__title" aria-hidden="true"></h3>
				<h4 className="skeleton__subtitle" aria-hidden="true"></h4>
				<p className="skeleton__body" aria-hidden="true"></p>
				<span className="skeleton__count"></span>
				<span className="skeleton__button"></span>
			</div>
		);
	}

	return (
		skeletons
	);
};

export default SkeletonLoader;
