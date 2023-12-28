import './Hero.scss';

/**
 * Dynamically import all the hero images. I ran into an issue with the previous solution where the images would
 * throw an error when the project is built for production. I found a secondary solution on the Vite repo in GitHub.
 * @link https://vitejs.dev/guide/features.html#glob-import
 * @link https://github.com/vitejs/vite/discussions/12191
 */
const imageImports = Object.values(import.meta.glob('../../assets/images/hero-*w.webp', { eager: true, as: 'url' }));
const responsiveImages = imageImports.map(image => {
	let keyVal = {};
	const matched = image.match(/\d+/);

	keyVal.path = image;
	keyVal.width = matched[0];

	return keyVal;
});

const Hero = () => {
	const imageSizes = responsiveImages
		.map(size => `(max-width: ${size.width}px) ${size.width}w`).toString();
	const imageSources = responsiveImages
		.map(source => `${source.path} ${source.width}w`).toString();
	const imageFallback = responsiveImages.find(image => image.width === '1200');

	return (
		<div className="hero">
			<img
				alt="A man praying with his head down, hands closed together with fingers crossed."
				className="hero__bg"
				fetchpriority="high"
				height="200"
				sizes={imageSizes}
				srcSet={imageSources}
				src={imageFallback.path}
				width="286"
			/>
			<blockquote className="hero__verse">
				<p className="hero__text">Don&rsquo;t worry about anything; instead, pray about everything.</p>
				<cite className="hero__book">Philippians 4:6 NLT</cite>
			</blockquote>
		</div>
	)
}

export default Hero;
