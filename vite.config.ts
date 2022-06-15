import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
		// extensions: [".ts", "tsx", ".scss"],
		alias: {
			'@': path.resolve(__dirname, 'src'),
			'@assets': path.resolve(__dirname, 'src/assets'),
			'@components': path.resolve(__dirname, 'src/components'),
			'@store': path.resolve(__dirname, 'src/store/store.ts'),
			'@services': path.resolve(__dirname, 'src/services'),
			'@colors': path.resolve(__dirname, 'src/utils/colors.ts'),
			'@views': path.resolve(__dirname, 'src/views'),
			'@hooks': path.resolve(__dirname, 'src/hooks'),
			'@api': path.resolve(__dirname, 'src/api'),
		},
	},
})
