import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            '@base': fileURLToPath(new URL('./src/components/base', import.meta.url))
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `
              @use "./src/assets/sass/utils/themes";
              @use "./src/assets/sass/utils/mixins";
              @use "./src/assets/sass/utils/variables";
              @use "./src/assets/sass/base/typography";
            `
            }
        }
    }
});
