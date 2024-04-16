import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import tsconfigPathsPlugin from 'vite-tsconfig-paths';
import svgr  from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactRefresh(),
    tsconfigPathsPlugin(),
    svgr({
      exportAsDefault: true
    })
  ],
});
