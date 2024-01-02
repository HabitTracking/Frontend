// import { useCookies } from 'vue3-cookies';
// const { cookies } = useCookies();

// import { getActivity as get } from '@/services/activityService';

export default class ActivityType {
    static schema = {
        name: 'activityType',
        version: '1.2.3'
    };

    constructor(data) {
        this.id = data._id;

        this.title = data.data.title;
        this.description = data.data.description;
    }

    static async getActivityType() {
        // const params = {
        //     schemaName: ActivityType.schema.name,
        //     schemaVersion: ActivityType.schema.version,
        //     tags: `{"userId":"${cookies.get('userId')}"}`
        // };

        // const activitYTypes = await get(params);

        const activityTypes = [
            {
                id: 'sas',
                data: {
                    title: 'asd',
                    description: 'asdad'
                }
            }
        ];

        return activityTypes;
    }
}
