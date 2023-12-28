import React, { useCallback, useEffect, useState } from 'react';

const PrayersContext = React.createContext({
	error: null,
	isLoading: false,
	prayers: []
});

export const PrayersContextProvider = (props) => {
	const [isLoading, setIsLoading] = useState(false);
	const [prayers, setPrayers] = useState([]);
	const [error, setError] = useState(null);
	const apiUrl = `${import.meta.env.VITE_API_URL}/prayers`;
	let settings = {
		method: 'GET',
		headers: {
			'x-api-key': import.meta.env.VITE_API_KEY // Api key retrieved from `.env` file in root
		}
	};

	// Fetch prayer requests
	const fetchPrayers = useCallback(async () => {
		setIsLoading(true);

		try {
			const response = await fetch(apiUrl, settings);

			if (!response.ok) {
				new Error(`Request failed with status: ${response.status}`);
			}

			const prayerData = await response.json();
			setPrayers(JSON.parse(prayerData.body));

		} catch (error) {
			setError(error.message);
		} finally {
			setIsLoading(false);
		}

	}, []);

	/**
	 * Update the prayer count on a single prayer post
	 * @param id - UUID of the prayer you want to update
	 * @param date - The date the prayer was requested
	 * @param count - Number of times the prayer has been prayed for
	 * @returns {Promise<void>}
	 */
	const updatePrayerCount = async (id, date, count) => {
		const newCount = count + 1;

		try {
			settings.method = 'PUT'
			const response = await fetch(`${apiUrl}?id=${id}&date=${date}&count=${newCount}`, settings);

			if (!response.ok) {
				new Error(`Updating prayer count failed with status: ${response.status}`);
			}

			/**
			 * Initially I was trying to update the prayer count by finding the prayer's index in the array but
			 * when I invoked setState it would not update or render. I was trying to avoid copying the entire
			 * array in general for performance reasons but there are other ways of mitigating the hit by
			 * limiting results or only rendering prayers in the user's viewport. For now this will do!
			 */
			const updatedPrayer = prayers.map(
				prayer => prayer.PrayerId === id ? {...prayer, PrayerCount: newCount } : prayer);

			setPrayers(updatedPrayer);

		} catch (error) {
			setError(error.message);
		}
	};

	// Post a new prayer request
	const postNewPrayer = async (data) => {
		settings.method = 'POST';
		settings.body = JSON.stringify(data);

		try {
			const response = await fetch(apiUrl, settings);

			if (!response.ok) {
				new Error(`Prayer request was not posted: ${response.status}`);
			}

			// Await operator is required otherwise you'll get a Promise object which you can't process
			const postData = await response.json();

			// Add the new prayer to the store
			setPrayers(prevPrayers => [...prevPrayers, JSON.parse(postData.body)]);

			// Return the statusCode
			return postData.statusCode;

		} catch (error) {
			setError(error.message);
		}
	}

	useEffect(() => {
		fetchPrayers();
	}, [fetchPrayers]);

	return <PrayersContext.Provider value={{error: error, isLoading: isLoading, prayers: prayers, updatePrayerCount, postNewPrayer}}>{props.children}</PrayersContext.Provider>
}

export default PrayersContext;
