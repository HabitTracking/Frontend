import { createRouter, createWebHistory } from 'vue-router';
import { toast } from '@/plugins/toast';
import routes from './routes';
import { useCookies } from 'vue3-cookies';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

router.beforeEach(to => {
    const { cookies } = useCookies();

    console.log(cookies.get('token'));
    const isAuthenticated = cookies.isKey('token');

    if (to.meta.needAuthenticated && !isAuthenticated) {
        toast.error('اجازه دسترسی به این مسیر وجود ندارد');
        return { name: 'login' };
    }
    if (!to.meta.needAuthenticated && isAuthenticated) {
        return { name: 'Home' };
    }
});

router.afterEach(to => {
    document.title = to.name;
});

export default router;
