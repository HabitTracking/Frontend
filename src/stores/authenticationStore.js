import { defineStore } from 'pinia';
import jwt_decode from 'jwt-decode';
import { useCookies } from 'vue3-cookies';

const { cookies } = useCookies();

export const authenticate = defineStore('auth', {
    state: () => ({
        userId: '',
        role: '',
        username: ''
    }),
    actions: {
        isAuthenticated() {
            if (!cookies.get('token')) return false;

            if (!this.userId) {
                const { data, userId, uniqueFields } = jwt_decode(cookies.get('token'));

                this.role = data?.roles?.[0];
                this.userId = userId;
                this.username = uniqueFields?.[0]?.username;

            }

            return true;
        },
        isPremium() {
            return this.role === 'premium';
        }
    }
});
