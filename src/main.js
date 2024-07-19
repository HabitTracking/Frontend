import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Vue3ColorPicker from 'vue3-colorpicker';
import 'vue3-colorpicker/style.css';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Vue3ColorPicker);

app.mount('#app');
