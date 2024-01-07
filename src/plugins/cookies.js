import { globalCookiesConfig } from 'vue3-cookies';

const cookiesConfig = globalCookiesConfig({
    expireTimes: '3h',
    secure: true,
    sameSite: 'None',
    path: '/',
    domain: 'localhost'
});

export default cookiesConfig;
