import { globalCookiesConfig } from 'vue3-cookies';

const cookiesConfig = globalCookiesConfig({
    expireTimes: '3h'
});

export default cookiesConfig;
