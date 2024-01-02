import { createApp } from 'vue';
import { createPinia } from 'pinia';
import cookiesConfig from './plugins/cookies';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(cookiesConfig)

app.mount('#app');
