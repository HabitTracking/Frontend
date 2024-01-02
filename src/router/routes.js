import AuthCardLayout from '@/layout/AuthCardLayout.vue';
import DashboardLayout from '@/layout/DashboardLayout.vue';

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/authentication/LoginView.vue'),
        meta: {
            layout: AuthCardLayout
        }
    },
    {
        path: '/signup',
        name: 'signup',
        component: () => import('@/views/authentication/SignupView.vue'),
        meta: {
            layout: AuthCardLayout
        }
    },
    {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/homePage/HomeView.vue'),
        meta: {
            layout: DashboardLayout,
            needAuthenticated: true
        }
    },
    {
        path: '/activity',
        name: 'Activity',
        component: () => import('@/views/homePage/ActivityView.vue'),
        meta: {
            layout: DashboardLayout,
            needAuthenticated: true
        }
    }
];

export default routes;
