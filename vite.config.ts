import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			'@': path.resolve(path.join(__dirname, 'src')),
			'@root': path.resolve(__dirname),
		},
	},
});
