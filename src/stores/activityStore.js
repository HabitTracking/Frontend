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
        addActivity(values) {
            this.activities?.push(values);
        },
        editActivity(values) {
            this.activities = this.activities?.map(activity =>
                values?._id === activity.id ? new Activity(values) : activity
            );
        },
        deleteActivity(id) {
            this.activities = this.activities?.filter(activity => activity.id !== id);
        },
        sortActivity() {
            this.activities = this.activities?.sort(({ date: a }, { date: b }) => a - b);
        }
    }
});
