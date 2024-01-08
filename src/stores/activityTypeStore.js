import { defineStore } from 'pinia';
import ActivityType from '@/components/homePage/activityType/ActivityType';

export const activityTypeStore = defineStore('activityType', {
    state: () => ({
        activityTypes: [],
        titleActivityTypes: [],
        selectedActivitytype: ''
    }),
    actions: {
        async getActivityType() {
            this.activityTypes = await ActivityType.get();
            this.titleActivityTypes = this.activityTypes?.map(
                activityType => activityType.getData().title
            );
        }
    }
});
