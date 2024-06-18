import { toast } from '@/plugins/toast';
import instance from '@/plugins/axios';

export const getActivity = async () => {
    try {
        const activities = await instance.get('/activity');
        return activities.additionalInfo;
    } catch (error) {
        toast.error('فعالیت ها دریافت نشد');
    }
};

export const postActivity = async body => {
    try {
        const responseActivity = await instance.post('/activity', body);
        setTimeout(() => {
            toast.success('فعالیت با موفقیت ایجاد شد');
        }, 1000);
        return responseActivity;
    } catch (error) {
        toast.error('ساخت فعالیت با مشکل مواجه شد');
    }
};
export const postProgress = async body => {
    try {
        const responseActivity = await instance.post('/activity/addProgress', body);
        setTimeout(() => {
            toast.success('انجام فعالیت با موفقیت ثبت شد');
        }, 1000);
        return responseActivity.data;
    } catch (error) {
        setTimeout(() => {
            toast.warning('انجام فعالیت ثبت نشد');
        }, 1000);
    }
};

export const getcalendar = async param => {
    try {
        const responseActivity = await instance.get('/calendar/month', {
            params: {
                date: param
            }
        });
        return responseActivity.additionalInfo;
    } catch (error) {}
};

export const getcalendarDay = async day => {
    try {
        const responseActivity = await instance.get('/calendar/day', {
            params: {
                date: day
            }
        });
        return responseActivity.additionalInfo;
    } catch (error) {}
};

export const editActivity = async (body, id) => {
    try {
        const editedActivity = await instance.put('/activity', body, {
            params: {
                activityId: id
            }
        });
        toast.success('فعالیت با موفقیت ویرایش شد');
        return editedActivity.data;
    } catch (error) {
        toast.error('ویرایش فعالیت با مشکل مواجه شد');
    }
};

export const deleteActivity = params => {
    try {
        instance.delete('/activity', { params: params });
        toast.success('فعالیت با موفقیت حذف شد');
    } catch (error) {
        toast.error('حذف فعالیت با مشکل مواجه شد');
    }
};
