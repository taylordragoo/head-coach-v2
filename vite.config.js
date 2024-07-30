import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import VueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig(() => {
    return {
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)),
            },
        },
        plugins: [
            vue(),
            // VueDevTools(),
        ],
        server: {
            host: '0.0.0.0', // binds to all hosts; adjust as necessary for your environment
            port: 5173, // specify a port if the default (3000) is in use or blocked
            hmr: {
                protocol: 'ws', // ensure WebSocket is used for HMR
                port: 5173, // can be same as server port if not behind proxy
            },
            watch: {
              usePolling: true,
            }
        },
    };
});
