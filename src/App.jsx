import { ModalContextProvider } from './store/modal-context.jsx';
import './App.scss'
import Footer from './components/Footer/Footer.jsx';
import Header from './components/Header/Header.jsx';
import Hero from './components/Hero/Hero.jsx';
import PrayerWall from './modules/PrayerWall/PrayerWall.jsx';
import CallToAction from './components/CallToAction/CallToAction.jsx';
import Backdrop from './components/Backdrop/Backdrop.jsx';
import PostPrayer from "./components/PostPrayer/PostPrayer.jsx";
import { PrayersContextProvider } from './store/prayers-context.jsx';

const App = () => {
	return (
		<>
			<Header/>
			<Hero/>
			<PrayersContextProvider>
				<main role="main">
					<PrayerWall/>
				</main>
				<ModalContextProvider>
					<CallToAction/>
					<Footer/>
					<PostPrayer/>
					<Backdrop/>
				</ModalContextProvider>
			</PrayersContextProvider>
		</>
	)
}

export default App
