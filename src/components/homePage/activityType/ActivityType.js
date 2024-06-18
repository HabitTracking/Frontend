import {
    postActivityType as post,
    getActivityType as get
} from '../../../services/activityTypeService';
import { activityTypeStore } from '@/stores/activityTypeStore';

export default class ActivityType {
    constructor(data) {
        this.id = data._id;
        this.title = data.title;
    }

    getData() {
        return {
            title: this.title,
            id: this.id
        };
    }

    static async get() {
        const activityTypes = await get();
        return activityTypes.additionalInfo?.map(activityType => new ActivityType(activityType));
    }
    static async add(data) {
        const res = await post(data);

        const newBody = { ...data, _id: res.additionalInfo.activityTypeId };

        const { addActivityType } = activityTypeStore();
        addActivityType(new ActivityType(newBody));
    }
}
