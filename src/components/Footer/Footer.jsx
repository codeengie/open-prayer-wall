import './Footer.scss';

// Footer component displays copyright info and sets the year to current
const Footer = () => {
	const currentDate = new Date().getFullYear();

	return (
		<footer className="footer">
			<small className="footer__text">Copyright &copy; {currentDate} Open Prayer Wall. All Rights Reserved.</small>
		</footer>
	);
}

export default Footer;
