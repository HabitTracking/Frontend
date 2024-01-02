import { getProfile } from '@/services/usermanager';
import { defineStore } from 'pinia';

export const userInfo = defineStore('user', {
    state: () => ({
        personalInfo: {},
        users: []
    }),
    actions: {
        async getUserInfo() {
            this.personalInfo = await getProfile();
        }
    }
});
