/**
 * Modified the original build config to output a custom `index.html` file based on environment. Although, I did
 * manage to accomplish the task with `vite-plugin-html` it appears this plugin is no longer maintained and does not
 * rename the output template html file. Plus, it also includes the template directory into the `dist` folder. I
 * around this by placing the prod version of `index.html` in the root, its Mickey Mouse but it will do for now.
 * @todo Find a suitable replacement for 'vite-plugin-html'
 */

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { createHtmlPlugin } from 'vite-plugin-html';

/**
 * Review "Configuring Vite" page if you need to add conditional
 * changes to configuration.
 * @link https://vitejs.dev/config/
 * @link https://vitejs.dev/guide/env-and-mode.html
 */

// Build config
let params = {
	template: 'src/templates/index.dev.html',
	inject: {
		data: {
			title: 'Open Prayer Wall',
			desc: 'Add Your Own Description.',
			url: 'https://addyourownurl.com',
			image: 'https://addyourownurl/app.jpg',
			keywords: 'Add, Your, Own, Keywords'
		}
	}
};

// Vite config
let options = {
	plugins: [
		react(),
		createHtmlPlugin(params)
	]
};

/**
 * When the `npm run build` is executed the `params` object keys are updated and new ones are added. You'll need to
 * add your own Google Tag ID.
 */
export default defineConfig(({ command, mode }) => {
	if (mode === 'production') {
		const googleTagId = 'G-XXXXXXXXXX';
		params.template = 'index.html';
		params.inject.data.bots = `<meta name="robots" content="index, follow">`;
		params.inject.data.gtag = `
			<script defer src="https://www.googletagmanager.com/gtag/js?id=${googleTagId}"></script>
			<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${googleTagId}');</script>
		`;
	}

	return options;
});
