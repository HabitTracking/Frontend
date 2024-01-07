import {
    postActivityType as post,
    getActivityType as get
} from '../../../services/activityTypeService';

export default class ActivityType {
    constructor(data) {
        console.log(data);
        this.id = data._id;

        this.title = data.title;
        // this.description = data.description;
    }

    getData() {
        return {
            title: this.title
            // description: this.description
        };
    }

    static async get() {
        const activityTypes = await get();
        return activityTypes.additionalInfo?.map(activityType => new ActivityType(activityType));
    }
    static async add(data) {
        const res = await post(data);
    }
}
