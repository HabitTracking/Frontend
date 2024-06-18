import axios from 'axios';
import { useRouter } from 'vue-router';
import { toast } from './toast';
const router = useRouter();
import { BASE_URL } from '@/common/constants/path';

const instance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
});
instance.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    response => {
        return response.data;
    },
    error => {
        if (error.response.status === 429) {
            toast.error('درخواست زیاد شده');
        }
        if (error.response.status === 401) {
            router.push('/login');
            toast.error('توکن منقضی شده');
        }
        return Promise.reject(error);
    }
);

export default instance;
