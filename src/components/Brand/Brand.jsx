import './Brand.scss';
import brandLogo from '../../assets/images/logo.svg';

// Display branding
const Brand = () => {
	return (
		<h1 className="brand">
			<img
				alt="Open Prayer Wall Logo"
				className="brand__logo"
				height="24"
				src={brandLogo}
				width="110"
			/>
		</h1>
	)
}

export default Brand;
