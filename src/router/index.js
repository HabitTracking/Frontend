import { createRouter, createWebHistory } from 'vue-router';
import { authenticate } from '@/stores/authenticationStore';
import { toast } from '@/plugins/toast';
import routes from './routes';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

// router.beforeEach(to => {
//     const { isAuthenticated } = authenticate();

//     if (to.meta.needAuthenticated && !isAuthenticated()) {
//         toast.error('اجازه دسترسی به این مسیر وجود ندارد');
//         return { name: 'login' };
//     }
//     if (!to.meta.needAuthenticated && isAuthenticated()) {
//         return { name: 'Home' };
//     }
// });

router.afterEach(to => {
    document.title = to.name;
});

export default router;
