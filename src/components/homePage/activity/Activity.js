import moment from 'jalali-moment';
import { activityStore } from '@/stores/activityStore';
import { useCookies } from 'vue3-cookies';
import {
    postActivity as postRequest,
    deleteActivity as deleteRequest,
    editActivity as putRequest,
    getActivity as getRequest
} from '@/services/activityService';

const { cookies } = useCookies();

export default class Activity {
    static schema = {
        name: 'activity',
        version: '1.3.1'
    };

    constructor(data) {
        this.id = data._id;

        this.title = data.title;
        this.description = data.note;
        this.date = data.date;
        this.startTime = data.startTime;
        this.endTime = data.endTime;
        this.activityType = data.activityType;
    }

    getData() {
        return {
            title: this.title,
            description: this.description,
            date: this.getDateFormated(),
            startTime: this.startTime,
            endTime: this.endTime,
            activityType: this.activityType
        };
    }

    getDateFormated() {
        return moment(+this.date).format('jD jMMMM jYYYY');
    }

    getDate() {
        if (isNaN(+this.date)) return 'invalid date';
        return new Intl.DateTimeFormat('fa-IR', {
            day: 'numeric',
            month: 'short'
        }).format(moment(+this.date));
    }

    getStartTime() {
        if (+this.startTime) return 'invalid time';
        return new Intl.DateTimeFormat('fa-IR', {
            hour: 'numeric',
            minute: 'numeric'
        }).format(moment(this.startTime, 'HH:mm'));
    }
    getEndTime() {
        if (+this.startTime) return 'invalid time';
        return new Intl.DateTimeFormat('fa-IR', {
            hour: 'numeric',
            minute: 'numeric'
        }).format(moment(this.endTime, 'HH:mm'));
    }

    static toTimeStamp(date, format) {
        return '' + moment(date, format).valueOf();
    }

    static async addActivity(data) {
        const body = {
            title: data.title,
            date: Activity.toTimeStamp(data.date, 'jD jMMMM jYYYY  HH:mm'),
            dueDate: Activity.toTimeStamp(data.dueDate, 'jD jMMMM jYYYY'),
            frequency: +data.frequency,
            note: data.note,
            activityType: data.activityType,
            target: data.target,
            unit: data.unit
        };
        console.log(body);
        // const { _id: idActivity } = await postRequest(body);

        // const { addActivity } = activityStore();
        // addActivity(body, idActivity);
    }

    static async getActivity() {
        const activities = await getRequest({
            schemaName: Activity.schema.name,
            schemaVersion: Activity.schema.version,
            tags: `{"userId":"${cookies.get('userId')}"}`
        });
        return activities?.map(activity => new Activity(activity));
    }

    async editActivity(data) {
        const body = {
            title: data.title,
            date: Activity.toTimeStamp(data.date),
            startTime: data.startTime,
            endTime: data.endTime,
            description: data.description,
            activityType: data.activityType,
            picture: await Activity.getIdPicture(data.images)
        };
        const editedActivity = await putRequest(body);

        const { editActivity } = activityStore();
        editActivity(editedActivity);
    }

    deleteActivity() {
        deleteRequest({ id: this.id });
        const { deleteActivity } = activityStore();
        deleteActivity(this.id);
    }
}
