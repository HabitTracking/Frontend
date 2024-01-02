import moment from 'jalali-moment';
import { getFile, putFile } from '@/services/fileStorage';
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

        this.title = data.data.title;
        this.description = data.data.description;
        this.date = data.data.date;
        this.startTime = data.data.startTime;
        this.endTime = data.data.endTime;
        this.activityType = data.data.activityType;
        this.images = data.data.images;
    }

    getData() {
        return {
            title: this.title,
            description: this.description,
            date: this.getDateFormated(),
            startTime: this.startTime,
            endTime: this.endTime,
            activityType: this.activityType,
            images: this.images
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

    static toTimeStamp(date) {
        return '' + moment(date, 'jD jMMMM jYYYY').valueOf();
    }

    static async addActivity(data) {
        const body = {
            schema: Activity.schema,
            tags: {
                userId: cookies.get('userId')
            },
            data: {
                title: data.title,
                date: Activity.toTimeStamp(data.date),
                startTime: data.startTime,
                endTime: data.endTime,
                description: data.description,
                activityType: data.activityType,
                picture: await Activity.getIdPicture(data.images)
            }
        };
        const { _id: idActivity } = await postRequest(body);

        const { addActivity } = activityStore();
        addActivity(body, idActivity);
    }

    static async getActivity() {
        const activities = await getRequest({
            schemaName: Activity.schema.name,
            schemaVersion: Activity.schema.version,
            tags: `{"userId":"${cookies.get('userId')}"}`
        });

        activities?.forEach(activity => {
            activity.data.images = activity.data?.picture?.map(
                async id => await getFile({ id: id })
            );
        });
        return activities?.map(activity => new Activity(activity));
    }

    async editActivity(data) {
        const body = {
            schema: Activity.schema,
            id: this.id,
            data: {
                title: data.title,
                date: Activity.toTimeStamp(data.date),
                startTime: data.startTime,
                endTime: data.endTime,
                description: data.description,
                activityType: data.activityType,
                picture: await Activity.getIdPicture(data.images)
            }
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
    static async getIdPicture(files) {
        const pictures = await putFile(files);

        return Array.isArray(pictures) ? pictures.map(({ id }) => id) : pictures?.id;
    }
}
