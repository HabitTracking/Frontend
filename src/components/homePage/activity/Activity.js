import moment from 'jalali-moment';
import { activityStore } from '@/stores/activityStore';
import { useCookies } from 'vue3-cookies';
import {
    postActivity as postRequest,
    deleteActivity as deleteRequest,
    editActivity as putRequest,
    getActivity as getRequest,
    postProgress
} from '@/services/activityService';

const { cookies } = useCookies();

export default class Activity {
    static schema = {
        name: 'activity',
        version: '1.3.1'
    };

    constructor(data) {
        this.id = data._id;

        this.title = data.name;
        this.description = data.note;
        this.date = data.startTime;
        this.dueDate = data.dueDate;
        this.activityType = data.activityType;
        this.target = data.targetAmount;
        this.unit = data.targetUnit;
        this.frequency = data.frequency;
    }

    getData() {
        return {
            title: this.title,
            note: this.description,
            date: this.getDateFormated(this.date),
            dueDate: this.getDateFormated(this.dueDate),
            target: this.target,
            unit: this.unit,
            activityType: this.activityType,
            frequency: this.frequency
        };
    }

    progress(amount) {
        postProgress({
            activityId: this.id,
            date: '' + new Date().getTime(),
            amount
        });
    }

    getDateFormated(date) {
        return moment(+date).format('jD jMMMM jYYYY');
    }

    getFrequency() {
        switch (this.frequency) {
            case 1:
                return 'هر روز';
            case 3:
                return 'هر سه روز';
            case 7:
                return 'هفته ای';
            case 30:
                return 'هر ماه';
        }
    }

    getTag() {
        return `${this.getFrequency()} ${this.target} ${this.unit}`;
    }

    getDate() {
        if (isNaN(+this.date)) return 'invalid date';
        return new Intl.DateTimeFormat('fa-IR', {
            day: 'numeric',
            month: 'short'
        }).format(moment(+this.date));
    }
    getDueDate() {
        if (isNaN(+this.date)) return 'invalid date';
        return new Intl.DateTimeFormat('fa-IR', {
            day: 'numeric',
            month: 'short'
        }).format(moment(+this.dueDate));
    }
    getTime() {
        if (+this.startTime) return 'invalid time';
        return new Intl.DateTimeFormat('fa-IR', {
            hour: 'numeric',
            minute: 'numeric'
        }).format(moment(this.date, 'HH:mm'));
    }

    static toTimeStamp(date, format) {
        return '' + moment(date, format).valueOf();
    }

    static async addActivity(data) {
        const body = {
            name: data.title,
            startTime: Activity.toTimeStamp(data.date, 'jD jMMMM jYYYY  HH:mm'),
            dueDate: Activity.toTimeStamp(data.dueDate, 'jD jMMMM jYYYY'),
            frequency: +data.frequency,
            note: data.note,
            activityType: data.activityType,
            targetAmount: +data.target,
            targetUnit: data.unit
        };
        const response = await postRequest(body);

        const newBody = { ...body, _id: response.additionalInfo.activityid };

        const { addActivity } = activityStore();
        addActivity(new Activity(newBody));
    }

    static async getActivity() {
        const activities = await getRequest({});
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
