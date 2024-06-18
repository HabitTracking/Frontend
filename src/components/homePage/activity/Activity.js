import moment from 'jalali-moment';
import { activityStore } from '@/stores/activityStore';
import { activityTypeStore } from '../../../stores/activityTypeStore';
import { storeToRefs } from 'pinia';
import {
    postActivity as postRequest,
    deleteActivity as deleteRequest,
    editActivity as putRequest,
    getActivity as getRequest,
    postProgress
} from '@/services/activityService';

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
        this.progreses = data.progress;
    }

    getData() {
        return {
            title: this.title,
            note: this.description,
            date: this.getDateFormated(Number(this.date) * 1000, 'jD jMMMM jYYYY  HH:mm'),
            dueDate: this.getDateFormated(Number(this.dueDate) * 1000, 'jD jMMMM jYYYY'),
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

    getDateFormated(date, format = 'jD jMMMM jYYYY') {
        return moment(+date).format(format);
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
        }).format(moment(+this.date * 1000));
    }
    getDueDate() {
        if (isNaN(+this.dueDate)) return 'invalid date';
        return new Intl.DateTimeFormat('fa-IR', {
            day: 'numeric',
            month: 'short'
        }).format(moment(+this.dueDate * 1000));
    }
    getTime() {
        if (+this.data) return 'invalid time';
        return moment(+this.date * 1000).format('HH:mm');
    }

    getActivityType() {
        const { activityTypes } = storeToRefs(activityTypeStore());
        return activityTypes.value.filter(v => v.id == this.activityType)[0]?.title;
    }

    static toTimeStamp(date, format) {
        return '' + moment(date, format).unix();
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
            name: data.title,
            startTime: Activity.toTimeStamp(data.date, 'jD jMMMM jYYYY  HH:mm'),
            dueDate: Activity.toTimeStamp(data.dueDate, 'jD jMMMM jYYYY'),
            frequency: +data.frequency,
            note: data.note,
            activityType: data.activityType,
            targetAmount: +data.target,
            targetUnit: data.unit
        };
        await putRequest(body, this.id);

        const { editActivity: edit } = activityStore();

        const activity = new Activity({ ...body, _id: this.id });
        edit(activity, this.id);
    }

    deleteActivity() {
        deleteRequest({ activityId: this.id });
        const { deleteActivity } = activityStore();
        deleteActivity(this.id);
    }
}
