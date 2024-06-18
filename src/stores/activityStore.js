import { defineStore } from 'pinia';
import Activity from '@/components/homePage/activity/Activity';

export const activityStore = defineStore('activity', {
    state: () => ({
        activities: []
    }),
    actions: {
        async getActivity() {
            this.activities = await Activity.getActivity();
        },
        addActivity(activity) {
            this.activities?.push(activity);
        },
        editActivity(activity, id) {
            this.deleteActivity(id);
            this.addActivity(activity);
        },
        deleteActivity(id) {
            this.activities = this.activities?.filter(activity => activity.id !== id);
        },
        sortActivity() {
            this.activities = this.activities?.sort(({ date: a }, { date: b }) => a - b);
        }
    }
});
